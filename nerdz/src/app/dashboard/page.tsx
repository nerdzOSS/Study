import { SideBar } from "@/components/Dashboard/sidebar";
import { DashboardComponent } from "@/components/Dashboard/Main";

export default function Dashboard() {
    return (
        <div className="dashboard-body">
            <SideBar />
            <DashboardComponent />
        </div>
    )
}