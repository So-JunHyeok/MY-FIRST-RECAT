
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import './main.css';

function MainArea(){
  const [query, setQuery] = useState("");         // 검색어
  const [result, setResult] = useState(null);     // 검색 결과 (null = 아직 없음)
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null);      // 에러 상태

  // ✅ FastAPI 서버로 요청 보내기
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const data = await response.json();
      setResult(data); // ✅ RAG 결과 저장
    } catch (err) {
      console.error("API 호출 실패:", err);
      setError("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 다시 검색 초기화
  const handleReset = () => {
    setResult(null);
    setQuery("");
    setError(null);
  };

    return(
    <div className="main-area">
      {/* 상단 상태창 영역 */}
      <div className="main-content-top">
        <div className="status-bar">
          <button className="status-btn">SEL-GPT</button>
          <span className="status-model">GPT-5 auto</span>
        </div>
      </div>

      {/* 본문 콘텐츠 영역 */}
      <div className="main-content">
        {loading && <p>🔄 LLM이 검색 중입니다...</p>}
        {error && <p className="error-text">{error}</p>}       
      {/* 조건부 렌더링 */}
      {!result && !loading ? (
        <SearchInput
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
      ) : (
          !loading && result && (
            <SearchResult result={result} onBack={handleReset} />
          )
      )}
      </div>
    </div>
    );
}
export default MainArea