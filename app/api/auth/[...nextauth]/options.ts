import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

// This would typically come from a database
const users = [
  { id: "1", name: "J Smith", email: "test123@gmail.com", password: "password123", role: "user" },
  { id: "2", name: "Admin User", email: "admin@gmail.com", password: "adminpass", role: "admin" },
];

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = users.find(user => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        } else {
          throw new Error("Invalid email or password");
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};


// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "next-auth";
// import mongoose from 'mongoose';

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI as string, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// } as mongoose.ConnectOptions);

// // Define User Schema
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: String,
//   // Add other fields as needed
// });

// // Create User Model
// const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

// export const options: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials): Promise<User | null> {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }
        
//         // Find user in MongoDB
//         const user = await UserModel.findOne({ email: credentials.email });
        
//         if (user && user.password === credentials.password) {
//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//             role: user.role
//           };
//         } else {
//           throw new Error("Invalid email or password");
//         }
//       }
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider === "google" || account?.provider === "github") {
//         // Save or update user in MongoDB for OAuth providers
//         const existingUser = await UserModel.findOne({ email: user.email });
//         if (!existingUser) {
//           const newUser = new UserModel({
//             name: user.name,
//             email: user.email,
//             role: "user", // Default role for OAuth users
//           });
//           await newUser.save();
//         }
//       }
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         (session.user as any).role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/error',
//   },
// };
