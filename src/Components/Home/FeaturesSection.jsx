import { useEffect, useRef } from "react";
import { checkIfOnScreen } from "../../utils";

const TRANSITION = "1s";

export default function FeaturesSection() {
  let sectionRef = useRef();

  function animateSection() {
    if (checkIfOnScreen(sectionRef.current)) {
      sectionRef.current.style.transform = "translateY(0)";
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", animateSection);
    return () => {
      document.removeEventListener("scroll", animateSection);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={sectionRef} className="bg-light py-5" style={{ transform: "translateY(100px)", transition: TRANSITION }}>
      <div className="container py-5">
        <h2 className="text-center mb-5">لماذا نحن؟</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, auto))", gap: "25px" }}>
          <Feature
            iconClass="fa-solid fa-wand-magic-sparkles"
            title="سهولة الاستخدام"
            description="تصميم واجهة المستخدم البسيط والمريح يجعل التنقل في التطبيق امراً سهلًا ويساعدك على التركيز على ما يهم حقًا."
          />
          <Feature
            iconClass="fa-solid fa-lock"
            title="الامان"
            description="نقوم بتخزين جميع بياناتك بشكل آمن في تخزين المتصفح المحلي، حتى تتمكن من الاستمرار في إدارة مهامك بثقة وأمان."
          />
          <Feature
            iconClass="fa-solid fa-bolt-lightning"
            title="السرعة والموثوقية"
            description="صمم التطبيق ليكون سريعًا وموثوقًا، بحيث يمكنك الوصول إلى مهامك وملاحظاتك في أي وقت تحتاج إليها."
          />
        </div>
      </div>
    </div>
  );
}

function Feature({ iconClass, title, description }) {
  let iconRef = useRef();

  function animateOnScroll() {
    if (checkIfOnScreen(iconRef.current)) {
      iconRef.current.style.scale = "1";
      iconRef.current.firstElementChild.style.transform = "rotate(0)";
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", animateOnScroll);
    return () => {
      document.removeEventListener("scroll", animateOnScroll);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="d-flex flex-column border rounded-4 p-4">
      <div
        ref={iconRef}
        className="flex-center rounded-3"
        style={{ position: "relative", scale: "0", transition: TRANSITION, background: "#eee", width: "85px", height: "85px" }}
      >
        <i className={iconClass + " fs-3"} style={{ transition: TRANSITION, transform: "rotate(180deg)" }}></i>
      </div>
      <div>
        <h4 className="my-3">{title}</h4>
        <span className="text-muted">{description}</span>
      </div>
    </div>
  );
}
