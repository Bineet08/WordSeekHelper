const API_URL = "http://localhost:3000/solve";

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
