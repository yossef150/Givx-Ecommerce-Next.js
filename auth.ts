import {prisma} from '@/lib/prisma'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import * as bcrypt from 'bcrypt-ts'
import type { NextAuthConfig} from 'next-auth'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {type: 'email' },
        password: {type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing credentials');
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string}
        })

        if (!user || !user.password) throw new Error('No user found')

        const isValid = await bcrypt.compare(credentials.password as string, user.password)
        if (!isValid) throw new Error('Invalid password')

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
      }
    })
  ],
  callbacks: {
    // async jwt({ token, user }) {
    //   if (user) {
    //     // token.sub = user.id
    //     token.role = user.role // If you need the role in the token
    //     }
    //     if(user.name === 'NO_NAME')
    //     {
    //       if (user.email) {
    //         token.name = user.email.split('@')[0];
    //       }
    //       await prisma.user.update({
    //         where: {
    //           id: user.id ?? undefined
    //         },
    //         data: { name: token.name?? undefined }
    //       })
    //     }
    //   return token
    // },
    
    async session ({session, user, trigger, token})
    {
        if (session.user) {
            session.user.id = token.sub ?? '';
            // session.user.role = token.role?? '';
            session.user.name = token.name
        }

        if(trigger === 'update' && session.user)
            session.user.name = user.name;
        return session;
    }
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut} = NextAuth(authOptions);
