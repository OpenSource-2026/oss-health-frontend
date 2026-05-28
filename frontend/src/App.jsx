import { useState } from "react";
import ResultPage from "./pages/ResultPage";
import { diagnoseRepository } from "./api/ossHealthApi";
import "./App.css";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!repoUrl.trim()) {
      setError("GitHub 레포지토리 URL을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");

       const data = await diagnoseRepository(repoUrl);
       setResult(data);
    } catch (error) {
      setError(error.message || "분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <ResultPage
        result={result}
        onBack={() => {
          setResult(null);
          setError("");
        }}
      />
    );
  }

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="home-eyebrow">OSS Health Checker</p>
        <h1>GitHub 오픈소스 건강도 분석 서비스</h1>
        <p>
          GitHub 레포지토리 URL을 입력하면 커뮤니티 활성도, 지속 가능성,
          코드 품질 및 신뢰성, 거버넌스, 프로젝트 성숙도를 분석합니다.
        </p>

        <div className="search-box">
          <input
            value={repoUrl}
            onChange={(event) => setRepoUrl(event.target.value)}
            placeholder="https://github.com/pandas-dev/pandas"
          />
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? "분석 중..." : "분석하기"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <p className="example-text">
          예시: pandas-dev/pandas 또는 https://github.com/facebook/react
        </p>
      </section>
    </main>
  );
}

export default App;