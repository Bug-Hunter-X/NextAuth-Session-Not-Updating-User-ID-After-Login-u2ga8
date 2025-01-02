```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub; // Add user ID to session
      return session;
    }
  }
};
export default NextAuth(authOptions);
```

```javascript
// components/ProtectedRoute.js
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  const checkAuth = async () => {
    const session = await getSession();
    if (!session) {
      router.push('/login');
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  if (!session) {
    return <div>Loading...</div>; // Prevent showing the children
  }

  return <>{children}</>;
};
export default ProtectedRoute;
```