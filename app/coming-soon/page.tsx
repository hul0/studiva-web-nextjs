import type { Metadata } from 'next';
import ComingSoonClient from './ComingSoonClient';

export const metadata: Metadata = {
  title: "Coming Soon | Free Educational Sharing Hub",
  description: "Studiva's upcoming social sharing platform for study materials. Stay tuned to access free MAKAUT Notes, WBJEE Notes, and earn rewards for sharing.",
};

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
