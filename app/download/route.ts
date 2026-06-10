import { redirect } from 'next/navigation';

export async function GET() {
  redirect('https://play.google.com/store/apps/details?id=com.studiva.app');
}
