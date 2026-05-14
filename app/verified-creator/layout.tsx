import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Verified Creator",
  description: "Join the Studiva Partner Program. Earn 90% revenue share, get a verified badge, and reach thousands of students with your high-quality notes.",
};

export default function VerifiedCreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
