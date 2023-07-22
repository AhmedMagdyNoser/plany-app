import { FadeIn } from "../Components/Utils/Fade";
import error from '../Imgs/error.svg'

export default function PageNotFound() {
  return (
    <div className="container my-5 text-center">
      <FadeIn milliSeconds={500}>
        <img src={error} alt="No Results" style={{ opacity: "0.75", width: "300px", maxWidth: "65%" }} />
        <h4 className="lh-lg text-muted">عذرا الصفحة غير موجودة.</h4>
      </FadeIn>
    </div>
  );
}
