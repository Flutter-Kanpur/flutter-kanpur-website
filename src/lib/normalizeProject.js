/**
 * Shared project normalization for Firestore docs. Used by projects page and explore.
 */
export function formatProjectDate(value) {
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

export function normalizeProject(doc) {
  const d = doc || {};
  const tags = Array.isArray(d.tags) ? d.tags : (d.tags ? [d.tags] : (d.category ? [d.category] : ['Flutter']));
  const postedStr = formatProjectDate(d.postedOn || d.posted_on || d.createdAt || d.created_at);
  const sharedStr = formatProjectDate(d.sharedOn || d.shared_on || d.postedOn || d.posted_on || d.createdAt || d.created_at);
  return {
    id: d.id,
    title: d.title || d.name || 'Untitled Project',
    shortDescription: d.shortDescription || d.short_description || d.description || '',
    tags,
    author: d.author || d.authorName || d.creator || 'Unknown',
    postedOn: postedStr || sharedStr || '—',
    sharedOn: sharedStr || postedStr || '—',
    liked: Boolean(d.liked),
    github: d.github || d.githubUrl || d.github_link || '#',
    link: d.link || d.projectLink || d.project_link || '#',
    website: d.website || d.websiteUrl || d.demo_url || d.liveUrl || '#',
    about: d.about || d.aboutProject || d.description || '',
    features: d.features || d.featuresHighlights || d.about || d.description || '',
    screenshots: Array.isArray(d.screenshots) ? d.screenshots : (d.screenshots ? [d.screenshots] : []),
  };
}
