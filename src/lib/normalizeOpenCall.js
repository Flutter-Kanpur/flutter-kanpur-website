/**
 * Normalize Firestore open call doc to list/detail shape.
 */
function formatDate(value) {
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

export function normalizeOpenCall(doc) {
  const d = doc || {};
  const status = (d.status || d.call_status || 'open').toLowerCase();
  const isClosesSoon = status === 'closes_soon' || status === 'closes soon';

  return {
    id: d.id,
    title: d.title || d.name || 'Untitled',
    description: d.description || d.desc || d.summary || '',
    subtitle: d.subtitle || d.eligibility || 'Students and professionals welcome.',
    applyBy: formatDate(d.applyBy || d.apply_by || d.deadline || d.application_deadline),
    status: isClosesSoon ? 'closes_soon' : 'open',
    bookmarked: Boolean(d.bookmarked),
    category: d.category || d.type || 'Volunteer',
    about: d.about || d.about_this_opportunity || '',
    whoCanApply: d.whoCanApply || d.who_can_apply || '',
    whatWeLookFor: d.whatWeLookFor || d.what_we_look_for || '',
    applicationDeadline: formatDate(d.applicationDeadline || d.application_deadline || d.applyBy || d.apply_by),
  };
}
