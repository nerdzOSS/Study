import { SideBar } from "@/components/Dashboard/sidebar";
import { DashboardComponent } from "@/components/Dashboard/Main";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const supabase = await createClient();
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
        redirect('/login');
    }

    return (
        <div className="dashboard-body">
            <SideBar user={user} />
            <DashboardComponent />
        </div>
    )
}