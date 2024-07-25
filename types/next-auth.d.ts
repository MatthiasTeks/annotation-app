/* eslint-disable no-unused-vars */
import NextAuth, { DefaultSession, DefaultJWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: DefaultSession['user'] & {
      id: string;
    };
  }

  interface JWT {
    accessToken?: string;
  }
}
