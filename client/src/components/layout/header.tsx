import { Search, Bell, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

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

  return (
    <header className="bg-background shadow-sm border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-foreground">{currentPage}</h2>
          <nav className="text-sm flex items-center">
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
            <span className="text-foreground">{currentPage}</span>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-64 pl-10"
            />
          </div>
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
