import { useState } from "react";
import "./MainPage.css";
import AnalyzePage from "./AnalyzePage";

const detailPages = {
    community: {
        title: "커뮤니티 활성도",
        description:
            "오픈소스 프로젝트가 얼마나 활발하게 운영되고 있는지 확인하는 지표입니다.",
        cards: [
            {
                title: "Issue 활동",
                text: "최근 이슈가 꾸준히 생성되고 해결되는지 확인합니다.",
            },
            {
                title: "Pull Request 활동",
                text: "PR이 활발하게 올라오고 병합되는지 확인합니다.",
            },
            {
                title: "Contributor 참여",
                text: "여러 기여자가 프로젝트에 지속적으로 참여하는지 확인합니다.",
            },
        ],
    },
    sustainability: {
        title: "지속 가능성",
        description:
            "프로젝트가 앞으로도 유지될 가능성이 높은지 확인하는 지표입니다.",
        cards: [
            {
                title: "최근 업데이트",
                text: "최근 커밋과 릴리즈가 꾸준히 이루어지는지 확인합니다.",
            },
            {
                title: "관리자 반응성",
                text: "관리자가 이슈와 PR에 얼마나 빠르게 반응하는지 확인합니다.",
            },
            {
                title: "장기 유지 가능성",
                text: "프로젝트가 오래 방치되지 않고 관리되고 있는지 확인합니다.",
            },
        ],
    },
    quality: {
        title: "코드 품질 및 신뢰성",
        description:
            "프로젝트 코드가 안정적이고 신뢰할 수 있는지 확인하는 지표입니다.",
        cards: [
            {
                title: "테스트 여부",
                text: "테스트 코드나 CI 환경이 준비되어 있는지 확인합니다.",
            },
            {
                title: "문서화 상태",
                text: "README, 사용법, 기여 가이드가 잘 작성되어 있는지 확인합니다.",
            },
            {
                title: "코드 관리 상태",
                text: "코드 구조와 관리 방식이 안정적인지 확인합니다.",
            },
        ],
    },
    governance: {
        title: "법적·운영 거버넌스",
        description:
            "라이선스, 운영 정책, 기여 규칙처럼 프로젝트 운영에 필요한 기준을 확인하는 지표입니다.",
        cards: [
            {
                title: "라이선스 명시",
                text: "프로젝트에 오픈소스 라이선스가 명확하게 작성되어 있는지 확인합니다.",
            },
            {
                title: "기여 규칙",
                text: "CONTRIBUTING 문서처럼 기여자가 참고할 수 있는 규칙이 있는지 확인합니다.",
            },
            {
                title: "운영 정책",
                text: "프로젝트 운영 방식과 관리 기준이 잘 정리되어 있는지 확인합니다.",
            },
        ],
    },
    maturity: {
        title: "프로젝트 성숙도",
        description:
            "프로젝트가 어느 정도 안정적으로 성장했는지 확인하는 지표입니다.",
        cards: [
            {
                title: "릴리즈 기록",
                text: "버전 관리와 릴리즈 기록이 꾸준히 관리되는지 확인합니다.",
            },
            {
                title: "사용자 기반",
                text: "Star, Fork, Watch 등 사용자 관심도를 확인합니다.",
            },
            {
                title: "프로젝트 안정성",
                text: "초기 실험 단계인지, 실제 사용 가능한 안정 단계인지 확인합니다.",
            },
        ],
    },
};

