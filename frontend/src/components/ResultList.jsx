export default function ResultList({ result, loading }) {
  if (loading) {
    return <p>Solving…</p>;
  }

  if (!result) {
    return null;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <strong>{result.count}</strong> words found
      <div style={{ marginTop: "0.5rem", lineHeight: "1.6" }}>
        {result.words.length > 0
          ? result.words.join(", ")
          : "No matching words"}
      </div>
    </div>
  );
}
