// Resolve the API base URL from the build/runtime env:
//   - Docker build passes VITE_API_BASE_URL="" (explicit empty) → same-origin,
//     so the browser calls /api on whatever host serves the page and nginx
//     reverse-proxies to the backend (lets a phone open the QR link via LAN IP).
//   - Dev copies .env from .env.example, setting http://localhost:8000.
//   - If the var is entirely unset, fall back to localhost:8000 for local dev.
// `??` (not `||`) preserves an explicit empty string (same-origin) as-is.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

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

// Fetch a previously-computed diagnosis by its share id (used when a phone
// opens the QR link `?share=<id>`). No re-analysis or AI call — the stored
// result is returned as-is.
export async function fetchSharedResult(shareId) {
  const response = await fetch(
    `${API_BASE_URL}/api/oss-health/result/${encodeURIComponent(shareId)}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "공유된 결과를 불러오지 못했습니다.");
  }

  return response.json();
}
