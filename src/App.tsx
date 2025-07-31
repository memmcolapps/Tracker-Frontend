import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Organizations from "@/pages/organizations";
import Devices from "@/pages/devices";
import Sims from "@/pages/sims";
import Users from "@/pages/users";
import Analytics from "@/pages/analytics";
import Reports from "@/pages/reports";
import Login from "@/pages/login";
import MainLayout from "@/components/layout/main-layout";
import Locations from "./pages/Locations";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route>
        <ProtectedRoute>
          <MainLayout>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/organizations" component={Organizations} />
              <Route path="/devices" component={Devices} />
              <Route path="/locations" component={Locations} />
              <Route path="/sims" component={Sims} />
              <Route path="/users" component={Users} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/reports" component={Reports} />
              <Route component={NotFound} />
            </Switch>
          </MainLayout>
        </ProtectedRoute>
      </Route>
    </Switch>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
