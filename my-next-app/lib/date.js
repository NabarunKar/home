// Pure date formatting helper, kept separate from lib/posts.js so that the
// Markdown loader (which imports `fs`) never ends up in a client bundle.
export function formatDate(date) {
  const d = new Date(`${date}T00:00:00Z`);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
