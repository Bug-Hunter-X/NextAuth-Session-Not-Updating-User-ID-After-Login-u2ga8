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
import { useEffect } from 'react'; // Import useEffect

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = React.useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      setSession(session);
      if (!session) {
        router.push('/login');
      }
    };
    checkAuth();
  }, []);

  if (session === null) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Return null if not authenticated
  }

  return <>{children}</>;
};
export default ProtectedRoute;
```