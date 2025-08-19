export function parseM3U(m3u) {
  const lines = m3u.split('\n');
  const items = [];
  let current = null;
  for (let i = 0; i < lines.length; ++i) {
    let l = lines[i].trim();
    if (l.startsWith('#EXTINF:')) {
      let group = null;
      let match = l.match(/group-title="([^"]*)"/i);
      if (!match) match = l.match(/group-title='([^']*)'/i);
      if (!match) match = l.match(/group-title=([^ ,]*)/i);
      if (match) group = match[1];
      const meta = l.match(/tvg-name="([^"]*)"/i) || l.match(/tvg-name='([^"]*)'/i);
      const logo = l.match(/tvg-logo="([^"]*)"/i) || l.match(/tvg-logo='([^"]*)'/i);
      const name = l.split(',').pop().trim();
      current = {
        name: meta ? meta[1] : name,
        logo: logo ? logo[1] : '',
        group: group || ''
      };
    } else if (l && !l.startsWith('#') && current) {
      current.url = l;
      items.push({...current});
      current = null;
    }
  }
  return items;
}