import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import "./ResultPage.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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

export default function ResultPage({ result, onBack }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dimensions = useMemo(() => result?.dimension_scores || [], [result]);
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

  const radarData = useMemo(
    () => ({
      labels: dimensions.map((d) => d.label),
      datasets: [
        {
          label: "건강도 점수",
          data: dimensions.map((d) => (d.score == null ? 0 : d.score)),
          backgroundColor: "rgba(56, 132, 255, 0.2)",
          borderColor: "rgba(56, 132, 255, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(56, 132, 255, 1)",
        },
      ],
    }),
    [dimensions]
  );

  const radarOptions = {
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20, backdropColor: "transparent" },
        pointLabels: { font: { size: 13 } },
      },
    },
    plugins: { legend: { display: false } },
  };

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

        <button className="back-button" onClick={onBack}>
          다시 분석하기
        </button>
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

      <section className="radar-section">
        <div className="section-title">
          <h2>건강도 한눈에 보기</h2>
          <p>5개 평가 차원을 하나의 도형으로 — 넓을수록 건강한 프로젝트입니다.</p>
        </div>

        <div className="radar-wrap" style={{ height: 380, maxWidth: 560, margin: "0 auto" }}>
          <Radar data={radarData} options={radarOptions} />
        </div>
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

      {result.ai_report && (
        <section className="ai-report-section">
          <div className="section-title">
            <h2>AI 분석 리포트</h2>
            <p>Gemini가 진단 결과를 해석한 종합 요약과 제안입니다.</p>
          </div>

          <p className="ai-summary">{result.ai_report.summary}</p>

          <div className="feature-columns">
            <div className="feature-panel">
              <h3>강점</h3>
              {(result.ai_report.strengths || []).map((item, index) => (
                <article className="feature-card positive" key={`s-${index}`}>
                  <p>{item}</p>
                </article>
              ))}
            </div>

            <div className="feature-panel">
              <h3>개선 제안</h3>
              {(result.ai_report.improvements || []).map((item, index) => (
                <article className="feature-card negative" key={`i-${index}`}>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}