import "./MainPage.css";

function MainPage() {
    return (
        <div className="page">
            {/* 첫 번째 화면 */}
            <section className="main-section">
                <nav className="navbar">
                    <div className="nav-menu">
                        <button className="nav-active">마이페이지</button>
                        <span>커뮤니티 활동도</span>
                        <span>지속가능성</span>
                        <span>코드 품질<br />및 신뢰성</span>
                        <span>법적·운영 거버넌스</span>
                        <span>프로젝트 성숙도</span>
                    </div>

                    <div className="nav-buttons">
                        <button className="login-btn">로그인</button>
                        <button className="signup-btn">회원가입</button>
                    </div>
                </nav>

                <div className="hero-content">
                    <h1>OSHC</h1>
                    <p>OpenSourceHealthChecker</p>

                    <div className="search-box">
                        <input type="text" placeholder="URL" />
                        <button>분석하기</button>
                    </div>
                </div>
            </section>

            {/* 두 번째 화면 */}
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