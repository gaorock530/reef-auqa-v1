
export default (key, type) => {
  const media = process.env.NODE_ENV === 'development'? 
  'https://localhost:8000/': 'https://media.mofaqua.com/';

  const server = process.env.NODE_ENV === 'development'? 
  'https://localhost:5000/': 'https://websocket.mofaqua.com/';

  const citylist = process.env.NODE_ENV === 'development'? 
  'https://localhost:5000/citylist': 'https://websocket.mofaqua.com/citylist';
  if (!key) return citylist;
  switch (type) {
    case 'i': // icon 
      return `${media}icon/${key}`;
    case 'c': // channnel
      return `${media}channel/${key}`;
    case 'd': // identity
      return;
    case 'v': // video cover
      return;
    // default to websocket server
    default:
      return `${server}icon/${key}`;
  }
}