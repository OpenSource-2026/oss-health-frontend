import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import "./ResultPage.css";

function getGradeClass(grade) {
  switch (grade) {
    case "Excellent":
      return "grade-excellent";
    case "Good":
      return "grade-good";
    case "Moderate":
      return "grade-moderate";
    case "Weak":
      return "grade-weak";
    case "Risk":
      return "grade-risk";
    default:
      return "grade-default";
  }
}

function formatScore(score) {
  if (score === undefined || score === null) return "-";
  return Number(score).toFixed(1);
}

function formatProbability(value) {
  if (value === undefined || value === null) return "-";
  return `${(Number(value) * 100).toFixed(1)}%`;
}

function safeText(value) {
  if (value === undefined || value === null || value === "") return "-";
  return String(value);
}

function makeSafeFileName(name) {
  return safeText(name)
    .replace("https://github.com/", "")
    .replace(/[^a-zA-Z0-9가-힣_-]/g, "_");
}

function addWrappedText(doc, text, x, y, maxWidth, lineHeight = 7) {
  const lines = doc.splitTextToSize(safeText(text), maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function generatePdfReport(result) {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  let y = 18;

  function checkPageSpace(requiredHeight = 20) {
    if (y + requiredHeight > pageHeight - 18) {
      doc.addPage();
      y = 18;
    }
  }

  function sectionTitle(title) {
    checkPageSpace(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(title, marginX, y);
    y += 8;
    doc.setDrawColor(210, 220, 235);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 8;
  }

  function smallLabel(label, value) {
    checkPageSpace(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${label}:`, marginX, y);

    doc.setFont("helvetica", "normal");
    doc.text(safeText(value), marginX + 45, y);
    y += 7;
  }

  const dimensions = result?.dimension_scores || [];

  const topRisks = dimensions
    .flatMap((dimension) =>
      (dimension.risk_features || []).map((feature) => ({
        ...feature,
        dimensionLabel: dimension.label,
      }))
    )
    .sort((a, b) => Number(a.score) - Number(b.score))
    .slice(0, 3);

  const strongestDimension =
    dimensions.length > 0
      ? dimensions.reduce((max, item) => (item.score > max.score ? item : max))
      : null;

  const weakestDimension =
    dimensions.length > 0
      ? dimensions.reduce((min, item) => (item.score < min.score ? item : min))
      : null;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("OSS Health Checker Report", marginX, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y = addWrappedText(
    doc,
    "This report summarizes the open-source health diagnosis result based on repository activity, sustainability, code reliability, governance, and project maturity.",
    marginX,
    y,
    contentWidth
  );
  y += 6;

  sectionTitle("1. Repository Summary");

  smallLabel("Repository", result.repo_name);
  smallLabel("Overall Score", `${formatScore(result.overall_score)} / 100`);
  smallLabel("Overall Grade", result.overall_grade);
  smallLabel("Healthy Probability", formatProbability(result.healthy_probability));
  smallLabel("Model", result.model_name);
  smallLabel("Target", result.target);
  smallLabel(
    "Strongest Area",
    strongestDimension
      ? `${strongestDimension.label} (${formatScore(strongestDimension.score)} points)`
      : "-"
  );
  smallLabel(
    "Priority Area",
    weakestDimension
      ? `${weakestDimension.label} (${formatScore(weakestDimension.score)} points)`
      : "-"
  );

  sectionTitle("2. Dimension Scores");

  dimensions.forEach((dimension, index) => {
    checkPageSpace(26);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(
      `${index + 1}. ${safeText(dimension.label)} - ${formatScore(
        dimension.score
      )} points (${safeText(dimension.grade)})`,
      marginX,
      y
    );
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y = addWrappedText(
      doc,
      safeText(dimension.core_question),
      marginX + 4,
      y,
      contentWidth - 4
    );
    y += 3;

    y = addWrappedText(
      doc,
      safeText(dimension.summary),
      marginX + 4,
      y,
      contentWidth - 4
    );
    y += 6;
  });

  sectionTitle("3. Detailed Dimension Analysis");

  dimensions.forEach((dimension) => {
    checkPageSpace(36);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(safeText(dimension.label), marginX, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    y = addWrappedText(
      doc,
      `Core question: ${safeText(dimension.core_question)}`,
      marginX,
      y,
      contentWidth
    );
    y += 3;

    y = addWrappedText(
      doc,
      `Concepts: ${safeText(dimension.concepts)}`,
      marginX,
      y,
      contentWidth
    );
    y += 5;

    doc.setFont("helvetica", "bold");
    doc.text("Strength Signals", marginX, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    const strengths = dimension.strength_features || [];

    if (strengths.length === 0) {
      doc.text("- No strength signals.", marginX + 4, y);
      y += 6;
    } else {
      strengths.forEach((feature) => {
        checkPageSpace(18);
        y = addWrappedText(
          doc,
          `- ${safeText(feature.label)} (${formatScore(feature.score)} points): ${safeText(
            feature.description
          )}`,
          marginX + 4,
          y,
          contentWidth - 4
        );
        y += 3;
      });
    }

    y += 2;
    checkPageSpace(16);

    doc.setFont("helvetica", "bold");
    doc.text("Risk Signals", marginX, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    const risks = dimension.risk_features || [];

    if (risks.length === 0) {
      doc.text("- No risk signals.", marginX + 4, y);
      y += 6;
    } else {
      risks.forEach((feature) => {
        checkPageSpace(18);
        y = addWrappedText(
          doc,
          `- ${safeText(feature.label)} (${formatScore(feature.score)} points): ${safeText(
            feature.description
          )}`,
          marginX + 4,
          y,
          contentWidth - 4
        );
        y += 3;
      });
    }

    y += 7;
  });

  sectionTitle("4. Top Improvement Suggestions");

  if (topRisks.length === 0) {
    doc.setFont("helvetica", "normal");
    doc.text("No improvement suggestions available.", marginX, y);
    y += 7;
  } else {
    topRisks.forEach((risk, index) => {
      checkPageSpace(24);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(
        `#${index + 1} ${safeText(risk.label)} - ${safeText(risk.dimensionLabel)}`,
        marginX,
        y
      );
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      y = addWrappedText(
        doc,
        `Score: ${formatScore(risk.score)} points. ${safeText(risk.description)}`,
        marginX + 4,
        y,
        contentWidth - 4
      );
      y += 6;
    });
  }

  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 130, 150);
    doc.text(
      `OSS Health Checker Report | Page ${i} of ${pageCount}`,
      marginX,
      pageHeight - 10
    );
  }

  const fileName = `oss-health-report-${makeSafeFileName(result.repo_name)}.pdf`;
  doc.save(fileName);
}

