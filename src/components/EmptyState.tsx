export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📊</div>
      <h2 className="empty-state-title">Нет данных за выбранный период</h2>
      <p className="empty-state-text">
        Попробуйте изменить фильтры или выбрать другой временной интервал
      </p>
    </div>
  );
}
