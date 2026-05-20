import React from "react";
import "./MainPage.css";

function MainPage() {
    return (
        <div className="main-page-scroll">
            <div className="main-page-wrapper">
                <header className="main-header">
                    <nav className="main-nav">
                        <button className="nav-button">마이페이지</button>
                        <button className="nav-button">커뮤니티 활동도</button>
                        <button className="nav-button">지속가능성</button>
                        <button className="nav-button">
                            코드 품질
                            <br />
                            및 신뢰성
                        </button>
                        <button className="nav-button">법적·운영 거버넌스</button>
                        <button className="nav-button">프로젝트 성숙도</button>
                    </nav>

                    <div className="auth-area">
                        <button className="login-button">로그인</button>
                        <button className="signup-button">회원가입</button>
                    </div>
                </header>

                <main className="main-content">
                    <section className="hero-section">
                        <h1 className="hero-title">OSHC</h1>
                        <p className="hero-subtitle">OpenSourceHealthChecker</p>

                        <div className="search-box">
                            <input className="url-input" type="text" placeholder="URL" />
                            <button className="analyze-button">분석하기</button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MainPage;