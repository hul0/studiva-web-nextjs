import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Calculator",
  description: "Estimate how much you can earn on Studiva. Calculate your potential revenue from note sales and rewarded ads as a verified creator.",
};

export default function RevenueCalcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
