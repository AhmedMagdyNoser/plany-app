import { Link } from "react-router-dom";
import { FadeIn } from "../Utils/Fade";

export default function MainSection() {
  return (
    <FadeIn milliSeconds="1000" className="container py-5">
      <div className="py-5 flex-center flex-column gap-4 text-center">
        <h2 className="text-dark pb-4 border-bottom">اجعل حياتك أكثر تنظيما وفعالية</h2>
        <p className="text-muted" style={{ width: "500px", maxWidth: "90%" }}>
          باستخدام الأدوات المناسبة لتحقيق النجاح ، قم بزيادة إنتاجيتك إلى الحد الأقصى ، حدد بسهولة أولويات المهام وقم بتعيين التذكيرات.
        </p>
        <nav className="flex-center flex-wrap gap-3">
          <HomeButton title="قائمة المهام" path="/tasks" iconClass="fa-solid fa-circle-check" />
          <HomeButton title="الملاحظات" path="/notes" iconClass="fa-solid fa-pen-clip" />
        </nav>
      </div>
    </FadeIn>
  );
}

function HomeButton({ title, path, iconClass }) {
  return (
    <Link
      to={path}
      className="flex-grow-1 border-bottom flex-center flex-column text-dark gap-4 p-5 rounded opacity-hover cursor-pointer text-decoration-none"
      style={{ background: "#eee" }}
    >
      <i className={iconClass + " fs-2"}></i>
      <span className="text-center">{title}</span>
    </Link>
  );
}
