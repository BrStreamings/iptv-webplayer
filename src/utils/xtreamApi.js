export async function fetchXtreamChannels({host, username, password}) {
  const url = `${host}/player_api.php?username=${username}&password=${password}&action=get_live_streams`;
  const res = await fetch(url);
  const arr = await res.json();
  return arr.map(ch => ({
    name: ch.name,
    url: `${host}/live/${username}/${password}/${ch.stream_id}.m3u8`,
    group: ch.category_name,
    logo: ch.stream_icon
  }));
}