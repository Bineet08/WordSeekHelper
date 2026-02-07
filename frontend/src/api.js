const API_URL = `${import.meta.env.VITE_API_URL}/solve`;

export async function solveWord({ pattern, included, excluded }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pattern, included, excluded })
  });

  if (!res.ok) {
    throw new Error("Server error");
  }

  return res.json();
}
