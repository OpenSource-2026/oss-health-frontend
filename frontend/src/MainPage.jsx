import { useState } from "react";
import "./MainPage.css";

const menuData = {
    community: {
        title: "커뮤니티 활동도",
        cards: [
            {
                title: "Activity Volume",
                text: "프로젝트 기여량과 활동 수준을 직접적으로 반영한다.\n\nCHAOSS에서 기본 vitality 지표로 해석이 가능하다.",
            },
            {
                title: "Responsiveness",
                text: "커뮤니티의 상호작용 속도 및 유지보수의 효율성을 반영한다.\n\n활발한 커뮤니티는 문제와 기여에 빠르게 반응한다는 특징을 가지고 있다.",
            },
            {
                title: "Engagement Quality",
                text: "단순 활동량이 아닌 의미가 있는 논의와 참여 구조를 측정한다.\n\n건강한 커뮤니티는 상호작용의 질이 높다는 근거에 따라 적용된다.",
            },
        ],
    },
    sustainability: {
        title: "지속 가능성",
        cards: [
            {
                title: "Contributor Structure",
                text: "특정 개인의 의존도와 기여 편중 정도를 측정한다.\n\n특정 소수에 과도하게 의존할수록 지속 가능성이 낮아진다는 근거가 있다.",
            },
            {
                title: "Diversity",
                text: "신규 참여 유입과 참여 주체의 다양성을 측정한다.\n\n다양한 참여자 기반은 장기 생존 가능성을 높이는 특징을 가지고 있다.",
            },
            {
                title: "Activity Stability",
                text: "활동의 지속성, 공백, 불규칙성을 측정한다.\n\n지속 가능성은 평균 활동량보다 안정성에 더 크게 좌우된다는 근거에 따라 적용된다.",
            },
        ],
    },
    code: {
        title: "코드 품질 및 신뢰성",
        cards: [
            {
                title: "Engineering Practice",
                text: "테스트·검증·자동화 등 개발 프로세스 성숙도를 반영하여 분석한다.\n\nISO/IEC 25010의 유지보수성과 연계 가능하다는 특징이 있다.",
            },
            {
                title: "Defect Signals",
                text: "결함 발생과 수정 효율성을 측정한다.\n\n품질이 높은 프로젝트일수록 결함 관리가 체계적이라는 근거에 따라 분석한다.",
            },
            {
                title: "Security Signals",
                text: "보안 대응 및 취약점의 관리 수준을 측정한다.\n\n신뢰 가능한 프로젝트는 보안 관리 체계를 가진다.",
            },
        ],
    },
    governance: {
        title: "법적·운영 거버넌스",
        cards: [
            {
                title: "Legal Compliance",
                text: "라이선스의 존재와 법적 명확성을 측정한다.\n\nOpenChain 관점에서 필수 요소라는 특징을 지니고 있다.",
            },
            {
                title: "Governance Structure",
                text: "운영 규칙, 기여 규범, 유지 보수 구조 존재의 여부를 측정한다.\n\n거버넌스 문서가 있을수록 조직적 운영 가능성이 높아진다는 근거에 의존한다.",
            },
        ],
    },
    maturity: {
        title: "프로젝트 성숙도",
        cards: [
            {
                title: "Release Engineering",
                text: "릴리즈 운영 체계와 버전 관리의 성숙도를 평가한다.\n\n성숙한 프로젝트일수록 릴리즈 체계가 명확하다는 특징이 있다.",
            },
            {
                title: "Adoption / Popularity",
                text: "프로젝트의 수용도와 생태계 확장성을 측정한다.\n\n널리 채택된 프로젝트는 상대적으로 성숙도가 높다는 근거에 따라 적용된다.",
            },
            {
                title: "Lifecycle / Scale",
                text: "프로젝트의 규모, 이력, 운영 범위를 평가한다.\n\n장기간 운영되며 구조가 축적된 프로젝트일수록 성숙 가능성이 높다는 특징이 있다.",
            },
        ],
    },
};

