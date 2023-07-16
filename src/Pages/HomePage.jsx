import { useNavigate } from "react-router-dom";
import { FadeIn } from "../Components/Utils/Fade";

export default function HomePage() {
  return (
    <FadeIn milliSeconds="1000">
      <div className="container py-5 flex-center flex-column gap-4">
        <h1 className="text-center text-dark py-4 border-bottom">اجعل حياتك أكثر تنظيما وفعالية</h1>
        <p className="text-center text-muted" style={{ width: "500px", maxWidth: "100%" }}>
          باستخدام الأدوات المناسبة لتحقيق النجاح ، قم بزيادة إنتاجيتك إلى الحد الأقصى ، حدد بسهولة أولويات المهام وقم بتعيين التذكيرات
        </p>
        <nav className="d-flex gap-3">
          <HomeButton title="قائمة المهام" path="/tasks" iconClass="fa-solid fa-circle-check" />
          <HomeButton title="الملاحظات" path="/notes" iconClass="fa-solid fa-pen-clip" />
        </nav>
      </div>
    </FadeIn>
  );
}

function HomeButton({ title, path, iconClass }) {
  const navigate = useNavigate();
  return (
    <div
      tabIndex={1}
      onClick={() => navigate(path)}
      onKeyDown={(e) => e.key === "Enter" && navigate(path)}
      className="border-bottom flex-center flex-column text-dark gap-4 p-5 rounded opacity-hover cursor-pointer"
      style={{ background: "#eee" }}
    >
      <i className={iconClass + " fs-2"}></i>
      <span className="text-center">{title}</span>
    </div>
  );
}
