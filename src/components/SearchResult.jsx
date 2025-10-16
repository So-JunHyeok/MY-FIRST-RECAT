import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import SearchInput from "./SearchInput"; // ✅ 입력창 하단 유지
import remarkGfm from "remark-gfm"; // ✅ 추가

function SearchResult({ result }) {
  const [messages, setMessages] = useState([]); // 전체 대화
  const chatEndRef = useRef(null);
  const [query, setQuery] = useState(""); // 새 질문 입력값
  const [loading, setLoading] = useState(false);

  // ✅ 새로운 검색 결과 들어올 때마다 대화에 추가
  useEffect(() => {
    if (!result) return;

    setMessages((prev) => {
      // 동일 답변이 이미 있으면 중복 추가 방지
      const alreadyExists = prev.some((m) => m.text === result.answer);
      if (alreadyExists) return prev;

      const userMsg = { sender: "user", text: result.query };
      const botMsg = { sender: "bot", text: result.answer || "응답이 없습니다." };
      return [...prev, userMsg, botMsg];
    });
  }, [result]);

  // ✅ 새 메시지 추가 시 자동 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ FastAPI 다시 호출 → 다음 질문 이어서 하기
  const handleSearch = async () => {
    if (!query.trim()) return;
    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setQuery("");

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      const botMsg = { sender: "bot", text: data.answer || "응답이 없습니다." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ 서버와 통신 중 오류가 발생했습니다." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* ✅ 채팅 영역 */}
      <div className="chat-list">
        {messages.map((msg, i) => (
          <ChatMessage key={i} sender={msg.sender} text={msg.text} />
        ))}

        {loading && (
          <div className="bot-block">
            <div className="chat-label">SEL-GPT</div>
            <div className="chat-message">🔄 답변 생성 중...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* ✅ 하단 입력창 항상 유지 */}
      <div className="chat-input-area">
        <SearchInput query={query} setQuery={setQuery} onSearch={handleSearch} isInitial={messages.length === 0} />
      </div>
    </div>
  );
}

// ✅ 개별 메시지 (타이핑 애니메이션 + Markdown)
function ChatMessage({ sender, text }) {
  const [displayed, setDisplayed] = useState("");
  const isBot = sender === "bot";

  useEffect(() => {
    if (!isBot) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let i = 0;
    const speed = 20;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, isBot]);

  return (
    <div className={`chat-block ${isBot ? "bot-block" : "user-block"}`}>
      <div className="chat-label">{isBot ? "SEL-GPT" : "You"}</div>
      <div className="chat-message markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayed}</ReactMarkdown>
      </div>
    </div>
  );
}

export default SearchResult;
