/**
 * Normalize Firestore contest doc to contest2 card shape.
 */
function ensureStringArray(val) {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === 'string') return val ? [val] : [];
  return [];
}

export function normalizeContest(doc) {
  const d = doc || {};
  const tags = ensureStringArray(d.tags || d.tag_list || d.categories);
  if (!tags.length && d.tag) tags.push(d.tag);
  if (!tags.length) tags.push('DSA');

  return {
    id: d.id,
    challengeType: d.challengeType || d.challenge_type || d.type || 'DSA Challenge',
    title: d.title || d.name || 'Untitled Contest',
    tags,
    endsIn: d.endsIn || d.ends_in || d.countdown || d.duration || '6d 12:54:00',
    bookmarked: Boolean(d.bookmarked || d.favorite),
    tag: d.tag || d.category || tags[0] || 'DSA',
    description: d.description || d.desc || '',
  };
}
