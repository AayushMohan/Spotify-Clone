import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providersAccountId,
          accessTokenExpires: account.expires_in * 1000, //We are handling expiry times in Milliseconds hence * 1000
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID");
        return token;
      }
      // Access token has expired, so we need to refresh it...
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING");
      return await refreshAccessToken(token);
    },
  },
});
