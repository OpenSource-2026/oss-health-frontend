const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function diagnoseRepository(repoUrl) {
  const response = await fetch(`${API_BASE_URL}/api/oss-health/diagnose`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      repo_url: repoUrl,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "분석 요청에 실패했습니다.");
  }

  return response.json();
}