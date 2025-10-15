// Server component wrapper for student dashboard
import { withAuth } from "@workos-inc/authkit-nextjs";
import StudentDashboard from './client-page';
import { supabaseServer } from '@/middleware';

export default async function StudentDashboardPage() {
  // Fetch user data on the server side
  const { user } = await withAuth({ ensureSignedIn: true });

  // Get user role from database
  const { data: userProfile } = await supabaseServer.from('profiles').select('*').eq('workos_user_id', user.id).single();

  // Pass user data and role to client component
  return <StudentDashboard userData={user} role={userProfile?.role || null} />;
}
