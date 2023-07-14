import { useNavigate } from "react-router-dom";
import { FadeIn } from "../Components/Utils/Fade";
import img from "../Imgs/cover.jpg";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="position-relative overflow-hidden full-height">
      <FadeIn time="5s">
        <div className="background-image"></div>
      </FadeIn>
      <FadeIn time="0.5s">
        <div className="container flex-center flex-column gap-4 py-5" style={{ position: "relative", zIndex: "3" }}>
          <h1 className="text-center text-dark py-2">اجعل حياتك أكثر تنظيما وفعالية</h1>
          <p className="text-center text-muted" style={{ width: "500px", maxWidth: "100%" }}>
            باستخدام الأدوات المناسبة لتحقيق النجاح ، قم بزيادة إنتاجيتك إلى الحد الأقصى ، حدد بسهولة أولويات المهام وقم بتعيين التذكيرات
          </p>
          <nav className="d-flex gap-3">
            <div
              onClick={() => navigate("/tasks")}
              className="border-bottom flex-center flex-column text-secondary gap-3 p-4 rounded gray-hover cursor-pointer"
            >
              <i className="fa-solid fa-circle-check fs-2"></i>
              <span>قائمة المهام</span>
            </div>
            <div
              onClick={() => navigate("/notes")}
              className="border-bottom flex-center flex-column text-secondary gap-3 p-4 rounded gray-hover cursor-pointer"
            >
              <i className="fa-solid fa-pen-clip fs-2"></i>
              <span>الملاحظات</span>
            </div>
          </nav>
        </div>
      </FadeIn>
      <style>
        {`
          .full-height {
            height: calc(101vh - 82px);
          }
          .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url(${img});
            background-size: cover;
            background-position: center;
            filter: blur(5px);
            animation: zoom 25s infinite;
            opacity: 0.15;
          }
        `}
      </style>
    </div>
  );
}
