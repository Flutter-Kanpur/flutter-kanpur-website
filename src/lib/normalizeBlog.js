/**
 * Shared blog normalization for Firestore docs. Used by blog2 and explore pages.
 */
export function formatPostedOn(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value?.toDate && typeof value.toDate === 'function') {
    const d = value.toDate();
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  if (value instanceof Date) {
    return value.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return '';
}

export function normalizeBlog(doc) {
  const d = doc || {};
  const likes = d.likes ?? d.likesCount ?? 0;
  const views = d.views ?? d.viewsCount ?? 0;
  return {
    id: d.id,
    title: d.title || d.name || 'Untitled',
    author: d.author || d.authorName || 'Unknown',
    readTime: d.readTime || d.read_time || '5 min read',
    likes: typeof likes === 'number' ? (likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : String(likes)) : String(likes),
    views: typeof views === 'number' ? (views >= 1000 ? `${(views / 1000).toFixed(1)}k` : String(views)) : String(views),
    postedOn: formatPostedOn(d.postedOn || d.posted_on || d.createdAt || d.created_at),
    imageType: d.imageType || d.image_type || 'dark',
    tag: d.tag || d.category || d.tag_name || 'Flutter',
    url: d.url || d.link || d.blogUrl || d.article_url || d.sourceUrl || d.articleUrl || d.pageUrl || '',
  };
}
