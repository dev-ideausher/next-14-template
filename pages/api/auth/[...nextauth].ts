import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { extractClientDetails } from '../../../src/app/_utils';

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || '',
          (credentials as any).password || ''
        )
          .then(async (userCredential) => ({
            ...extractClientDetails(userCredential),
            accessToken: await userCredential.user.getIdToken(),
            //@ts-ignore
            ...JSON.parse(credentials.data),
          }))
          .catch((error) => {
            console.log(error);
            return null;
          })
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user: any;
      trigger?: any;
      session?: any;
    }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      if (!user) {
        return token;
      }
      return { ...token, ...user };
    },
    // @ts-ignore
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
export default NextAuth(authOptions);
