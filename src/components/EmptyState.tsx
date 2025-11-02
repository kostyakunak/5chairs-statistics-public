export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📊</div>
      <h2 className="empty-state-title">No data for the selected period</h2>
      <p className="empty-state-text">
        Try changing the filters or selecting a different time interval
      </p>
    </div>
  );
}
