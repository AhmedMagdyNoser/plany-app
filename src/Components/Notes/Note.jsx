export default function Note() {

  return (
    <>
      <div className="bg-white px-4 py-3 rounded shadow-sm position-relative">
        <h4>العنوان</h4>
        <p className="text-muted">نحن من نصنع الحياة بأفعالنا وأفكارنا وتصرفاتنا، لذلك علينا العمل على تحقيق أكبر قدر من السعادة والإنجازات والتأثير الإيجابي في العالم من حولنا.</p>
        <div className="text-muted d-flex justify-content-between align-items-center border-top pt-3">
          <span>June 24, 2023</span>
          <span className="d-flex gap-2">
            <i className="fa-solid fa-edit cursor-pointer option"></i>
            <i className="fa-solid fa-trash cursor-pointer option"></i>
          </span>
        </div>
      </div>
      <style>
        {`
          .option {
            opacity: 0.75;
            transition: 0.25s
          }
          .option:hover {
            opacity: 1
          }
        `}
      </style>
    </>
  )
}