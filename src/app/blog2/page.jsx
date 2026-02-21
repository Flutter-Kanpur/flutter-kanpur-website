import { fetchBlogsData } from '@/services/fetch_data_from_firestore';
import { normalizeBlog } from '@/lib/normalizeBlog';
import Blog2Container from '@/components/blog2/Blog2Container';
import './blog2.css';

export default async function Blog2Page() {
  let blogs = [];
  let isEmpty = false;
  try {
    const raw = await fetchBlogsData('blogs');
    if (Array.isArray(raw) && raw.length > 0) {
      blogs = raw.map(normalizeBlog);
    } else {
      isEmpty = true;
    }
  } catch (e) {
    console.error('Blog2 fetch error:', e);
    isEmpty = true;
  }

  if (isEmpty) {
    // No blogs available — render the Blog2Container empty-state explicitly
    return <Blog2Container initialBlogs={[]} />;
  }

  return <Blog2Container initialBlogs={blogs} />;
}
