import { useState } from "react";
import "./AnalyzePage.css";

function AnalyzePage({ setActivePage }) {
    const [repoUrl, setRepoUrl] = useState("");
    const [analyzeStatus, setAnalyzeStatus] = useState("ready");

    const startAnalyze = (event) => {
        event.preventDefault();

        if (repoUrl.trim() === "") {
            setAnalyzeStatus("error");
            return;
        }

        setAnalyzeStatus("loading");

        setTimeout(() => {
            setAnalyzeStatus("result");
        }, 2500);
    };

    const resetAnalyze = () => {
        setRepoUrl("");
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

                    <p className="analyze-description">
                        GitHub 저장소 주소가 비어있습니다. 분석할 오픈소스 프로젝트의
                        GitHub 주소를 입력해주세요.
                    </p>

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
        return (
            <main className="analyze-page">
                <section className="analyze-card result-card">
                    <p className="analyze-label">Analysis Result</p>

                    <h1>분석 결과 화면</h1>

                    <p className="analyze-description">
                        아직 백엔드와 연결되지 않았기 때문에 실제 분석 결과는 표시하지
                        않습니다. 나중에 API가 연결되면 이 화면에 그래프 이미지,
                        오픈소스 이름, 점수, 지표별 결과가 표시됩니다.
                    </p>

                    <div className="result-layout">
                        <div className="graph-placeholder">
                            <div className="graph-line line-a"></div>
                            <div className="graph-line line-b"></div>
                            <div className="graph-line line-c"></div>
                            <p>그래프 이미지 영역</p>
                        </div>

                        <div className="result-info-box">
                            <div>
                                <span>오픈소스 이름</span>
                                <strong>분석 후 표시 예정</strong>
                            </div>

                            <div>
                                <span>GitHub 저장소 주소</span>
                                <strong>분석 후 표시 예정</strong>
                            </div>

                            <div>
                                <span>전체 건강도 점수</span>
                                <strong>분석 후 표시 예정</strong>
                            </div>
                        </div>
                    </div>

                    <div className="metric-result-grid">
                        <div>
                            <span>커뮤니티 활성도</span>
                            <p>분석 후 표시 예정</p>
                        </div>

                        <div>
                            <span>지속 가능성</span>
                            <p>분석 후 표시 예정</p>
                        </div>

                        <div>
                            <span>코드 품질 및 신뢰성</span>
                            <p>분석 후 표시 예정</p>
                        </div>

                        <div>
                            <span>법적·운영 거버넌스</span>
                            <p>분석 후 표시 예정</p>
                        </div>

                        <div>
                            <span>프로젝트 성숙도</span>
                            <p>분석 후 표시 예정</p>
                        </div>
                    </div>

                    <div className="analyze-button-row">
                        <button onClick={resetAnalyze}>다른 프로젝트 분석하기</button>

                        <button
                            className="dark-button"
                            onClick={() => setActivePage("mypage")}
                        >
                            마이페이지로 이동
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="analyze-page">
            <section className="analyze-card">
                <p className="analyze-label">Repository Analysis</p>

                <h1>분석할 오픈소스 프로젝트를 입력하세요</h1>

                <p className="analyze-description">
                    GitHub 저장소 주소를 입력하면 오픈소스 프로젝트의 건강 상태를
                    분석합니다. 현재는 백엔드 연결 전이므로 화면 흐름만 확인할 수
                    있습니다.
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