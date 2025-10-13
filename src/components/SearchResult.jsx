function SearchResult({ result, onBack }) {
  return (
    <div className="search-result">
      <h2>질문: {result.query}</h2>

      {/* ✅ 서버에서 받은 answer 문자열 표시 */}
      <pre className="answer-box">{result.answer}</pre>

      {/* ✅ 참고 문서 목록 */}
      {result.contexts && (
        <>
          <h3>📚 참고 문서</h3>
          <ul>
            {result.contexts.map((ctx, i) => (
              <li key={i}>
                <b>{ctx.doc_id}</b> (p{ctx.page}) — {ctx.type}
              </li>
            ))}
          </ul>
        </>
      )}

      <button onClick={onBack}>◀ 다시 검색</button>
    </div>
  );
}

export default SearchResult;