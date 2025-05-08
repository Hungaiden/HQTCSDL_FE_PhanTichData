"use client"

import { useState } from "react"
import { FaCalendarAlt, FaChartBar, FaChartLine, FaChartPie, FaInfoCircle } from "react-icons/fa"
import "../../styles/pages/statistics.scss"

const Statistics = () => {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h1>Thống kê</h1>
        <div className="time-filter">
          <FaCalendarAlt />
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="week">Tuần trước</option>
            <option value="month">Tháng trước</option>
            <option value="quarter">Quý trước</option>
            <option value="year">Năm trước</option>
          </select>
        </div>
      </div>

      <div className="powerbi-container">
        <iframe 
          title="hqtcsdl" 
          width="100%" 
          height="800" 
          src="https://app.powerbi.com/reportEmbed?reportId=55c7f78c-e607-4ad5-a5c9-06ac544afe82&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f" 
          frameBorder="0" 
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default Statistics