export default function ResultPage({ result, onBack }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dimensions = result?.dimension_scores || [];
  const selectedDimension = dimensions[selectedIndex];

  const strongestDimension = useMemo(() => {
    if (dimensions.length === 0) return null;
    return dimensions.reduce((max, item) =>
      item.score > max.score ? item : max
    );
  }, [dimensions]);

  const weakestDimension = useMemo(() => {
    if (dimensions.length === 0) return null;
    return dimensions.reduce((min, item) =>
      item.score < min.score ? item : min
    );
  }, [dimensions]);

  const topRisks = useMemo(() => {
    return dimensions
      .flatMap((dimension) =>
        (dimension.risk_features || []).map((feature) => ({
          ...feature,
          dimensionLabel: dimension.label,
        }))
      )
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
  }, [dimensions]);

  if (!result) {
    return (
      <div className="result-page">
        <div className="empty-result">
          <h1>분석 결과가 없습니다.</h1>
          <button onClick={onBack}>메인으로 돌아가기</button>
        </div>
      </div>
    );
  }

  return (
    <main className="result-page">
      <header className="result-header">
        <div>
          <p className="eyebrow">OSS Health Diagnosis Result</p>
          <h1>{result.repo_name}</h1>
          <p>
            GitHub 레포지토리의 커뮤니티 활성도, 지속 가능성, 코드 품질,
            거버넌스, 프로젝트 성숙도를 기준으로 분석한 결과입니다.
          </p>
        </div>

        <div className="result-actions">
          <button
            className="pdf-button"
            type="button"
            onClick={() => generatePdfReport(result)}
          >
            PDF 저장
          </button>

          <button className="back-button" type="button" onClick={onBack}>
            다시 분석하기
          </button>
        </div>
      </header>

      <section className="summary-grid">
        <article className="score-card main-score">
          <p>Overall Score</p>
          <strong>{formatScore(result.overall_score)}</strong>
          <span className={getGradeClass(result.overall_grade)}>
            {result.overall_grade}
          </span>
        </article>

        <article className="score-card">
          <p>Healthy Probability</p>
          <strong>{formatProbability(result.healthy_probability)}</strong>
          <span>모델이 건강하다고 판단한 확률</span>
        </article>

        <article className="score-card">
          <p>Strongest Area</p>
          <strong>{strongestDimension?.label || "-"}</strong>
          <span>
            {strongestDimension
              ? `${formatScore(strongestDimension.score)}점`
              : "-"}
          </span>
        </article>

        <article className="score-card">
          <p>Priority Area</p>
          <strong>{weakestDimension?.label || "-"}</strong>
          <span>
            {weakestDimension
              ? `${formatScore(weakestDimension.score)}점`
              : "-"}
          </span>
        </article>
      </section>

      <section className="dimension-section">
        <div className="section-title">
          <h2>5개 평가 차원</h2>
          <p>각 카드를 클릭하면 해당 차원의 상세 분석을 확인할 수 있습니다.</p>
        </div>

        <div className="dimension-grid">
          {dimensions.map((dimension, index) => (
            <button
              key={dimension.dimension}
              type="button"
              className={`dimension-card ${
                selectedIndex === index ? "active" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <div>
                <h3>{dimension.label}</h3>
                <p>{dimension.core_question}</p>
              </div>

              <div className="dimension-score-row">
                <strong>{formatScore(dimension.score)}</strong>
                <span className={getGradeClass(dimension.grade)}>
                  {dimension.grade}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="chart-section">
        <div className="section-title">
          <h2>차원별 점수 비교</h2>
          <p>낮은 점수의 차원이 우선 개선이 필요한 영역입니다.</p>
        </div>

        <div className="bar-list">
          {dimensions.map((dimension) => (
            <div className="bar-item" key={dimension.dimension}>
              <div className="bar-label-row">
                <span>{dimension.label}</span>
                <strong>{formatScore(dimension.score)}점</strong>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${Math.min(dimension.score, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedDimension && (
        <section className="detail-section">
          <div className="detail-main">
            <p className="eyebrow">Selected Dimension</p>
            <h2>{selectedDimension.label}</h2>
            <p className="question">{selectedDimension.core_question}</p>
            <p className="summary">{selectedDimension.summary}</p>

            <div className="concept-box">
              <strong>평가 개념</strong>
              <p>{selectedDimension.concepts}</p>
            </div>
          </div>

          <div className="feature-columns">
            <div className="feature-panel">
              <h3>강점 신호</h3>

              {(selectedDimension.strength_features || []).length === 0 && (
                <p className="empty-message">표시할 강점 신호가 없습니다.</p>
              )}

              {(selectedDimension.strength_features || []).map((feature) => (
                <article
                  className="feature-card positive"
                  key={feature.feature}
                >
                  <div>
                    <strong>{feature.label}</strong>
                    <span>{formatScore(feature.score)}점</span>
                  </div>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>

            <div className="feature-panel">
              <h3>개선 필요 신호</h3>

              {(selectedDimension.risk_features || []).length === 0 && (
                <p className="empty-message">표시할 위험 신호가 없습니다.</p>
              )}

              {(selectedDimension.risk_features || []).map((feature) => (
                <article
                  className="feature-card negative"
                  key={feature.feature}
                >
                  <div>
                    <strong>{feature.label}</strong>
                    <span>{formatScore(feature.score)}점</span>
                  </div>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="improvement-section">
        <div className="section-title">
          <h2>데이터 기반 개선 제안 TOP 3</h2>
          <p>
            전체 차원의 위험 신호 중 점수가 낮은 항목을 우선 개선 대상으로
            보여줍니다.
          </p>
        </div>

        <div className="improvement-grid">
          {topRisks.length === 0 && (
            <p className="empty-message">표시할 개선 제안이 없습니다.</p>
          )}

          {topRisks.map((risk, index) => (
            <article
              className="improvement-card"
              key={`${risk.feature}-${index}`}
            >
              <span className="rank">#{index + 1}</span>
              <h3>{risk.label}</h3>
              <p className="dimension-name">{risk.dimensionLabel}</p>
              <p>{risk.description}</p>
              <strong>{formatScore(risk.score)}점</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}