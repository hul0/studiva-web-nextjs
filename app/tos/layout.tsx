import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using Studiva. Understand your rights and responsibilities as a user and creator on our platform.",
};

export default function TosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
