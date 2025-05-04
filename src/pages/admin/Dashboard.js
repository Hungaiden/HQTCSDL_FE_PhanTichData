import { FaShoppingCart, FaUsers, FaMoneyBillWave, FaBoxOpen } from "react-icons/fa"
import "../../styles/pages/dashboard.scss"

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1>Tổng quan</h1>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon sales">
            <FaShoppingCart />
          </div>
          <div className="stat-details">
            <h3>Tổng đơn hàng</h3>
            <p className="stat-value">24.580.000đ</p>
            <p className="stat-change positive">+12.5% so với tháng trước</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-details">
            <h3>Tổng người dùng</h3>
            <p className="stat-value">1.245</p>
            <p className="stat-change positive">+8.3% so với tháng trước</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <FaMoneyBillWave />
          </div>
          <div className="stat-details">
            <h3>Doanh thu</h3>
            <p className="stat-value">18.420.000đ</p>
            <p className="stat-change positive">+5.7% so với tháng trước</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <FaBoxOpen />
          </div>
          <div className="stat-details">
            <h3>Sản phẩm</h3>
            <p className="stat-value">384</p>
            <p className="stat-change negative">-2.1% so với tháng trước</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="recent-orders">
          <h2>Đơn hàng gần đây</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Khách hàng</th>
                  <th>Ngày</th>
                  <th>Số tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ĐH-0045</td>
                  <td>Nguyễn Văn An</td>
                  <td>15/05/2023</td>
                  <td>2.850.000đ</td>
                  <td>
                    <span className="status completed">Hoàn thành</span>
                  </td>
                </tr>
                <tr>
                  <td>#ĐH-0044</td>
                  <td>Trần Thị Bình</td>
                  <td>14/05/2023</td>
                  <td>1.450.000đ</td>
                  <td>
                    <span className="status processing">Đang xử lý</span>
                  </td>
                </tr>
                <tr>
                  <td>#ĐH-0043</td>
                  <td>Lê Văn Cường</td>
                  <td>14/05/2023</td>
                  <td>850.000đ</td>
                  <td>
                    <span className="status completed">Hoàn thành</span>
                  </td>
                </tr>
                <tr>
                  <td>#ĐH-0042</td>
                  <td>Phạm Thị Dung</td>
                  <td>13/05/2023</td>
                  <td>1.990.000đ</td>
                  <td>
                    <span className="status pending">Chờ xác nhận</span>
                  </td>
                </tr>
                <tr>
                  <td>#ĐH-0041</td>
                  <td>Hoàng Văn Em</td>
                  <td>13/05/2023</td>
                  <td>1.495.000đ</td>
                  <td>
                    <span className="status cancelled">Đã hủy</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="top-products">
          <h2>Sản phẩm bán chạy</h2>
          <ul className="product-list">
            <li>
              <div className="product-image">
                <img src="/placeholder.svg?height=50&width=50" alt="Sản phẩm" />
              </div>
              <div className="product-info">
                <h4>Áo thun nam cổ tròn</h4>
                <p>299.000đ | Đã bán 125</p>
              </div>
            </li>
            <li>
              <div className="product-image">
                <img src="/placeholder.svg?height=50&width=50" alt="Sản phẩm" />
              </div>
              <div className="product-info">
                <h4>Đầm nữ mùa hè</h4>
                <p>499.000đ | Đã bán 98</p>
              </div>
            </li>
            <li>
              <div className="product-image">
                <img src="/placeholder.svg?height=50&width=50" alt="Sản phẩm" />
              </div>
              <div className="product-info">
                <h4>Áo hoodie unisex</h4>
                <p>399.000đ | Đã bán 87</p>
              </div>
            </li>
            <li>
              <div className="product-image">
                <img src="/placeholder.svg?height=50&width=50" alt="Sản phẩm" />
              </div>
              <div className="product-info">
                <h4>Quần jean nữ</h4>
                <p>599.000đ | Đã bán 76</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
