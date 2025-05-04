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

      <div className="stats-grid">
        <div className="stat-card wide">
          <div className="stat-header">
            <h3>Tổng quan doanh số</h3>
            <FaChartLine />
          </div>
          <div className="chart-container">
            <div className="chart sales-chart">
              <div className="chart-bars">
                <div className="chart-bar" style={{ height: "60%" }}>
                  <span className="chart-value">14.5M</span>
                  <span className="chart-label">T1</span>
                </div>
                <div className="chart-bar" style={{ height: "75%" }}>
                  <span className="chart-value">18.2M</span>
                  <span className="chart-label">T2</span>
                </div>
                <div className="chart-bar" style={{ height: "45%" }}>
                  <span className="chart-value">10.8M</span>
                  <span className="chart-label">T3</span>
                </div>
                <div className="chart-bar" style={{ height: "90%" }}>
                  <span className="chart-value">21.6M</span>
                  <span className="chart-label">T4</span>
                </div>
                <div className="chart-bar" style={{ height: "70%" }}>
                  <span className="chart-value">16.9M</span>
                  <span className="chart-label">T5</span>
                </div>
                <div className="chart-bar" style={{ height: "85%" }}>
                  <span className="chart-value">20.4M</span>
                  <span className="chart-label">T6</span>
                </div>
                <div className="chart-bar active" style={{ height: "100%" }}>
                  <span className="chart-value">24.5M</span>
                  <span className="chart-label">T7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Doanh thu theo danh mục</h3>
            <FaChartPie />
          </div>
          <div className="chart-container">
            <div className="pie-chart">
              <div className="pie-chart-container"></div>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="color-box men"></span>
              <span>Thời trang nam (45%)</span>
            </div>
            <div className="legend-item">
              <span className="color-box women"></span>
              <span>Thời trang nữ (35%)</span>
            </div>
            <div className="legend-item">
              <span className="color-box accessories"></span>
              <span>Phụ kiện (15%)</span>
            </div>
            <div className="legend-item">
              <span className="color-box other"></span>
              <span>Khác (5%)</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Sản phẩm bán chạy</h3>
            <FaChartBar />
          </div>
          <div className="chart-container">
            <div className="horizontal-bar-chart">
              <div className="h-bar-item">
                <div className="h-bar-label">Áo thun nam</div>
                <div className="h-bar-container">
                  <div className="h-bar" style={{ width: "90%" }}></div>
                  <span className="h-bar-value">125</span>
                </div>
              </div>
              <div className="h-bar-item">
                <div className="h-bar-label">Đầm nữ</div>
                <div className="h-bar-container">
                  <div className="h-bar" style={{ width: "78%" }}></div>
                  <span className="h-bar-value">98</span>
                </div>
              </div>
              <div className="h-bar-item">
                <div className="h-bar-label">Áo hoodie</div>
                <div className="h-bar-container">
                  <div className="h-bar" style={{ width: "70%" }}></div>
                  <span className="h-bar-value">87</span>
                </div>
              </div>
              <div className="h-bar-item">
                <div className="h-bar-label">Quần jean nữ</div>
                <div className="h-bar-container">
                  <div className="h-bar" style={{ width: "61%" }}></div>
                  <span className="h-bar-value">76</span>
                </div>
              </div>
              <div className="h-bar-item">
                <div className="h-bar-label">Áo sơ mi nam</div>
                <div className="h-bar-container">
                  <div className="h-bar" style={{ width: "52%" }}></div>
                  <span className="h-bar-value">65</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Tỷ lệ chuyển đổi</h3>
            <FaInfoCircle />
          </div>
          <div className="chart-container">
            <div className="donut-chart-container">
              <div className="donut-chart"></div>
              <div className="donut-center">
                <div className="donut-value">3.8%</div>
                <div className="donut-label">Tỷ lệ chuyển đổi</div>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="color-box" style={{ backgroundColor: "var(--success-color)" }}></span>
                <span>Mua hàng (35%)</span>
              </div>
              <div className="legend-item">
                <span className="color-box" style={{ backgroundColor: "var(--info-color)" }}></span>
                <span>Thêm vào giỏ (30%)</span>
              </div>
              <div className="legend-item">
                <span className="color-box" style={{ backgroundColor: "var(--warning-color)" }}></span>
                <span>Xem chi tiết (20%)</span>
              </div>
              <div className="legend-item">
                <span className="color-box" style={{ backgroundColor: "var(--danger-color)" }}></span>
                <span>Rời đi (15%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card wide">
          <div className="stat-header">
            <h3>Doanh thu theo tháng</h3>
            <FaChartBar />
          </div>
          <div className="chart-container">
            <div className="monthly-revenue-chart">
              <div className="chart-bars">
                <div className="chart-bar" style={{ height: "60%" }}>
                  <span className="chart-value">12.5M</span>
                  <span className="chart-label">T1</span>
                </div>
                <div className="chart-bar" style={{ height: "50%" }}>
                  <span className="chart-value">10.8M</span>
                  <span className="chart-label">T2</span>
                </div>
                <div className="chart-bar" style={{ height: "70%" }}>
                  <span className="chart-value">15.2M</span>
                  <span className="chart-label">T3</span>
                </div>
                <div className="chart-bar" style={{ height: "65%" }}>
                  <span className="chart-value">14.1M</span>
                  <span className="chart-label">T4</span>
                </div>
                <div className="chart-bar" style={{ height: "80%" }}>
                  <span className="chart-value">17.3M</span>
                  <span className="chart-label">T5</span>
                </div>
                <div className="chart-bar" style={{ height: "90%" }}>
                  <span className="chart-value">19.6M</span>
                  <span className="chart-label">T6</span>
                </div>
                <div className="chart-bar active" style={{ height: "100%" }}>
                  <span className="chart-value">21.8M</span>
                  <span className="chart-label">T7</span>
                </div>
                <div className="chart-bar" style={{ height: "85%" }}>
                  <span className="chart-value">18.4M</span>
                  <span className="chart-label">T8</span>
                </div>
                <div className="chart-bar" style={{ height: "75%" }}>
                  <span className="chart-value">16.2M</span>
                  <span className="chart-label">T9</span>
                </div>
                <div className="chart-bar" style={{ height: "95%" }}>
                  <span className="chart-value">20.5M</span>
                  <span className="chart-label">T10</span>
                </div>
                <div className="chart-bar" style={{ height: "88%" }}>
                  <span className="chart-value">19.1M</span>
                  <span className="chart-label">T11</span>
                </div>
                <div className="chart-bar" style={{ height: "110%" }}>
                  <span className="chart-value">23.9M</span>
                  <span className="chart-label">T12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card wide">
          <div className="stat-header">
            <h3>So sánh doanh thu năm nay và năm trước</h3>
            <FaChartBar />
          </div>
          <div className="chart-container">
            <div className="comparison-chart">
              <div className="comparison-group">
                <div className="comparison-bars">
                  <div className="comparison-bar current" style={{ height: "80%" }}>
                    <span className="bar-value">12.5M</span>
                  </div>
                  <div className="comparison-bar previous" style={{ height: "60%" }}>
                    <span className="bar-value">9.2M</span>
                  </div>
                </div>
                <div className="comparison-label">Q1</div>
              </div>
              <div className="comparison-group">
                <div className="comparison-bars">
                  <div className="comparison-bar current" style={{ height: "90%" }}>
                    <span className="bar-value">14.8M</span>
                  </div>
                  <div className="comparison-bar previous" style={{ height: "75%" }}>
                    <span className="bar-value">11.5M</span>
                  </div>
                </div>
                <div className="comparison-label">Q2</div>
              </div>
              <div className="comparison-group">
                <div className="comparison-bars">
                  <div className="comparison-bar current" style={{ height: "100%" }}>
                    <span className="bar-value">16.2M</span>
                  </div>
                  <div className="comparison-bar previous" style={{ height: "85%" }}>
                    <span className="bar-value">13.8M</span>
                  </div>
                </div>
                <div className="comparison-label">Q3</div>
              </div>
              <div className="comparison-group">
                <div className="comparison-bars">
                  <div className="comparison-bar current" style={{ height: "95%" }}>
                    <span className="bar-value">15.5M</span>
                  </div>
                  <div className="comparison-bar previous" style={{ height: "90%" }}>
                    <span className="bar-value">14.6M</span>
                  </div>
                </div>
                <div className="comparison-label">Q4</div>
              </div>
            </div>
          </div>
          <div className="chart-legend" style={{ justifyContent: "center" }}>
            <div className="legend-item">
              <span className="color-box" style={{ backgroundColor: "var(--primary-color)" }}></span>
              <span>Năm nay</span>
            </div>
            <div className="legend-item">
              <span className="color-box" style={{ backgroundColor: "var(--secondary-color)" }}></span>
              <span>Năm trước</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-tables">
        <div className="stats-table">
          <h3>Doanh số theo khu vực</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Khu vực</th>
                  <th>Đơn hàng</th>
                  <th>Doanh thu</th>
                  <th>Tăng trưởng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Miền Bắc</td>
                  <td>1.245</td>
                  <td>12.450.000đ</td>
                  <td className="positive">+12.5%</td>
                </tr>
                <tr>
                  <td>Miền Trung</td>
                  <td>985</td>
                  <td>9.850.000đ</td>
                  <td className="positive">+8.3%</td>
                </tr>
                <tr>
                  <td>Miền Nam</td>
                  <td>1.745</td>
                  <td>17.450.000đ</td>
                  <td className="positive">+15.7%</td>
                </tr>
                <tr>
                  <td>Tây Nguyên</td>
                  <td>365</td>
                  <td>3.650.000đ</td>
                  <td className="negative">-2.1%</td>
                </tr>
                <tr>
                  <td>Đông Nam Bộ</td>
                  <td>518</td>
                  <td>5.180.000đ</td>
                  <td className="positive">+5.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="stats-table">
          <h3>Doanh số theo thiết bị</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Thiết bị</th>
                  <th>Lượt truy cập</th>
                  <th>Tỷ lệ chuyển đổi</th>
                  <th>Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Di động</td>
                  <td>8.245</td>
                  <td>3.5%</td>
                  <td>18.450.000đ</td>
                </tr>
                <tr>
                  <td>Máy tính</td>
                  <td>5.125</td>
                  <td>4.2%</td>
                  <td>12.350.000đ</td>
                </tr>
                <tr>
                  <td>Máy tính bảng</td>
                  <td>1.875</td>
                  <td>2.8%</td>
                  <td>3.780.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
