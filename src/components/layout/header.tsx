import { LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/organizations": "Organizations",
  "/devices": "Devices",
  "/sims": "SIMs",
  "/users": "Users",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function Header() {
  const [location] = useLocation();
  const currentPage = pageNames[location] || "Dashboard";
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log("User logged out!");
  };

  return (
    <header className="bg-background shadow-sm border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-foreground">
            {currentPage}
          </h2>
          <nav className="text-sm flex items-center">
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
            <span className="text-foreground">{currentPage}</span>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
