import { QuestionItem } from '../types';

export const QUESTIONS_DATA: QuestionItem[] = [
  {
    id: 'targetUsers',
    number: 1,
    pillar: '1. Người dùng',
    pillarEn: 'Users & Personas',
    title: 'Đối tượng người dùng mục tiêu',
    question: 'Ai là người dùng chính và người dùng phụ sẽ trực tiếp thao tác trên web app này?',
    subtitle: 'Xác định đặc điểm, vai trò thực tế (khách hàng vãng lai, nhân viên nghiệp vụ, chuyên gia, quản trị viên...) và nhu cầu cốt lõi của họ.',
    placeholder: 'Ví dụ: Người dùng chính là nhân viên bán hàng cần tạo đơn nhanh; người dùng phụ là quản lý kho theo dõi tồn kho và chủ cửa hàng xem doanh thu tổng.',
    iconName: 'Users',
    quickOptions: [
      'Khách hàng cá nhân (B2C) & Khách vãng lai',
      'Nhân viên nội bộ & Quản trị viên (Admin)',
      'Freelancer & Người làm việc độc lập',
      'Đội ngũ nhóm làm việc cộng tác (5-20 người)',
      'Học sinh, sinh viên và giảng viên',
      'Bác sĩ / Huấn luyện viên & Khách hàng đặt lịch'
    ]
  },
  {
    id: 'coreFeatures',
    number: 2,
    pillar: '2. Chức năng',
    pillarEn: 'Core MVP Features',
    title: 'Chức năng cốt lõi (MVP)',
    question: '3 đến 5 tính năng sống còn không thể thiếu trong phiên bản đầu tiên là gì?',
    subtitle: 'Tập trung vào giá trị cốt lõi nhất giải quyết vấn đề, tránh dàn trải quá nhiều tính năng phụ làm loãng sản phẩm.',
    placeholder: 'Ví dụ: 1. Tạo và phân loại nhiệm vụ theo Kanban; 2. Gán hạn chót và gắn nhãn ưu tiên; 3. Lọc & tìm kiếm nhanh theo trạng thái; 4. Thống kê tiến độ trực quan.',
    iconName: 'Sparkles',
    quickOptions: [
      'Tạo, đọc, sửa, xóa (CRUD) dữ liệu trực tiếp',
      'Bộ lọc tìm kiếm đa tiêu chí & sắp xếp tức thì',
      'Bảng điều khiển (Dashboard) biểu đồ thống kê',
      'Hệ thống giỏ hàng và đặt hàng đơn giản',
      'Lịch biểu và chọn khung giờ trống tương tác',
      'Trợ lý AI phân tích và gợi ý nội dung tự động'
    ]
  },
  {
    id: 'dataEntities',
    number: 3,
    pillar: '3. Dữ liệu',
    pillarEn: 'Data & Storage',
    title: 'Mô hình dữ liệu & Cơ chế lưu trữ',
    question: 'Dữ liệu gồm những thực thể nào và cần lưu trữ lâu dài (Cloud Database) hay cục bộ (Local State)?',
    subtitle: 'Mô tả các trường thông tin cơ bản của từng đối tượng và hình thức lưu trữ phù hợp (Session/LocalStorage hay Firestore/Cloud SQL).',
    placeholder: 'Ví dụ: Thực thể Task (id, title, status, priority, dueDate, assignee). Lưu trữ cục bộ LocalStorage với dữ liệu mẫu khởi tạo sẵn để demo ngay.',
    iconName: 'Database',
    quickOptions: [
      'LocalStorage / Client State (nhẹ, dùng ngay không cần cấu hình)',
      'Firebase Firestore (lưu trữ cloud thời gian thực, đồng bộ đa thiết bị)',
      'Mock Data chất lượng cao với khả năng thêm/sửa/xóa mượt mà',
      'Cơ sở dữ liệu quan hệ PostgreSQL / Cloud SQL'
    ]
  },
  {
    id: 'uiStyle',
    number: 4,
    pillar: '4. Giao diện',
    pillarEn: 'UI/UX & Design Archetype',
    title: 'Phong cách giao diện & Bảng màu chủ đạo',
    question: 'Bạn muốn phong cách thị giác (archetype) và bảng màu thương hiệu như thế nào?',
    subtitle: 'Chọn phong cách thiết kế để AI Studio định hình layout, typography, khoảng trắng và phân cấp thị giác.',
    placeholder: 'Ví dụ: Phong cách Modern SaaS chuyên nghiệp, nền sáng thanh lịch (Slate 50), điểm nhấn màu xanh Indigo (#4F46E5), font chữ sans-serif sắc nét, độ tương phản cao.',
    iconName: 'Palette',
    quickOptions: [
      'Modern SaaS: Tinh tế, nền sáng xám Slate, điểm nhấn Indigo/Blue',
      'Minimalist Clean: Tối giản, nhiều khoảng trắng, tương phản đen trắng tao nhã',
      'Warm Professional: Nền ấm trung tính (Stone/Amber), thân thiện và tin cậy',
      'Dark Luxury / Tech: Nền tối than chì (Zinc 900), điểm nhấn Emerald/Cyan',
      'Creative & Vibrant: Năng động, màu sắc tươi sáng, thẻ bo góc mềm mại'
    ]
  },
  {
    id: 'permissions',
    number: 5,
    pillar: '5. Phân quyền',
    pillarEn: 'Roles & Permissions',
    title: 'Phân quyền & Vai trò truy cập',
    question: 'Ứng dụng có cần phân biệt các vai trò người dùng khác nhau không, và mỗi vai trò được làm gì?',
    subtitle: 'Xác định xem ứng dụng là Single-user (ai vào cũng dùng chung một giao diện) hay Multi-role (Admin, Editor, Viewer).',
    placeholder: 'Ví dụ: 2 vai trò: 1. Admin (quản lý người dùng, xem toàn bộ báo cáo, duyệt đơn); 2. Thành viên (chỉ tạo và chỉnh sửa công việc do mình phụ trách).',
    iconName: 'ShieldCheck',
    quickOptions: [
      'Single User: Người dùng độc lập, không cần đăng nhập phức tạp',
      'Admin & User: Quản trị viên (toàn quyền) vs Người dùng thông thường (giới hạn)',
      'Khách (Guest) & Thành viên (Member) đã kích hoạt',
      'Role-Switcher: Nút chuyển đổi vai trò nhanh trên header để kiểm thử trải nghiệm'
    ]
  },
  {
    id: 'userFlow',
    number: 6,
    pillar: '6. Quy trình',
    pillarEn: 'Critical User Journey',
    title: 'Quy trình sử dụng chính (Happy Path)',
    question: 'Trình tự từng bước người dùng thao tác từ lúc mở app đến khi hoàn tất mục tiêu chính là gì?',
    subtitle: 'Vẽ ra luồng trải nghiệm lý tưởng giúp AI dựng đúng cấu trúc điều hướng và trạng thái chuyển tiếp.',
    placeholder: 'Ví dụ: Bước 1: Mở app thấy ngay Dashboard tổng quan; Bước 2: Bấm "+ Thêm mới"; Bước 3: Điền form nhanh với validate tức thì; Bước 4: Danh sách cập nhật ngay lập tức với animation mượt.',
    iconName: 'GitMerge',
    quickOptions: [
      'Vào Dashboard -> Xem danh sách -> Thêm/Sửa nhanh -> Xem chi tiết',
      'Tìm kiếm/Lọc sản phẩm -> Xem chi tiết -> Thêm giỏ -> Điền form đặt hàng',
      'Chọn dịch vụ -> Chọn ngày & giờ -> Điền thông tin -> Nhận mã xác nhận',
      'Nhập nội dung/đầu vào -> Bấm Tạo với AI -> Xem kết quả & Tùy chỉnh -> Xuất file'
    ]
  },
  {
    id: 'targetDevices',
    number: 7,
    pillar: '7. Thiết bị',
    pillarEn: 'Target Devices & Responsive',
    title: 'Thiết bị ưu tiên & Khả năng hiển thị',
    question: 'Thiết kế ưu tiên màn hình Desktop (bàn làm việc) hay Mobile (điện thoại) trước?',
    subtitle: 'Giúp AI lựa chọn bố cục phù hợp (bố cục cột bên Sidebar cho Desktop hay Bottom Navigation / Drawer cho Mobile).',
    placeholder: 'Ví dụ: Ưu tiên Responsive hoàn hảo cả Desktop và Mobile; Desktop hiển thị dạng bảng và bento-grid rộng rãi, Mobile chuyển sang thẻ card gọn gàng với nút bấm tối thiểu 44px.',
    iconName: 'Laptop',
    quickOptions: [
      'Responsive Cân Bằng: Đẹp mắt trên cả Desktop (1440px) và Mobile (375px)',
      'Desktop-First: Tối ưu cho màn hình máy tính làm việc văn phòng, bảng biểu nhiều cột',
      'Mobile-First: Tối ưu trải nghiệm vuốt chạm trên điện thoại, thao tác một tay'
    ]
  },
  {
    id: 'integrations',
    number: 8,
    pillar: '8. Tích hợp',
    pillarEn: 'Integrations & AI Capabilities',
    title: 'Tương tác phụ & Tích hợp công nghệ',
    question: 'Ứng dụng có cần tích hợp thêm tính năng thông minh AI, xuất file, hoặc thông báo không?',
    subtitle: 'Chỉ ra các tiện ích gia tăng giá trị thực sự cho người dùng.',
    placeholder: 'Ví dụ: Tích hợp trợ lý Gemini AI để tóm tắt nội dung tự động; hỗ trợ xuất danh sách ra file CSV / Excel; thông báo Toast khi hoàn thành thao tác.',
    iconName: 'Cpu',
    quickOptions: [
      'Tích hợp Gemini AI xử lý ngôn ngữ & tóm tắt tự động',
      'Xuất dữ liệu ra file Excel / CSV hoặc PDF',
      'Hệ thống thông báo Toast nổi (thành công / cảnh báo)',
      'Không cần tích hợp phức tạp, tập trung hoàn thiện trải nghiệm mượt mà'
    ]
  },
  {
    id: 'systemStates',
    number: 9,
    pillar: '9. Trạng thái',
    pillarEn: 'System States & Feedback',
    title: 'Xử lý trạng thái rỗng, đang tải và lỗi',
    question: 'Giao diện xử lý thế nào khi chưa có dữ liệu (Empty State), lúc tải (Loading) hoặc khi có lỗi?',
    subtitle: 'Một ứng dụng đẳng cấp cần có hướng dẫn thân thiện khi chưa có dữ liệu thay vì một màn hình trống rỗng.',
    placeholder: 'Ví dụ: Khi chưa có dữ liệu: Hiển thị hình minh họa nhẹ nhàng cùng nút bấm "Tạo mục đầu tiên ngay"; Lúc tải: Dùng hiệu ứng Skeleton nhấp nháy; Lỗi: Thông báo rõ ràng kèm nút "Thử lại".',
    iconName: 'Layers',
    quickOptions: [
      'Empty State trực quan kèm lời gọi hành động (Call To Action) rõ ràng',
      'Skeleton Loading nhấp nháy tinh tế thay vì vòng xoay thông thường',
      'Validate form trực tiếp thời gian thực với thông báo lỗi đỏ tinh tế',
      'Nút xác nhận hoàn tác (Undo) cho các thao tác xóa quan trọng'
    ]
  },
  {
    id: 'completionCriteria',
    number: 10,
    pillar: '10. Hoàn thành',
    pillarEn: 'Definition of Done & Acceptance',
    title: 'Tiêu chí hoàn thành (Acceptance Criteria)',
    question: 'Khi nào thì sản phẩm được coi là thành công và đạt chuẩn bàn giao/demo?',
    subtitle: 'Checklist cụ thể để kiểm tra xem ứng dụng đã sẵn sàng chạy thực tế hay chưa.',
    placeholder: 'Ví dụ: 1. Đầy đủ chức năng CRUD không lỗi console; 2. Responsive mượt mà không vỡ layout; 3. Dữ liệu lưu trữ bền bỉ sau khi F5 tải lại trang; 4. Thời gian phản hồi tức thì.',
    iconName: 'CheckCircle2',
    quickOptions: [
      'Giao diện trực quan, sẵn sàng tương tác ngay không cần cấu hình phức tạp',
      'Đầy đủ luồng thao tác từ thêm mới đến hoàn tất, có thông báo phản hồi',
      'Lưu trữ trạng thái bền bỉ (giữ nguyên dữ liệu sau khi tải lại trang)',
      'Responsive chuẩn từ điện thoại nhỏ (375px) đến màn hình lớn (1920px)',
      'Không có lỗi console hoặc trạng thái đơ lag'
    ]
  }
];
