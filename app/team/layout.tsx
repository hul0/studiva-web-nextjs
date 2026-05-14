import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "Get to know the passionate students and builders behind Studiva. We are dedicated to revolutionizing how students share and earn from their educational content.",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
