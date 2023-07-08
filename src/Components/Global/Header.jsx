import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-dark py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-2">
          <Link to={'/'} className="text-white text-decoration-none">اللوجو</Link>
        </div>
        <nav className="d-flex gap-3">
          <Link to={'/tasks'} className="text-white text-decoration-none">قائمة المهام</Link>
          <Link to={'/notes'} className="text-white text-decoration-none">ملاحظات</Link>
        </nav>
      </div>
    </header>
  )
}