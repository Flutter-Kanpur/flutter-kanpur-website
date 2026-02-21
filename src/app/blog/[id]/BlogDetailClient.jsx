'use client';

import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BlogDetailClient() {
  return (
    <>
      <button type="button" className="blog-detail-see-all" aria-label="See all responses">
        <ExpandMoreIcon sx={{ fontSize: 20 }} />
        See all responses
      </button>

      <div className="blog-detail-write-card">
        <h3>Want to write for us?</h3>
        <p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.</p>
        <Link href="/blog2" className="blog-detail-start-writing">
          Start writing
        </Link>
      </div>
    </>
  );
}
