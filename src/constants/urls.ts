const isProd = process.env.NODE_ENV === 'production';

console.log(process.env.NODE_ENV);


export const CLIENT_ID = isProd
  ? 'dbf6e8904fe785430a96'
  : '140ee27ef8df8ece846a';
export const PROXY_URL = isProd
  ? 'https://x-check-app.herokuapp.com/authenticate/'
  : 'https://x-check-dev.herokuapp.com/authenticate';

export const JSON_API_URL = isProd
  ? 'https://xcheck-server.herokuapp.com:3001'
  : 'http://localhost:3001';
