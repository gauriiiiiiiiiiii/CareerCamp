const envConfig = {
  name: process.env.ENVIRONMENT || 'development',
  asset_path: process.env.ASSET_PATH,
  session_cookie_key: process.env.SESSION_COOKIE_KEY,
  db: process.env.DB,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,
  website_link: process.env.WEBSITE_LINK
};

module.exports = envConfig;