function MainPage() {
    const [page, setPage] = useState("main");

    if (page === "login") {
        return (
            <div className="auth-page">
                <div className="auth-logo" onClick={() => setPage("main")}>
                    <h1>OSHC</h1>
                    <p>OpenSourceHealthChecker</p>
                </div>

                <div className="auth-box">
                    <label>아이디</label>
                    <input type="text" placeholder="Value" />

                    <label>비밀번호</label>
                    <input type="password" placeholder="Value" />

                    <button>로그인</button>
                </div>
            </div>
        );
    }

    if (page === "signup") {
        return (
            <div className="auth-page">
                <div className="auth-logo" onClick={() => setPage("main")}>
                    <h1>OSHC</h1>
                    <p>OpenSourceHealthChecker</p>
                </div>

                <div className="auth-box">
                    <label>이메일</label>
                    <input type="email" placeholder="Value" />

                    <label>아이디</label>
                    <input type="text" placeholder="Value" />

                    <label>비밀번호</label>
                    <input type="password" placeholder="Value" />

                    <button>회원가입</button>
                </div>
            </div>
        );
    }

    if (menuData[page]) {
        const current = menuData[page];

        return (
            <div className="category-page">
                <aside className="side-bar">
                    <div className="side-top">
                        <button className="icon-btn">☰</button>
                        <button className="side-logo" onClick={() => setPage("main")}>
                            OSHC
                        </button>
                        <button className="icon-btn">⊕</button>
                    </div>

                    <div className="side-search">
                        <input placeholder="URL" />
                        <span>⌕</span>
                    </div>

                    <p className="side-label">Menu</p>

                    <button
                        className={page === "community" ? "side-active" : ""}
                        onClick={() => setPage("community")}
                    >
                        커뮤니티 활동도
                    </button>
                    <button
                        className={page === "sustainability" ? "side-active" : ""}
                        onClick={() => setPage("sustainability")}
                    >
                        지속 가능성
                    </button>
                    <button
                        className={page === "code" ? "side-active" : ""}
                        onClick={() => setPage("code")}
                    >
                        코드 품질 및 신뢰성
                    </button>
                    <button
                        className={page === "governance" ? "side-active" : ""}
                        onClick={() => setPage("governance")}
                    >
                        법적·운영 거버넌스
                    </button>
                    <button
                        className={page === "maturity" ? "side-active" : ""}
                        onClick={() => setPage("maturity")}
                    >
                        프로젝트 성숙도
                    </button>
                </aside>

                <main className="category-content">
                    <h1>{current.title}</h1>

                    <div className={`category-card-grid count-${current.cards.length}`}>
                        {current.cards.map((card) => (
                            <div className="category-card" key={card.title}>
                                <h2>{card.title}</h2>
                                <p>{card.text}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="page">
            <section className="main-section">
                <header className="navbar">
                    <div className="navbar-inner">
                        <nav className="nav-menu">
                            <button className="nav-active">마이페이지</button>
                            <button onClick={() => setPage("community")}>
                                커뮤니티 활동도
                            </button>
                            <button onClick={() => setPage("sustainability")}>
                                지속가능성
                            </button>
                            <button className="two-line" onClick={() => setPage("code")}>
                                코드 품질
                                <br />
                                및 신뢰성
                            </button>
                            <button onClick={() => setPage("governance")}>
                                법적·운영 거버넌스
                            </button>
                            <button onClick={() => setPage("maturity")}>
                                프로젝트 성숙도
                            </button>
                        </nav>

                        <div className="auth-buttons">
                            <button className="login-btn" onClick={() => setPage("login")}>
                                로그인
                            </button>
                            <button className="signup-btn" onClick={() => setPage("signup")}>
                                회원가입
                            </button>
                        </div>
                    </div>
                </header>

                <div className="hero-content">
                    <h1>OSHC</h1>
                    <p>OpenSourceHealthChecker</p>

                    <div className="search-box">
                        <input type="text" placeholder="URL" />
                        <button>분석하기</button>
                    </div>
                </div>
            </section>

            <section className="detail-section">
                <h2>세부 항목</h2>

                <div className="detail-grid">
                    <div className="detail-card">
                        <h3>커뮤니티 활동도</h3>
                        <p>• Activity Volume : 프로젝트 기여량과 활동 수준을 직접적으로 반영</p>
                        <p>• Responsiveness : 커뮤니티 상호작용 속도 및 유지보수 효율성 반영</p>
                        <p>• Engagement Quality : 단순 활동량이 아닌 의미있는 논의와 참여 구조를 측정</p>
                    </div>

                    <div className="detail-card">
                        <h3>지속 가능성</h3>
                        <p>• Contributor Structure : 특정 개인 의존도와 기여 편중 정도 측정</p>
                        <p>• Diversity : 신규 참여 유입과 참여 주체의 다양성 측정</p>
                        <p>• Activity Stability : 활동의 지속성, 공백, 불규칙성 측정</p>
                    </div>

                    <div className="detail-card">
                        <h3>코드 품질 및 신뢰성</h3>
                        <p>• Engineering Practice : 테스트·검증·자동화 등 개발 프로세스 성숙도 반영</p>
                        <p>• Defect Signals : 결함 발생과 수정 효율성 측정</p>
                        <p>• Security Signals : 보안 대응 및 취약점 관리 수준 측정</p>
                    </div>

                    <div className="detail-card wide">
                        <h3>법적·운영 거버넌스</h3>
                        <p>• Legal compliance : 라이선스 존재와 법적 명확성 측정</p>
                        <p>• Governance Structure : 운영 규칙, 기여 규범, 유지 보수 구조 존재 여부 측정</p>
                    </div>

                    <div className="detail-card wide">
                        <h3>프로젝트 성숙도</h3>
                        <p>• Release Engineering : 릴리즈 운영 체계와 버전 관리 성숙도 평가</p>
                        <p>• Adoption / Popularity : 프로젝트 수용도와 생태계 확장성 측정</p>
                        <p>• Lifecycle / Scale : 프로젝트 규모, 이력, 운영 범위 평가</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainPage;