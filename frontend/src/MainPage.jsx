import "./MainPage.css";

function MainPage() {
    return (
        <div>
            {/* ✅ 첫 화면 */}
            <section className="hero">
                <h1>OSHC</h1>
                <p>OpenSourceHealthChecker</p>

                <div className="search-box">
                    <input type="text" placeholder="URL" />
                    <button>분석하기</button>
                </div>
            </section>

            {/* ✅ 스크롤 내리면 나오는 화면 */}
            <section className="second">
                <h2>전체 대시보드</h2>

                <div className="card-container">
                    <div className="card">Health Score</div>
                    <div className="card">Activity</div>
                    <div className="card">Responsiveness</div>
                    <div className="card">Sustainability</div>
                </div>
            </section>
        </div>
    );
}

export default MainPage;