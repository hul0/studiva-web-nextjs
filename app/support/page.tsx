import type { Metadata } from 'next';
import SupportClient from './SupportClient';

export const metadata: Metadata = {
  title: "Help & Support | Studiva Support Desk",
  description: "Get in touch with Studiva support for queries about account management, free note uploads, MAKAUT study materials, WBJEE notes, or reward payouts.",
};

export default function SupportPage() {
  return <SupportClient />;
}
