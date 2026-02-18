/**
 * Normalize a core team document from Firestore (flat list, one doc per person - same pattern as members).
 * Supports: photoURL (like members) and photo, profilePic, imageUrl, etc.
 */
export function normalizeCoreTeamMember(doc) {
  const d = doc || {};
  const photo = d.photo || d.photoURL || d.profilePic || d.imageUrl || d.avatar || d.avatarUrl || d.profileImage || d.image || '';
  return {
    id: d.id,
    name: d.name || d.displayName || 'Unknown',
    role: d.role || 'Member',
    section: d.section || d.sectionId || 'Core Team',
    joinDate: d.joinDate || d.join_date || 'March 2026',
    roleLong: d.roleLong || d.role_long || d.role,
    bio: d.bio || 'Part of the Flutter Kanpur community.',
    skills: Array.isArray(d.skills) ? d.skills : (d.skills ? [d.skills] : ['Flutter', 'Dart']),
    github: d.github || d.githubUrl || '#',
    website: d.website || d.websiteUrl || '#',
    linkedin: d.linkedin || d.linkedinUrl || '#',
    photo: typeof photo === 'string' ? photo : '',
  };
}

/**
 * Group normalized core team members into sections by section name.
 * Returns array of { id, title, expanded, members } for the core team page UI.
 */
export function groupCoreTeamBySection(members) {
  if (!Array.isArray(members) || members.length === 0) return [];
  const bySection = {};
  members.forEach((m) => {
    const key = (m.section || 'Core Team').toLowerCase().replace(/\s+/g, '-');
    if (!bySection[key]) bySection[key] = { id: key, title: m.section || 'Core Team', expanded: key === 'app-team', members: [] };
    bySection[key].members.push(m);
  });
  const order = ['organisors', 'app-team', 'web-team', 'design-team', 'core-team'];
  const ordered = order.filter((id) => bySection[id]).map((id) => bySection[id]);
  const rest = Object.keys(bySection).filter((id) => !order.includes(id)).map((id) => bySection[id]);
  return [...ordered, ...rest];
}
