export default function ExamCard({ title, desc, children, className = "", ...props }) {
  return (
    <article className={`border border-gray-200
                rounded-xl p-4 bg-white ${className}`}
                {...props}>
      <h3 className="mb-1.5 text-lg font-bold">{title}</h3>
      {desc && <p className="mb-3 font-bold text-gray-600 text-sm leading-snug">{desc}</p>}
      <div className={ `min-h-20 ${className}`}>{children}</div>
    </article>
  );
}