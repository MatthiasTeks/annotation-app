import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Adapter } from 'next-auth/adapters';
import { PrismaClient } from '@prisma/client';
import Google from 'next-auth/providers/google';
import NextAuth from 'next-auth';

const prisma = new PrismaClient();

export const config = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
