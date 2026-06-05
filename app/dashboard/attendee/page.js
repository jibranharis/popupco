import { redirect } from 'next/navigation';

export default function LegacyAttendeeDashboard() {
  redirect('/dashboard/saved');
}
