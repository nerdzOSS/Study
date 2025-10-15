
import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { supabaseServer } from '@/middleware';

export default async function Dashboard() {
    const { user } = await withAuth({ensureSignedIn:true});
    if (!user) {
        redirect('/login');
    }else{
        // Check if user has a role set in their metadata
        const { data: userProfile } = await supabaseServer.from('profiles').select('*').eq('workos_user_id', user.id).single();

        if (!userProfile || !userProfile.role) {
            // User doesn't have a role set, redirect to role selection
            redirect('/role-selection');
        }

        if(userProfile.role === 'teacher'){
            redirect('/dashboard/teachers-dashboard');
        }else{
            redirect('/dashboard/student-dashboard');
        }
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{user?.metadata?.['type']}</p>
        </div>
    );
}