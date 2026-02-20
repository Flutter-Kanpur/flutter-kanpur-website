/**
 * Normalize job doc from Firestore for list and detail views.
 */
export function normalizeJob(doc) {
  const d = doc || {};
  const tags = Array.isArray(d.tags) ? d.tags : (d.tags ? [d.tags] : []);
  const skills = Array.isArray(d.requiredSkills) ? d.requiredSkills : (d.skills ? (Array.isArray(d.skills) ? d.skills : [d.skills]) : (d.required_skills ? (Array.isArray(d.required_skills) ? d.required_skills : [d.required_skills]) : []));
  return {
    id: d.id,
    title: d.title || d.jobTitle || d.name || 'Untitled Job',
    description: d.description || d.shortDescription || d.short_description || '',
    company: d.company || d.companyName || d.organization || 'Company',
    location: d.location || d.city || d.place || '',
    tags: tags.length ? tags : ['Full-time'],
    saved: Boolean(d.saved),
    skillTag: d.skillTag || d.skill_tag || d.category || (skills[0] || ''),
    requiredSkills: skills,
    aboutRole: d.aboutRole || d.about_role || d.aboutTheRole || d.description || '',
    whatYouDo: d.whatYouDo || d.what_you_do || d.responsibilities || d.aboutRole || d.description || '',
    jobType: d.jobType || d.job_type || (tags[0] || 'Full-time'),
    duration: d.duration || '',
    startDate: d.startDate || d.start_date || '',
    experienceLevel: d.experienceLevel || d.experience_level || '',
    applyUrl: d.applyUrl || d.apply_url || d.applyLink || d.link || '#',
  };
}
