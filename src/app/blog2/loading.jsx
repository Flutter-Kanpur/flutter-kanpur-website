import './blog2.css';

export default function Blog2Loading() {
  return (
    <div className="blog2-wrapper">
      <header className="blog2-appbar">
        <span className="blog2-back" style={{ width: 24 }} />
        <h1 className="blog2-title">Blogs & Articles</h1>
      </header>
      <div className="blog2-search-wrap" style={{ opacity: 0.85 }} />
      <div className="blog2-filters" style={{ minHeight: 44 }} />
      <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9375rem' }}>
        Loading...
      </div>
    </div>
  );
}
