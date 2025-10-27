interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

export default function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  return (
    <div className="error-banner">
      <span className="error-icon">⚠️</span>
      <span className="error-message">{message}</span>
      <button className="error-close" onClick={onClose}>×</button>
    </div>
  );
}
