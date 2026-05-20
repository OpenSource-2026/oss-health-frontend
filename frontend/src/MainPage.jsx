import { useState } from "react";
import "./MainPage.css";

const detailPages = {
    community: {
        title: "커뮤니티 활성도",
        cards: [
            {
                title: "기여자 활동",
                desc: "커밋, 이슈, PR 활동을 기준으로 프로젝트 커뮤니티가 얼마나 활발한지 확인합니다.",
            },
            {
                title: "참여 속도",
                desc: "새로운 이슈나 PR에 대해 얼마나 빠르게 반응하는지 분석합니다.",
            },
            {
                title: "논의 품질",
                desc: "커뮤니티 안에서 문제 해결과 의견 교환이 잘 이루어지는지 확인합니다.",
            },
        ],
    },
    sustainability: {
        title: "지속 가능성",
        cards: [
            {
                title: "기여자 구조",
                desc: "소수의 개발자에게만 의존하지 않고 여러 기여자가 참여하는지 확인합니다.",
            },
            {
                title: "활동 안정성",
                desc: "프로젝트가 꾸준히 관리되고 업데이트되는지 분석합니다.",
            },
            {
                title: "장기 유지 가능성",
                desc: "앞으로도 프로젝트가 안정적으로 유지될 가능성을 확인합니다.",
            },
        ],
    },
    quality: {
        title: "코드 품질 및 신뢰성",
        cards: [
            {
                title: "테스트 관리",
                desc: "테스트 코드와 자동화된 검증이 잘 준비되어 있는지 확인합니다.",
            },
            {
                title: "결함 관리",
                desc: "버그나 오류가 얼마나 잘 관리되고 해결되는지 분석합니다.",
            },
            {
                title: "보안 대응",
                desc: "보안 이슈에 대한 대응 수준과 프로젝트 신뢰도를 확인합니다.",
            },
        ],
    },
    governance: {
        title: "법적·운영 거버넌스",
        cards: [
            {
                title: "라이선스 관리",
                desc: "오픈소스 라이선스가 명확하게 제공되어 사용자가 법적으로 안전하게 활용할 수 있는지 확인합니다.",
            },
            {
                title: "운영 규칙",
                desc: "기여 가이드, 행동 강령, 운영 문서가 준비되어 있는지 분석합니다.",
            },
            {
                title: "프로젝트 관리 체계",
                desc: "프로젝트가 명확한 규칙과 관리 기준에 따라 운영되는지 확인합니다.",
            },
        ],
    },
    maturity: {
        title: "프로젝트 성숙도",
        cards: [
            {
                title: "릴리즈 안정성",
                desc: "버전 관리와 릴리즈가 꾸준히 이루어지는지 확인합니다.",
            },
            {
                title: "문서 완성도",
                desc: "README, 설치 방법, 사용법 등 프로젝트 이해에 필요한 문서가 충분한지 분석합니다.",
            },
            {
                title: "사용 가능성",
                desc: "실제로 사용자가 프로젝트를 쉽게 설치하고 활용할 수 있는지 확인합니다.",
            },
        ],
    },
    mypage: {
        title: "마이페이지",
        cards: [
            {
                title: "분석 기록",
                desc: "지금까지 분석한 오픈소스 프로젝트 목록과 결과를 확인합니다.",
            },
            {
                title: "점수 그래프",
                desc: "프로젝트별 Health Score 변화를 그래프로 확인합니다.",
            },
            {
                title: "내 분석 관리",
                desc: "내가 분석한 프로젝트 결과를 다시 확인하고 관리합니다.",
            },
        ],
    },
    login: {
        title: "로그인",
        cards: [
            {
                title: "계정 로그인",
                desc: "이메일과 비밀번호를 입력하여 서비스에 로그인합니다.",
            },
            {
                title: "분석 기록 불러오기",
                desc: "로그인 후 이전에 분석했던 오픈소스 프로젝트 결과를 확인할 수 있습니다.",
            },
            {
                title: "개인화 서비스",
                desc: "사용자별 분석 기록과 저장된 정보를 기반으로 서비스를 이용합니다.",
            },
        ],
    },
    signup: {
        title: "회원가입",
        cards: [
            {
                title: "새 계정 만들기",
                desc: "서비스 이용을 위해 새로운 사용자 계정을 생성합니다.",
            },
            {
                title: "분석 결과 저장",
                desc: "회원가입 후 분석한 프로젝트 결과를 계정에 저장할 수 있습니다.",
            },
            {
                title: "서비스 시작",
                desc: "계정을 만든 뒤 오픈소스 프로젝트 건강도 분석 기능을 사용할 수 있습니다.",
            },
        ],
    },
};

