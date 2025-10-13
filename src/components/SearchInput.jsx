function SearchInput({ query, setQuery, onSearch }){
    return(
        <div className="content-wrapper">
          <h2>안녕하세요. 00님 무엇을 도와드릴까요?</h2>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="무엇이든 물어보세요"
            className="main-input"
          />
          <div className="btn-group">
            <button>시작일자</button>
            <button>종료일자</button>
            <button>지역명</button>
            <button className="accent" onClick={onSearch}>기상개요</button>
          </div>
        </div>
        );
}
export default SearchInput