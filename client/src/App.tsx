import { Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import { useLocation } from "wouter";
import { useEffect } from "react";

// ✅ Import the login pages
import AdminLogin from "@/pages/AdminLogin";
import EmployeeLogin from "@/pages/EmployeeLogin";

function AppRoutes() {
  const [location] = useLocation();

  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/employee-login" component={EmployeeLogin} />
      {/* Fallback route */}
      {!["/", "/admin-login", "/employee-login"].includes(location) && <NotFound />}
    </>
  );
}

function App() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <ParticleBackground />
        <Toaster />
        <AppRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
