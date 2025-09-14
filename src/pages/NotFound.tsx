import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-hero-gradient to-background flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <Calendar className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <a href="/">
          <Button className="event-gradient hover-shadow transition-all duration-300 hover-scale">
            Return to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
