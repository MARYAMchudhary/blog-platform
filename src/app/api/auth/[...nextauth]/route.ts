import { createClient } from "@supabase/supabase-js"
// import { SupabaseAdapter } from "@auth/supabase-adapter"
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

export const authOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                console.log("Authorize failed", credentials);

                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                const { data, error } = await supabase.auth.signInWithPassword(
                    {
                        email,
                        password
                    }
                )
                if (error || !data.user) {
                    console.log('Login failed:', error?.message);
                    return null
                }
                const user = data?.user
                return {
                    id: user.id,
                    email: user.email,
                };
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    session: { strategy: 'jwt' as const },
    secret: process.env.NEXTAUTH_SECRET,

    adapter: SupabaseAdapter({ url: process.env.NEXT_PUBLIC_SUPABASE_URL!, secret: process.env.NEXT_PUBLIC_SUPABASE_KEY! }),

}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }

