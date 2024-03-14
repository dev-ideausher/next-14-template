import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string | null;
      email: string | null;
      emailVerified: boolean;
      displayName: string | null;
      phoneNumber: string | null;
      photoURL: string | null;
      isAnonymous: boolean;
      accessToken: string;
      availableForBooking: boolean;
      restaurantId: string;
    };
  }
}
