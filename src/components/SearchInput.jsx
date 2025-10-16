
function SearchInput({ query, setQuery, onSearch, isInitial }){
    return(
        <div className="content-wrapper">
      {/* ✅ 초기 화면일 때만 인사 문구 표시 */}
      {isInitial && <h2>안녕하세요. 무엇을 도와드릴까요?</h2>}
          <div className="input-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="무엇이든 물어보세요"
            className="main-input"
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          <button className="send-btn" onClick={onSearch}>
          <img src="up-icon.png" alt="전송" />
          </button>
        </div>
      </div>
        );
}
export default SearchInput