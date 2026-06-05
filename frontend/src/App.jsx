import { useEffect, useState } from "react";
import MainPage from "./MainPage";
import ResultPage from "./pages/ResultPage";
import { fetchSharedResult } from "./api/ossHealthApi";

// Light/dark theme persisted to localStorage and applied to <html data-theme>.
function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("oshc-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("oshc-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}

// When opened via a QR share link (`?share=<id>`), skip the main page and
// render the stored diagnosis directly — no re-analysis, no AI call.
function App() {
  const { theme, toggleTheme } = useTheme();
  const shareId = new URLSearchParams(window.location.search).get("share");

  const [sharedResult, setSharedResult] = useState(null);
  const [shareStatus, setShareStatus] = useState(shareId ? "loading" : "none");

  useEffect(() => {
    if (!shareId) return;
    let active = true;
    fetchSharedResult(shareId)
      .then((data) => {
        if (active) {
          setSharedResult(data);
          setShareStatus("ready");
        }
      })
      .catch(() => {
        if (active) setShareStatus("error");
      });
    return () => {
      active = false;
    };
  }, [shareId]);

  const leaveShareView = () => {
    // Drop the ?share param and fall back to the normal app.
    window.history.replaceState(null, "", window.location.pathname);
    setSharedResult(null);
    setShareStatus("none");
  };

  // Floating toggle for the standalone share/result view (it has no header).
  const FloatingToggle = (
    <button
      className="theme-toggle-floating"
      type="button"
      onClick={toggleTheme}
      aria-label="테마 전환"
      title="테마 전환"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );

  if (shareId && shareStatus !== "none") {
    if (shareStatus === "loading") {
      return (
        <main className="result-page">
          <div className="empty-result">
            <h1>결과를 불러오는 중입니다…</h1>
          </div>
        </main>
      );
    }

    if (shareStatus === "error") {
      return (
        <main className="result-page">
          <div className="empty-result">
            <h1>결과를 찾을 수 없습니다.</h1>
            <p>링크가 만료되었거나 잘못되었습니다. 분석을 다시 실행해주세요.</p>
            <button onClick={leaveShareView}>메인으로 이동</button>
          </div>
        </main>
      );
    }

    return (
      <>
        <ResultPage
          result={sharedResult}
          onBack={leaveShareView}
          isShared
          theme={theme}
        />
        {FloatingToggle}
      </>
    );
  }

  return <MainPage theme={theme} toggleTheme={toggleTheme} />;
}

export default App;
