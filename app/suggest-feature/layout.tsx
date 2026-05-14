import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suggest a Feature",
  description: "Help us build the future of Studiva. Share your ideas and suggestions for new features and improvements.",
};

export default function SuggestFeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
