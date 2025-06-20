"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown";
import { FaCalendarAlt, FaChartBar, FaChartLine, FaChartPie, FaInfoCircle } from "react-icons/fa"
import "../../styles/pages/statistics.scss"

const Statistics = () => {
  const [timeRange, setTimeRange] = useState("month")
  const [output, setOutput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyzeData = async () => {
    setOutput("Đang phân tích dữ liệu...");
    try {
      const res = await fetch("http://localhost:5000/analyze/dim_products");
      if (!res.ok) throw new Error("Lỗi phân tích dữ liệu");
      const md = await res.text();
      setOutput(md); // Nếu muốn render markdown đẹp hơn, có thể dùng thư viện markdown-react-js
    } catch (err) {
      setOutput("❌ Lỗi phân tích dữ liệu.");
    }
  };

  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error("Không nhận được kết quả");
      const data = await res.text();
      setAnswer(data);
      setLoading(false);
      // setTimeout(() => {
      //   setAnswer("Đây là câu trả lời mẫu từ AI.");
      //   setLoading(false);
      // }, 1200);
    } catch (err) {
      setAnswer("❌ Lỗi khi trả lời câu hỏi. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h1>Thống kê</h1>
        {/* <div className="time-filter">
          <FaCalendarAlt />
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="week">Tuần trước</option>
            <option value="month">Tháng trước</option>
            <option value="quarter">Quý trước</option>
            <option value="year">Năm trước</option>
          </select>
        </div> */}
      </div>

      {/* Phần phân tích toàn dữ liệu và hỏi đáp AI */}
      <div className="ai-analytics-box enhanced-ai-box">
        <button className="analyze-btn enhanced-btn" onClick={handleAnalyzeData}>
          🔍 Phân tích toàn dữ liệu
        </button>
        <div className="output-box enhanced-output">
          {output && (
            <div className="markdown-content">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          )}
        </div>
        <h2 className="ai-title">💬 Đặt câu hỏi</h2>
        <div className="ai-qa-row enhanced-qa-row">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Nhập câu hỏi..."
            className="ai-qa-input enhanced-input"
            onKeyDown={e => e.key === "Enter" && handleSendQuestion()}
          />
          <button
            className="ai-qa-btn enhanced-btn"
            onClick={handleSendQuestion}
            disabled={loading || !question.trim()}
          >
            Gửi
          </button>
        </div>
        {/* <div className="ai-qa-answer enhanced-answer">
          {loading && <span>🤔 Đang suy nghĩ...</span>}
          {!loading && answer && <span>{answer}</span>}
        </div> */}
        {(loading || answer) && (
          <div className="ai-qa-answer enhanced-answer">
            {loading && <span>🤔 Đang suy nghĩ...</span>}
            {!loading && answer && (
              <div className="markdown-content">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="powerbi-container">
        <iframe
          title="hqtcsdl"
          width="100%"
          height="800"
          src="https://app.powerbi.com/reportEmbed?reportId=233b3b16-508c-4b99-9f40-214aa3a15f6e&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default Statistics
