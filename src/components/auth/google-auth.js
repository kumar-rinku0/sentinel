import axios from "axios";

const YOUR_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID;
const YOUR_CLIENT_SECRET = import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_SECRET;
const YOUR_REDIRECT_URL = import.meta.env.VITE_APP_GOOGLE_OAUTH_REDIRECT_URL;

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
].join(" ");

const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

const options = {
  redirect_uri: YOUR_REDIRECT_URL.toString(),
  client_id: YOUR_CLIENT_ID.toString(),
  response_type: "code",
  access_type: "offline",
  include_granted_scopes: true,
  scope: scopes,
};

const qs = new URLSearchParams(options);

export const authorizeUrl = `${rootUrl}?${qs.toString()}`;

export const getToken = async (code) => {
  const res = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      code,
      client_id: YOUR_CLIENT_ID.toString(),
      client_secret: YOUR_CLIENT_SECRET.toString(),
      redirect_uri: YOUR_REDIRECT_URL.toString(),
      grant_type: "authorization_code",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res.data;
};
