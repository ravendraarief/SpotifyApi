import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi ,{ LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token) {
    try{
spotifyApi.setAccessToken(token.accessToken);
spotifyApi.refreshAccessToken(token.refreshToken);

const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
console.log("RefreshedToken", refreshedToken);
return {
    ...token,
    accessToken:refreshedToken.access_token,
    accessTokenExpires: Date.now + refreshedToken.expires_in *1000,
    refreshToken:refreshedToken.refresh_token ?? token.refreshToken

}
    }
    catch(error){
console.log(error)
 return{
    ...token,
    error:'RefreshAccessTokenError'
 }   }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        authorization:LOGIN_URL
      })
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
  pages:{
    signIn:'/login'
  },
  callbacks:{
    async jwt({token,account,user}) {
        // initial
        if(token && user){
            return{
                ...token,
                accessToken:account.access_token,
                refreshToken:account.refresh_token,
                username:account.providerAccountId,
                accessTokenExpires:account.expires_at * 1000,

            }
        }
        // Return Previous Token
        if(Date.now()< token.accessTokenExpires) {
            console.log("Existing Access Token is Valid")
            return token;
        }
// Access Token Expired
        console.log('Expired');
        return await refreshAccessToken(token)
    },
    async session({session,token}){
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;
        return session;
    }
  }
})