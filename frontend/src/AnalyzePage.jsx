import { useState } from "react";
import "./AnalyzePage.css";
import ResultPage from "./pages/ResultPage";
import { diagnoseRepository } from "./api/ossHealthApi";

function AnalyzePage({ setActivePage }) {
    const [repoUrl, setRepoUrl] = useState("");
    const [analyzeStatus, setAnalyzeStatus] = useState("ready");
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const startAnalyze = async (event) => {
        event.preventDefault();

        if (repoUrl.trim() === "") {
            setErrorMessage("GitHub 저장소 주소를 입력해주세요.");
            setAnalyzeStatus("error");
            return;
        }

        setAnalyzeStatus("loading");

        try {
            const data = await diagnoseRepository(repoUrl.trim());
            setResult(data);
            setAnalyzeStatus("result");
        } catch (error) {
            setErrorMessage(error.message || "분석 중 오류가 발생했습니다.");
            setAnalyzeStatus("error");
        }
    };

    const resetAnalyze = () => {
        setRepoUrl("");
        setResult(null);
        setErrorMessage("");
        setAnalyzeStatus("ready");
    };

    if (analyzeStatus === "loading") {
        return (
            <main className="analyze-page">
                <section className="analyze-card loading-card">
                    <div className="loading-spinner"></div>

                    <p className="analyze-label">Analyzing Repository</p>

                    <h1>오픈소스 프로젝트를 분석하고 있어요</h1>

                    <p className="analyze-description">
                        GitHub 저장소 정보를 수집하고, 커뮤니티 활성도, 지속 가능성,
                        코드 품질 및 신뢰성, 법적·운영 거버넌스, 프로젝트 성숙도를
                        계산하는 중입니다.
                    </p>

                    <div className="loading-step-box">
                        <div className="loading-step active">
                            <span>01</span>
                            <p>GitHub 정보 수집 중</p>
                        </div>

                        <div className="loading-step active">
                            <span>02</span>
                            <p>건강도 지표 계산 중</p>
                        </div>

                        <div className="loading-step">
                            <span>03</span>
                            <p>분석 결과 정리 중</p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    if (analyzeStatus === "error") {
        return (
            <main className="analyze-page">
                <section className="analyze-card error-card">
                    <p className="analyze-label">Analysis Failed</p>

                    <h1>분석을 시작할 수 없어요</h1>

                    <p className="analyze-description">{errorMessage}</p>

                    <div className="error-example-box">
                        예시: https://github.com/facebook/react
                    </div>

                    <div className="analyze-button-row">
                        <button onClick={resetAnalyze}>다시 입력하기</button>

                        <button
                            className="dark-button"
                            onClick={() => setActivePage("main")}
                        >
                            메인으로 돌아가기
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    if (analyzeStatus === "result") {
        return <ResultPage result={result} onBack={resetAnalyze} />;
    }

    return (
        <main className="analyze-page">
            <section className="analyze-card">
                <p className="analyze-label">Repository Analysis</p>

                <h1>분석할 오픈소스 프로젝트를 입력하세요</h1>

                <p className="analyze-description">
                    GitHub 저장소 주소를 입력하면 오픈소스 프로젝트의 건강 상태를
                    분석합니다. 커뮤니티 활성도, 지속 가능성, 코드 품질 및 신뢰성,
                    법적·운영 거버넌스, 프로젝트 성숙도를 점수로 확인할 수 있습니다.
                </p>

                <form className="analyze-form" onSubmit={startAnalyze}>
                    <input
                        type="text"
                        value={repoUrl}
                        onChange={(event) => setRepoUrl(event.target.value)}
                        placeholder="예: https://github.com/facebook/react"
                    />

                    <button type="submit">분석 시작하기</button>
                </form>

                <div className="analyze-flow-box">
                    <h2>분석 흐름</h2>

                    <div className="flow-card-grid">
                        <div className="flow-card">
                            <span>01</span>
                            <h3>저장소 입력</h3>
                            <p>분석하고 싶은 GitHub 저장소 주소를 입력합니다.</p>
                        </div>

                        <div className="flow-card">
                            <span>02</span>
                            <h3>데이터 수집</h3>
                            <p>GitHub의 이슈, PR, 커밋, 기여자 정보를 확인합니다.</p>
                        </div>

                        <div className="flow-card">
                            <span>03</span>
                            <h3>결과 확인</h3>
                            <p>건강도 점수와 지표별 분석 결과를 확인합니다.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AnalyzePage;
