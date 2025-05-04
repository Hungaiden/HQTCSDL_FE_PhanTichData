import { Link } from "react-router-dom"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"
import "../../styles/layout/userFooter.scss"

const UserFooter = () => {
  return (
    <footer className="user-footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-widgets">
            <div className="footer-widget">
              <h3 className="widget-title">Về chúng tôi</h3>
              <div className="about-us">
                <div className="footer-logo">
                  <h2>Thời Trang Việt</h2>
                </div>
                <p>
                  Chúng tôi là thương hiệu thời trang hàng đầu Việt Nam, cung cấp các sản phẩm chất lượng cao với giá cả
                  hợp lý. Với hơn 10 năm kinh nghiệm, chúng tôi tự hào mang đến cho khách hàng những trải nghiệm mua sắm
                  tuyệt vời nhất.
                </p>
                <div className="social-links">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <FaInstagram />
                  </a>
                  <a href="#">
                    <FaTwitter />
                  </a>
                  <a href="#">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-widget">
              <h3 className="widget-title">Danh mục sản phẩm</h3>
              <ul className="widget-links">
                <li>
                  <Link to="/products?category=nam">Thời trang nam</Link>
                </li>
                <li>
                  <Link to="/products?category=nu">Thời trang nữ</Link>
                </li>
                <li>
                  <Link to="/products?category=tre-em">Thời trang trẻ em</Link>
                </li>
                <li>
                  <Link to="/products?category=phu-kien">Phụ kiện</Link>
                </li>
                <li>
                  <Link to="/products?category=sale">Khuyến mãi</Link>
                </li>
                <li>
                  <Link to="/products?category=bo-suu-tap">Bộ sưu tập mới</Link>
                </li>
              </ul>
            </div>

            <div className="footer-widget">
              <h3 className="widget-title">Hỗ trợ khách hàng</h3>
              <ul className="widget-links">
                <li>
                  <a href="#">Hướng dẫn mua hàng</a>
                </li>
                <li>
                  <a href="#">Chính sách đổi trả</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="#">Chính sách thanh toán</a>
                </li>
                <li>
                  <a href="#">Chính sách vận chuyển</a>
                </li>
                <li>
                  <a href="#">Câu hỏi thường gặp</a>
                </li>
              </ul>
            </div>

            <div className="footer-widget">
              <h3 className="widget-title">Liên hệ với chúng tôi</h3>
              <ul className="contact-info">
                <li>
                  <FaMapMarkerAlt />
                  <span>123 Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh</span>
                </li>
                <li>
                  <FaPhoneAlt />
                  <span>Hotline: 1900 1234</span>
                </li>
                <li>
                  <FaEnvelope />
                  <span>Email: contact@thoitrangviet.com</span>
                </li>
              </ul>
              <div className="newsletter">
                <h4>Đăng ký nhận tin</h4>
                <form>
                  <input type="email" placeholder="Nhập email của bạn" />
                  <button type="submit">Đăng ký</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Thời Trang Việt. Tất cả quyền được bảo lưu.</p>
          </div>
          <div className="payment-methods">
            <img src="/placeholder.svg?height=30&width=200" alt="Phương thức thanh toán" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default UserFooter
