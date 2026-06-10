import type { Metadata } from 'next';
import VerifiedCreatorClient from './VerifiedCreatorClient';

export const metadata: Metadata = {
  title: "Become a Verified Creator | Share Free Notes & Earn Rewards",
  description: "Join Studiva's Partner Program as a Verified Creator. Share your MAKAUT notes, WBJEE study resources, and lecture notes for free. Earn ad-revenue share and grow your student audience.",
};

export default function VerifiedCreatorPage() {
  return <VerifiedCreatorClient />;
}
