/**
 * Normalize Firestore event doc to event2 card shape.
 */
function formatDate(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value?.toDate && typeof value.toDate === 'function') {
    const d = value.toDate();
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  if (value instanceof Date) {
    return value.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  return '';
}

export function normalizeEvent(doc) {
  const d = doc || {};
  const dateStr = formatDate(d.date || d.eventDate || d.startDate || d.createdAt);
  const timeStr = d.time || d.eventTime || d.startTime || '';
  const locationStr = d.location || d.venue || d.place || '';
  const parts = [dateStr, timeStr, locationStr].filter(Boolean);
  const dateTimeLocation = parts.length ? parts.join(' • ') : 'Date TBA';

  const status = (d.status || d.eventStatus || 'upcoming').toLowerCase();
  const isLive = status === 'live';

  return {
    id: d.id,
    title: d.title || d.name || 'Untitled Event',
    dateTimeLocation,
    description: d.description || d.desc || d.summary || '',
    status: isLive ? 'live' : 'upcoming',
    tag: d.tag || d.category || d.tag_name || 'Flutter',
    bookmarked: Boolean(d.bookmarked),
  };
}
