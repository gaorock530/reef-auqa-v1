import api from 'ws-api/api';

export default new api(process.env.REACT_APP_URL, {
  attempt: 10,
  autoreconnect: true, 
  arraybuffer: true, 
  protocol: ['pulse']
});



