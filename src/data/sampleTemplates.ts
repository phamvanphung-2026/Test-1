import { AppTemplate } from '../types';

export const SAMPLE_TEMPLATES: AppTemplate[] = [
  {
    id: 'kanban-task',
    name: 'Quản Lý Công Việc Nhóm (Task Kanban)',
    badge: 'Phổ biến nhất',
    icon: 'Kanban',
    appName: 'TeamFlow - Bảng Quản Lý Công Việc Nhóm',
    description: 'Ứng dụng quản lý công việc và tiến độ dự án theo phương pháp Kanban cho nhóm 5-15 người với phân loại thẻ, deadline và lọc trạng thái.',
    answers: {
      targetUsers: 'Trưởng nhóm (Team Lead) phân công và giám sát; Thành viên nhóm (Member) cập nhật trạng thái công việc hàng ngày.',
      coreFeatures: '1. Bảng Kanban kéo thả hoặc chuyển trạng thái (Cần làm, Đang làm, Đã xong); 2. Tạo thẻ việc có hạn chót, độ ưu tiên, tag phân loại; 3. Bộ lọc tìm kiếm nhanh theo nhãn và người phụ trách; 4. Bảng thống kê tỉ lệ hoàn thành công việc theo tuần.',
      dataEntities: 'Thực thể Task (id, title, description, status, priority, dueDate, assignee, tags); Thực thể Column (id, title, order). Lưu trữ cục bộ LocalStorage đồng thời cung cấp dữ liệu mẫu khởi tạo phong phú.',
      uiStyle: 'Modern SaaS phong cách Linear / Notion; bảng màu Slate thanh lịch, điểm nhấn màu chàm Indigo (#4F46E5); thẻ bo góc 12px, độ tương phản cao sắc nét.',
      permissions: 'Hỗ trợ nút chuyển nhanh 2 vai trò: Trưởng nhóm (được xóa cột, chỉnh sửa toàn bộ) và Thành viên (chỉ cập nhật trạng thái nhiệm vụ của mình).',
      userFlow: 'Mở ứng dụng thấy ngay bảng Kanban -> Click "+ Thêm nhiệm vụ" ở cột Cần làm -> Điền tiêu đề, chọn hạn chót -> Nhiệm vụ xuất hiện ngay lập tức -> Click vào thẻ để xem chi tiết hoặc chuyển cột.',
      targetDevices: 'Ưu tiên Desktop dashboard cho màn hình rộng (có chế độ cuộn ngang các cột), hỗ trợ xem danh sách thu gọn trên điện thoại thông minh.',
      integrations: 'Tích hợp nút "AI Gợi ý chia nhỏ task" bằng Gemini API; hỗ trợ xuất danh sách công việc ra file CSV / Markdown.',
      systemStates: 'Cột rỗng hiển thị thông điệp nhẹ nhàng "Chưa có nhiệm vụ nào, bấm để thêm"; Thao tác xóa có thông báo Toast xác nhận với nút Hoàn tác (Undo).',
      completionCriteria: '1. Thao tác thêm/sửa/xóa task hoạt động mượt mà không lỗi; 2. Dữ liệu được lưu trong LocalStorage sau khi F5; 3. Lọc và tìm kiếm tức thì; 4. Bảng thống kê cập nhật số liệu ngay khi trạng thái đổi.'
    }
  },
  {
    id: 'ecommerce-mini',
    name: 'Cửa Hàng Trực Tuyến (Mini E-Commerce)',
    badge: 'Bán hàng',
    icon: 'ShoppingBag',
    appName: 'UrbanStyle - Cửa Hàng Thời Trang & Phụ Kiện',
    description: 'Web app bán lẻ thời trang tối giản với danh mục sản phẩm, bộ lọc khoảng giá, giỏ hàng nổi, và quy trình thanh toán giả lập với mã vận đơn.',
    answers: {
      targetUsers: 'Khách hàng mua sắm trực tuyến cần xem và đặt hàng nhanh; Chủ cửa hàng cần xem danh sách đơn mới đặt.',
      coreFeatures: '1. Danh mục sản phẩm dạng lưới kèm ảnh, giá, nhãn giảm giá; 2. Bộ lọc theo danh mục, size và khoảng giá; 3. Giỏ hàng trượt (Slide-over Cart) cập nhật số lượng tức thì; 4. Form thanh toán nhập địa chỉ và mã giảm giá; 5. Màn hình xác nhận đơn hàng thành công kèm mã vận đơn.',
      dataEntities: 'Thực thể Product (id, name, price, originalPrice, category, image, inStock, rating); Thực thể CartItem (productId, quantity, selectedSize); Thực thể Order (id, customerName, phone, address, items, total, status, createdAt).',
      uiStyle: 'Minimalist Clean phong cách Apple / Zara; nền trắng tinh khôi kết hợp xám nhạt Zinc, font chữ chữ không chân cao cấp, hình ảnh lớn nổi bật, điểm nhấn đen tuyền sang trọng.',
      permissions: 'Single User (Khách mua sắm tự do không cần đăng nhập); có thanh chuyển sang chế độ "Xem quản lý đơn hàng" dành cho chủ shop.',
      userFlow: 'Khách duyệt sản phẩm -> Lọc theo loại áo/quần -> Click "Thêm vào giỏ" -> Mở giỏ hàng kiểm tra tổng tiền -> Bấm "Thanh toán" -> Điền thông tin giao hàng -> Nhận thông báo đặt hàng thành công.',
      targetDevices: 'Mobile-First tối ưu cho người mua lướt điện thoại (nút Mua ngay dính đáy màn hình), đồng thời hiển thị lưới 4 cột đẹp mắt trên Desktop.',
      integrations: 'Tính năng áp mã voucher giảm giá tự động; xuất biên lai đơn hàng ra định dạng in ấn sạch.',
      systemStates: 'Giỏ hàng rỗng có gợi ý "Khám phá các sản phẩm hot"; Tìm kiếm không thấy kết quả gợi ý xóa bộ lọc.',
      completionCriteria: '1. Thêm bớt số lượng trong giỏ hàng tính toán chuẩn xác tiền ship và tổng cộng; 2. Đặt hàng thành công lưu vào lịch sử đơn; 3. Không vỡ layout trên màn hình nhỏ.'
    }
  },
  {
    id: 'booking-appointment',
    name: 'Đặt Lịch Hẹn & Dịch Vụ (Booking System)',
    badge: 'Dịch vụ',
    icon: 'Calendar',
    appName: 'GlowStudio - Đặt Lịch Làm Đẹp & Spa',
    description: 'Hệ thống đặt lịch hẹn dịch vụ theo ngày và khung giờ trống, chọn chuyên viên và nhận xác nhận lịch hẹn tức thì.',
    answers: {
      targetUsers: 'Khách hàng có nhu cầu đặt hẹn làm đẹp trước để không phải chờ đợi; Lễ tân hoặc Chuyên viên quản lý lịch hẹn trong ngày.',
      coreFeatures: '1. Xem danh mục dịch vụ với giá và thời lượng thực hiện; 2. Chọn ngày trên lịch tương tác và chọn khung giờ còn trống; 3. Chọn chuyên viên yêu thích; 4. Xác nhận đặt lịch và gửi mã hẹn; 5. Bảng quản lý lịch hẹn theo ngày cho quản trị viên.',
      dataEntities: 'Thực thể Service (id, name, duration, price, category); Thực thể Specialist (id, name, avatar, rating); Thực thể Booking (id, serviceId, specialistId, date, timeSlot, clientName, clientPhone, status).',
      uiStyle: 'Warm Aesthetic phong cách Studio cao cấp; tông màu be ấm (Stone/Warm White), điểm nhấn màu Rose Gold / Amber sang trọng, đường nét thanh thoát.',
      permissions: 'Chế độ Khách hàng (chỉ xem và đặt lịch) và Chế độ Lễ tân (duyệt lịch, hủy lịch hoặc chuyển trạng thái Đã hoàn thành).',
      userFlow: 'Khách chọn dịch vụ -> Chọn chuyên viên -> Chọn ngày trên lịch -> Chọn giờ còn trống (vd: 14:00 - 15:00) -> Điền tên & SĐT -> Bấm Đặt lịch -> Màn hình hiển thị thiệp xác nhận lịch hẹn.',
      targetDevices: 'Responsive toàn diện, tối ưu thao tác ngón tay chạm chọn giờ trên điện thoại.',
      integrations: 'Nút bấm "Thêm vào Google Calendar" tiện lợi; thông báo Toast nhắc nhở trước giờ hẹn.',
      systemStates: 'Những khung giờ đã có người đặt sẽ bị làm mờ (disabled); ngày nghỉ sẽ có chú thích rõ ràng.',
      completionCriteria: '1. Khung giờ đã đặt không thể bị chọn trùng; 2. Lịch hẹn mới xuất hiện ngay trong tab quản lý của Lễ tân; 3. Form kiểm tra hợp lệ số điện thoại.'
    }
  },
  {
    id: 'finance-tracker',
    name: 'Quản Lý Thu Chi Cá Nhân (Personal Finance)',
    badge: 'Tài chính',
    icon: 'PieChart',
    appName: 'Moneta - Sổ Thu Chi & Ngân Sách Thông Minh',
    description: 'Ứng dụng theo dõi thu chi hàng ngày, phân bổ ngân sách theo hũ chi tiêu và trực quan hóa dòng tiền qua biểu đồ trực quan.',
    answers: {
      targetUsers: 'Người đi làm, sinh viên hoặc chủ kinh doanh nhỏ muốn kiểm soát chi tiêu cá nhân chặt chẽ.',
      coreFeatures: '1. Ghi nhanh khoản thu / chi chỉ trong 3 giây; 2. Phân loại theo danh mục (Ăn uống, Mua sắm, Hóa đơn, Tiết kiệm...); 3. Biểu đồ tròn cơ cấu chi tiêu và biểu đồ cột so sánh theo tháng; 4. Thiết lập hạn mức ngân sách và cảnh báo khi chi quá 80%.',
      dataEntities: 'Thực thể Transaction (id, amount, type: "income" | "expense", category, date, note); Thực thể Category (id, name, icon, color, budgetLimit).',
      uiStyle: 'Fintech Modern; nền xám thanh lịch Slate 50, điểm nhấn màu xanh ngọc Emerald lá cây cho thu nhập (#10B981) và màu san hô Rose cho chi tiêu (#F43F5E); số liệu rõ ràng dễ đọc.',
      permissions: 'Single User độc lập bảo mật dữ liệu trên máy người dùng.',
      userFlow: 'Vào app thấy ngay Số dư tổng + Biểu đồ tháng này -> Bấm nút nổi "+ Chi tiêu" -> Nhập số tiền, chọn danh mục Ăn uống -> Bấm Lưu -> Biểu đồ cập nhật tức thì và hiển thị tiến độ ngân sách.',
      targetDevices: 'Mobile-first cho việc nhập chi tiêu lúc đang đi ngoài đường, kèm Dashboard phân tích chuyên sâu khi xem trên laptop.',
      integrations: 'Hỗ trợ xuất sao kê chi tiêu ra file CSV; phân tích gợi ý tiết kiệm thông minh.',
      systemStates: 'Tháng mới chưa có chi tiêu hiển thị "Chưa có giao dịch, ghi lại khoản đầu tiên của bạn"; Cảnh báo màu vàng nổi bật khi gần chạm trần ngân sách.',
      completionCriteria: '1. Tính toán đúng số dư (Tổng thu - Tổng chi); 2. Biểu đồ phản ánh chính xác số liệu; 3. Dữ liệu không bị mất khi đóng trình duyệt.'
    }
  }
];
