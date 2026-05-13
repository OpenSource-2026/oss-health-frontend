import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
    const navigate = useNavigate();

    const analyzedResults = [
        {
            id: 1,
            name: "React",
            score: 92,
            image: "/placeholder.png",
        },
        {
            id: 2,
            name: "Vue",
            score: 85,
            image: "/placeholder.png",
        },
        {
            id: 3,
            name: "Spring Boot",
            score: 78,
            image: "/placeholder.png",
        },
        {
            id: 4,
            name: "Django",
            score: 88,
            image: "/placeholder.png",
        },
        {
            id: 5,
            name: "FastAPI",
            score: 81,
            image: "/placeholder.png",
        },
        {
            id: 6,
            name: "TensorFlow",
            score: 90,
            image: "/placeholder.png",
        },
    ];

    const goToResultPage = (id) => {
        navigate(`/result/${id}`);
    };

    return (
        <div className="mypage">
            <aside className="mypage-sidebar">
                <button className="mypage-menu-button">마이페이지</button>
            </aside>

            <main className="mypage-content">
                <div className="result-card-grid">
                    {analyzedResults.map((result) => (
                        <div
                            key={result.id}
                            className="result-card"
                            onClick={() => goToResultPage(result.id)}
                        >
                            <div className="result-image-box">
                                <img
                                    src={result.image}
                                    alt={`${result.name} 점수 그래프`}
                                    className="result-image"
                                />
                            </div>

                            <div className="result-info">
                                <p className="result-name">{result.name}</p>
                                <p className="result-score">총 점수 {result.score}점</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MyPage;