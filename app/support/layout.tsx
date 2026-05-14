import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Help Center",
  description: "Need help with Studiva? Find answers to frequently asked questions or contact our support team for assistance.",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
