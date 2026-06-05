import { redirect } from 'next/navigation';

export default function LegacyHostDashboard() {
  redirect('/dashboard');
}
