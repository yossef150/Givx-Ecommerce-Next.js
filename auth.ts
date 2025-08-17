import {prisma} from '@/lib/prisma'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import * as bcrypt from 'bcrypt-ts'
import type { NextAuthConfig} from 'next-auth'
import { NextResponse } from 'next/server'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role;

        // If user has no name, use email as their default name
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          // Update the user in the database with the new name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      // Handle session updates (e.g., name change)
      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name;
      }

      return token;
    },
    authorized({ request, /*auth*/}) {
  // Check for cart cookie
  if (!request.cookies.get('sessionCartId')) {
  	// Generate cart cookie
    const sessionCartId = crypto.randomUUID(); 

    // Clone the request headers
    const newRequestHeaders = new Headers(request.headers); 

    // Create a new response and add the new headers
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });

    // Set the newly generated sessionCartId in the response cookies
    response.cookies.set('sessionCartId', sessionCartId);

    // Return the response with the sessionCartId set
    return response;
  } else {
    return true;
  }
},
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async session ({ session, token, trigger }: any) {
  // Map the token data to the session object
  session.user.id = token.id;
  session.user.name = token.name; // 👈 Add this line
  session.user.role = token.role; // 👈 Add this line

  // Optionally handle session updates (like name change)
  if (trigger === 'update' && token.name) {
    session.user.name = token.name;
  }

  // Return the updated session object
  return session;
},
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut} = NextAuth(authOptions);
