import type { Metadata } from 'next';
import TeamClient from './TeamClient';

export const metadata: Metadata = {
  title: "Meet the Team | Builders of Free Study Notes & Resources",
  description: "Meet the passionate team of students and developers building Studiva—a free platform providing MAKAUT Notes, WBJEE Notes, and university study materials.",
};

export default function TeamPage() {
  return <TeamClient />;
}