function Header({ setActivePage }) {
    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-button" type="button">
                    ☰
                </button>

                <button
                    className="logo-button"
                    type="button"
                    onClick={() => setActivePage("main")}
                >
                    OSHC
                </button>
            </div>

            <nav className="nav">
                <button type="button" onClick={() => setActivePage("community")}>
                    커뮤니티 활성도
                </button>
                <button type="button" onClick={() => setActivePage("sustainability")}>
                    지속 가능성
                </button>
                <button type="button" onClick={() => setActivePage("quality")}>
                    코드 품질 및 신뢰성
                </button>
                <button type="button" onClick={() => setActivePage("governance")}>
                    법적·운영 거버넌스
                </button>
                <button type="button" onClick={() => setActivePage("maturity")}>
                    프로젝트 성숙도
                </button>
                <button type="button" onClick={() => setActivePage("mypage")}>
                    마이페이지
                </button>
                <button type="button" onClick={() => setActivePage("login")}>
                    로그인
                </button>
                <button type="button" onClick={() => setActivePage("signup")}>
                    회원가입
                </button>
            </nav>

            <button className="plus-button" type="button">
                +
            </button>
        </header>
    );
}

function HomePage() {
    return (
        <main className="main">
            <section className="hero-section">
                <div className="hero-text">
                    <p className="eyebrow">Open Source Health Checker</p>

                    <h1>
                        오픈소스 프로젝트의
                        <br />
                        건강도를 한눈에 확인하세요
                    </h1>

                    <p className="hero-desc">
                        GitHub 저장소 URL을 입력하면 커뮤니티 활성도, 지속 가능성,
                        코드 품질, 거버넌스, 프로젝트 성숙도를 기준으로 프로젝트 상태를
                        분석합니다.
                    </p>

                    <div className="search-box">
                        <input type="text" placeholder="GitHub Repository URL" />
                        <button type="button">분석하기</button>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-bg"></div>

                    <div className="score-card">
                        <p>Health Score</p>
                        <strong>82</strong>
                        <span>Good</span>
                    </div>

                    <div className="floating-card community-card">
                        <span>Community</span>
                        <strong>활발함</strong>
                    </div>

                    <div className="floating-card quality-card">
                        <span>Quality</span>
                        <strong>안정적</strong>
                    </div>

                    <div className="floating-card sustainability-card">
                        <span>Sustainability</span>
                        <strong>양호</strong>
                    </div>
                </div>
            </section>

            <section className="summary-section">
                <div className="summary-card">
                    <h3>커뮤니티 활성도</h3>
                    <p>
                        기여량, 참여 속도, 논의 품질을 통해 커뮤니티가 얼마나 활발한지
                        확인합니다.
                    </p>
                </div>

                <div className="summary-card">
                    <h3>지속 가능성</h3>
                    <p>
                        기여자 구조와 활동 안정성을 바탕으로 프로젝트가 오래 유지될 수
                        있는지 봅니다.
                    </p>
                </div>

                <div className="summary-card">
                    <h3>코드 품질 및 신뢰성</h3>
                    <p>
                        테스트, 결함 관리, 보안 대응 수준을 통해 코드의 신뢰도를
                        확인합니다.
                    </p>
                </div>

                <div className="summary-card">
                    <h3>법적·운영 거버넌스</h3>
                    <p>
                        라이선스, 기여 가이드, 운영 규칙을 통해 프로젝트가 안전하고
                        체계적으로 관리되는지 확인합니다.
                    </p>
                </div>

                <div className="summary-card">
                    <h3>프로젝트 성숙도</h3>
                    <p>
                        릴리즈, 문서화, 사용 가능성을 기준으로 프로젝트가 얼마나 성숙한
                        상태인지 확인합니다.
                    </p>
                </div>
            </section>
        </main>
    );
}

function DetailPage({ page, setActivePage }) {
    return (
        <main className="detail-main">
            <button
                className="back-button"
                type="button"
                onClick={() => setActivePage("main")}
            >
                ← 메인으로
            </button>

            <section className="detail-title-box">
                <p className="eyebrow">Open Source Health Checker</p>
                <h1>{page.title}</h1>
                <p>
                    선택한 항목에 대한 분석 기준을 카드 형태로 확인할 수 있습니다.
                </p>
            </section>

            <section className="detail-card-grid">
                {page.cards.map((card) => (
                    <div className="detail-card" key={card.title}>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}

function MainPage() {
    const [activePage, setActivePage] = useState("main");

    return (
        <div className="page">
            <Header setActivePage={setActivePage} />

            {activePage === "main" ? (
                <HomePage />
            ) : (
                <DetailPage page={detailPages[activePage]} setActivePage={setActivePage} />
            )}
        </div>
    );
}

export default MainPage;