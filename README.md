# NextAuth Session Update Bug

This repository demonstrates a bug and its solution related to NextAuth sessions not correctly updating the user ID after login. This prevents protected routes from functioning as expected.

## Problem

The provided `ProtectedRoute` component uses `getSession` from `next-auth/react` to check for user authentication. However, due to a missing user ID in the session object, the protected route fails to render correctly after successful login.

## Solution

The solution involves modifying the `authOptions` in the `[...nextauth].js` file to include the user ID in the session object using the `callbacks.session` function.  This ensures that the `ProtectedRoute` component receives the necessary user information for successful authentication.

## Reproduction

1. Clone this repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Attempt to access a protected route; you will observe the authentication failure.