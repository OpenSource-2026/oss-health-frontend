import "./MainPage.css";

function MainPage() {
  return (
    <div className="main-container">
      <div className="main-content">
        <h1 className="logo">OSHC</h1>
        <p className="subtitle">OpenSourceHealthChecker</p>

        <div className="search-box">
          <input type="text" placeholder="URL" />
          <button>분석하기</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;