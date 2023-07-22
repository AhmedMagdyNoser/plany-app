import { FadeIn } from "../Utils/Fade";
import Contact from "../../Imgs/contact.svg";

export default function ContactUsSection() {
  return (
    <FadeIn milliSeconds="1500" className="py-5">
      <div className="container py-5">
        <h2 className="text-center mb-5">اتصل بنا</h2>
        <div className="row">
          <div className="col-md-6 px-5">
            <img src={Contact} alt="Contact Us" />
          </div>
          <div className="col-md-6 d-flex align-items-center p-5 border-end">
            <div>
              <p className="mb-5">
                هل لديك أي أسئلة أو تعليقات لنا؟ نحن نود الاستماع لك! يمكنك التواصل معنا عبر{" "}
                <a href="mailto: Ahmed_Magdy_1138@fci.helwan.edu.eg" className="text-decoration-none">
                  البريد الإلكتروني
                </a>
                . سنكون سعداء جدًا بالرد عليك وتلقي ملاحظاتك، نسعى دائمًا لتقديم أفضل خدمة ممكنة.
              </p>

              <div className="d-flex flex- align-items-stat gap-3 mt-4">
                <SocialLink link="mailto: Ahmed_Magdy_1138@fci.helwan.edu.eg" iconClass="fa-solid fa-envelope" />
                <SocialLink link="https://github.com/AhmedMagdyNoser" iconClass="fab fa-github" />
                <SocialLink link="https://linkedin.com/in/AhmedMagdyNoser" iconClass="fab fa-linkedin" />
                <SocialLink link="https://facebook.com/AhmedMagdyNoser" iconClass="fab fa-facebook" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function SocialLink({ link, iconClass }) {
  return (
    <a href={link} className="btn btn-outline-secondary border-0" target="_blank" rel="noreferrer">
      <i className={iconClass}></i>
    </a>
  );
}
