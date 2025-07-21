const env = require('./env_config.json');

module.exports = {
  google_client_id: env.GOOGLE_CLIENT_ID,
  google_client_secret: env.GOOGLE_CLIENT_SECRET,
  google_callback_url: env.DEVELOPMENT_GOOGLE_CALLBACK_URL,
  session_cookie_key: env.SESSION_COOKIE_KEY,
  db: env.DEVELOPMENT_DB,
  website_link: env.DEVELOPMENT_WEBSITE_LINK
};
