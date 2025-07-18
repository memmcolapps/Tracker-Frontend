import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Building,
  Smartphone,
  Users,
  BarChart3,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Organizations", href: "/organizations", icon: Building },
  { name: "Devices", href: "/devices", icon: Smartphone },
  { name: "Admins", href: "/users", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { admin } = useAuth();

  return (
    <div className="w-64 bg-sidebar-background shadow-lg flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          Admin Platform
        </h1>
        <p className="text-sm text-sidebar-foreground/70">Device Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <a className={`nav-item ${isActive ? "active" : ""}`}>
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">
              {admin?.email}
            </p>
            <p className="text-xs text-sidebar-foreground/70">
              {admin?.adminType.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
