import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { setCookie } from 'nookies'

const options = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            authorize: async (credentials) => {
                const res = await fetch("http://localhost:8000/api/user/token/", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await res.json()
                if (res.ok && data) {
                    console.log(data.token)
                    const user = { accessToken: data.token }
                    console.log(user)
                    return user
                } else {
                    throw new Error('Invalid username/password')
                }
            }
        }
        )
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/login'
    },
    callbacks: {
        jwt: async (token, user) => {
            console.log(user)
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        session: async (session, token) => {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    // Other NextAuth.js options...
}

// const options = {
//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 username: { label: "Username", type: "text" },
//                 password: { label: "Password", type: "password" }
//             },
//             authorize: async (credentials) => {
//                 const res = await fetch("http://localhost:8000/api/user/token/", {
//                     method: 'POST',
//                     body: JSON.stringify(credentials),
//                     headers: { 'Content-Type': 'application/json' }
//                 })
//                 const data = await res.json()
//                 if (res.ok && data) {
//                     return { token: data.token }
//                 } else {
//                     throw new Error('Invalid username/password')
//                 }
//             }
//         })
//     ],
//     pages: {
//         signIn: '/auth/login',
//         error: '/auth/login'
//     },
//     callbacks: {
//         jwt: async (token, user) => {
//             if (user) {
//                 token.accessToken = user.token;
//             }
//             return token;
//         },
//         session: async (session, token) => {
//             session.accessToken = token.accessToken;
//             return session;
//         },
//     },
//     // Other NextAuth.js options...
// }
const handler = NextAuth(options)

export { handler as GET, handler as POST }

