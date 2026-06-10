import type { Metadata } from 'next';
import RevenueCalcClient from './RevenueCalcClient';

export const metadata: Metadata = {
  title: "Estimate Creator Earnings | Studiva Revenue Calculator",
  description: "Calculate how much you can earn sharing free study notes on Studiva. Predict your ad-revenue rewards from downloads, MAKAUT prep sheets, and WBJEE exam notes.",
};

export default function RevenueCalcPage() {
  return <RevenueCalcClient />;
}
