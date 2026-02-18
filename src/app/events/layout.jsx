import './events.css';

export default function RootLayout({ children }) {
  return (
    <div className="events-layout-wrapper">
      {children}
    </div>
  );
}