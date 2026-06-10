import type { Metadata } from 'next';
import SuggestFeatureClient from './SuggestFeatureClient';

export const metadata: Metadata = {
  title: "Suggest a Feature | Shape the Future of Studiva",
  description: "Have ideas on how to improve Studiva? Suggest new features, vote on academic tools, and help us design the ultimate platform for free study notes.",
};

export default function SuggestFeaturePage() {
  return <SuggestFeatureClient />;
}