function Header({ activePage, setActivePage, isLoggedIn, setIsLoggedIn }) {
    const goMain = () => {
        setActivePage("main");
    };

    const logout = () => {
        setIsLoggedIn(false);
        setActivePage("main");
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="logo-button" onClick={goMain}>
                    OSHC
                </button>

                <nav className="nav-menu nav-left-menu">
                    <button
                        className={activePage === "community" ? "active" : ""}
                        onClick={() => setActivePage("community")}
                    >
                        커뮤니티 활성도
                    </button>

                    <button
                        className={activePage === "sustainability" ? "active" : ""}
                        onClick={() => setActivePage("sustainability")}
                    >
                        지속 가능성
                    </button>

                    <button
                        className={activePage === "quality" ? "active" : ""}
                        onClick={() => setActivePage("quality")}
                    >
                        코드 품질 및 신뢰성
                    </button>

                    <button
                        className={activePage === "governance" ? "active" : ""}
                        onClick={() => setActivePage("governance")}
                    >
                        법적·운영 거버넌스
                    </button>

                    <button
                        className={activePage === "maturity" ? "active" : ""}
                        onClick={() => setActivePage("maturity")}
                    >
                        프로젝트 성숙도
                    </button>

                    <button
                        className={activePage === "analyze" ? "active" : ""}
                        onClick={() => setActivePage("analyze")}
                    >
                        프로젝트 분석
                    </button>
                </nav>
            </div>

            <nav className="nav-menu nav-right-menu">
                <button
                    className={`nav-auth-button ${activePage === "mypage" ? "active" : ""
                        }`}
                    onClick={() => setActivePage("mypage")}
                >
                    마이페이지
                </button>

                {isLoggedIn ? (
                    <button className="nav-auth-button" onClick={logout}>
                        로그아웃
                    </button>
                ) : (
                    <>
                        <button
                            className={`nav-auth-button ${activePage === "login" ? "active" : ""
                                }`}
                            onClick={() => setActivePage("login")}
                        >
                            로그인
                        </button>

                        <button
                            className={`nav-auth-button ${activePage === "signup" ? "active" : ""
                                }`}
                            onClick={() => setActivePage("signup")}
                        >
                            회원가입
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}

function HomePage({ setActivePage }) {
    return (
        <main className="home-page">
            <section className="hero-section">
                <div className="hero-text-box">
                    <p className="hero-label">Open Source Health Checker</p>

                    <h1>
                        오픈소스 프로젝트의
                        <br />
                        건강 상태를 한눈에 확인하세요
                    </h1>

                    <p className="hero-description">
                        GitHub 오픈소스 프로젝트의 커뮤니티 활성도, 지속 가능성, 코드
                        품질, 거버넌스, 성숙도를 분석하여 프로젝트의 상태를 쉽게 확인할 수
                        있도록 도와줍니다.
                    </p>

                    <div className="hero-buttons">
                        <button onClick={() => setActivePage("analyze")}>
                            프로젝트 분석하기
                        </button>

                        <button
                            className="outline-button"
                            onClick={() => setActivePage("community")}
                        >
                            지표 살펴보기
                        </button>

                        <button
                            className="outline-button"
                            onClick={() => setActivePage("mypage")}
                        >
                            마이페이지
                        </button>
                    </div>
                </div>

                <div className="hero-visual-box">
                    <div className="score-card">
                        <p className="score-title">Health Score</p>
                        <h2>OSHC</h2>
                        <p className="score-description">
                            오픈소스 프로젝트를 여러 기준으로 분석합니다.
                        </p>

                        <div className="score-bar">
                            <span></span>
                        </div>

                        <div className="mini-stats">
                            <div>
                                <strong>5</strong>
                                <p>분석 지표</p>
                            </div>

                            <div>
                                <strong>AI</strong>
                                <p>리포트</p>
                            </div>

                            <div>
                                <strong>GitHub</strong>
                                <p>데이터</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="summary-section">
                <div
                    className="summary-card"
                    onClick={() => setActivePage("community")}
                >
                    <h3>커뮤니티 활성도</h3>
                    <p>이슈, PR, 기여자 활동을 기반으로 프로젝트의 활발함을 확인합니다.</p>
                </div>

                <div
                    className="summary-card"
                    onClick={() => setActivePage("sustainability")}
                >
                    <h3>지속 가능성</h3>
                    <p>최근 업데이트와 관리자 반응을 통해 유지 가능성을 확인합니다.</p>
                </div>

                <div className="summary-card" onClick={() => setActivePage("quality")}>
                    <h3>코드 품질 및 신뢰성</h3>
                    <p>테스트, 문서화, 코드 관리 상태를 통해 신뢰도를 확인합니다.</p>
                </div>

                <div
                    className="summary-card"
                    onClick={() => setActivePage("governance")}
                >
                    <h3>법적·운영 거버넌스</h3>
                    <p>라이선스, 기여 규칙, 운영 정책이 잘 갖춰져 있는지 확인합니다.</p>
                </div>

                <div className="summary-card" onClick={() => setActivePage("maturity")}>
                    <h3>프로젝트 성숙도</h3>
                    <p>릴리즈 기록, 사용자 기반, 안정성을 통해 성숙도를 확인합니다.</p>
                </div>
            </section>
        </main>
    );
}

function DetailPage({ page, setActivePage }) {
    const data = detailPages[page];

    return (
        <main className="detail-page">
            <button className="back-button" onClick={() => setActivePage("main")}>
                ← 메인으로
            </button>

            <section className="detail-hero">
                <p className="detail-label">OSHC Analysis Metric</p>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
            </section>

            <section className="detail-card-grid">
                {data.cards.map((card, index) => (
                    <article className="detail-card" key={index}>
                        <span>{index + 1}</span>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}

function LoginPage({ setActivePage, setIsLoggedIn }) {
    const handleLogin = (event) => {
        event.preventDefault();

        setIsLoggedIn(true);
        setActivePage("mypage");
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <button className="auth-logo" onClick={() => setActivePage("main")}>
                    OSHC
                </button>

                <p className="auth-service-name">OpenSourceHealthChecker</p>

                <h1>로그인</h1>

                <form className="auth-form" onSubmit={handleLogin}>
                    <input type="text" placeholder="아이디" />
                    <input type="password" placeholder="비밀번호" />

                    <button className="auth-submit-button" type="submit">
                        로그인
                    </button>
                </form>

                <p className="auth-switch-text">
                    아직 계정이 없나요?
                    <button type="button" onClick={() => setActivePage("signup")}>
                        회원가입
                    </button>
                </p>
            </section>
        </main>
    );
}

function SignupPage({ setActivePage, setIsLoggedIn }) {
    const handleSignup = (event) => {
        event.preventDefault();

        setIsLoggedIn(true);
        setActivePage("mypage");
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <button className="auth-logo" onClick={() => setActivePage("main")}>
                    OSHC
                </button>

                <p className="auth-service-name">OpenSourceHealthChecker</p>

                <h1>회원가입</h1>

                <form className="auth-form" onSubmit={handleSignup}>
                    <input type="email" placeholder="이메일" />
                    <input type="text" placeholder="아이디" />
                    <input type="password" placeholder="비밀번호" />

                    <button className="auth-submit-button" type="submit">
                        회원가입
                    </button>
                </form>

                <p className="auth-switch-text">
                    이미 계정이 있나요?
                    <button type="button" onClick={() => setActivePage("login")}>
                        로그인
                    </button>
                </p>
            </section>
        </main>
    );
}

function LoginRequiredPage({ setActivePage }) {
    return (
        <main className="auth-required-page">
            <section className="auth-required-card">
                <h1>마이페이지</h1>

                <p className="auth-required-text">
                    마이페이지를 이용하려면 로그인이 필요합니다.
                </p>

                <p className="auth-required-subtext">
                    로그인 후 분석한 오픈소스 프로젝트의 그래프, 프로젝트 이름, 점수를
                    확인할 수 있습니다.
                </p>

                <div className="auth-required-actions">
                    <button onClick={() => setActivePage("login")}>로그인하기</button>

                    <button
                        className="secondary-button"
                        onClick={() => setActivePage("signup")}
                    >
                        회원가입
                    </button>
                </div>
            </section>
        </main>
    );
}

function MyPage({ isLoggedIn, setActivePage }) {
    if (!isLoggedIn) {
        return <LoginRequiredPage setActivePage={setActivePage} />;
    }

    return (
        <main className="mypage-section">
            <section className="mypage-content">
                <h1>마이페이지</h1>

                <p className="mypage-description">
                    분석한 오픈소스 프로젝트 결과를 확인할 수 있습니다.
                </p>

                <div className="empty-analysis-card">
                    <div className="empty-graph-placeholder">
                        <div className="empty-graph-line line-one"></div>
                        <div className="empty-graph-line line-two"></div>
                        <div className="empty-graph-line line-three"></div>
                    </div>

                    <h2>아직 분석한 프로젝트가 없습니다.</h2>

                    <p>
                        오픈소스 프로젝트를 분석하면 이 공간에 그래프 이미지, 오픈소스 이름,
                        점수가 표시됩니다.
                    </p>

                    <button
                        className="auth-submit-button"
                        type="button"
                        onClick={() => setActivePage("analyze")}
                    >
                        프로젝트 분석하러 가기
                    </button>
                </div>
            </section>
        </main>
    );
}

function MainPage() {
    const [activePage, setActivePage] = useState("main");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const renderPage = () => {
        if (activePage === "main") {
            return <HomePage setActivePage={setActivePage} />;
        }

        if (activePage === "analyze") {
            return (
                <AnalyzePage
                    setActivePage={setActivePage}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />
            );
        }

        if (activePage === "login") {
            return (
                <LoginPage
                    setActivePage={setActivePage}
                    setIsLoggedIn={setIsLoggedIn}
                />
            );
        }

        if (activePage === "signup") {
            return (
                <SignupPage
                    setActivePage={setActivePage}
                    setIsLoggedIn={setIsLoggedIn}
                />
            );
        }

        if (activePage === "mypage") {
            return <MyPage isLoggedIn={isLoggedIn} setActivePage={setActivePage} />;
        }

        return <DetailPage page={activePage} setActivePage={setActivePage} />;
    };

    return (
        <div className="page-wrapper">
            <Header
                activePage={activePage}
                setActivePage={setActivePage}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />

            {renderPage()}
        </div>
    );
}

export default MainPage;