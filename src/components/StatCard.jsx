export default function StatCard({ title, value, hint, icon: Icon, tone = "violet" }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon tone-${tone}`}>
        <Icon size={14} aria-hidden="true" />
      </span>
      <p className="stat-label">{title}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-hint">{hint}</p>
    </article>
  );
}