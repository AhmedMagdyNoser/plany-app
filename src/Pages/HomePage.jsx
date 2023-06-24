import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container my-5">
      <h2>الصفحة الرئيسية</h2>
      <nav className="d-flex gap-3">
          <Link to={'/tasks'} className="text-decoration-none">قائمة المهام</Link>
          <Link to={'/notes'} className="text-decoration-none">ملاحظات</Link>
        </nav>
    </div>
  )
}