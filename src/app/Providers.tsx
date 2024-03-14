"use client";
import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return <Provider>{children}</Provider>;
}
