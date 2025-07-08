import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Organizations from "@/pages/organizations";
import Devices from "@/pages/devices";
import Sims from "@/pages/sims";
import Users from "@/pages/users";
import Analytics from "@/pages/analytics";
import Reports from "@/pages/reports";
import Settings from "@/pages/settings";
import MainLayout from "@/components/layout/main-layout";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/organizations" component={Organizations} />
        <Route path="/devices" component={Devices} />
        <Route path="/sims" component={Sims} />
        <Route path="/users" component={Users} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/reports" component={Reports} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
