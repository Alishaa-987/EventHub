import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-hero-gradient to-background">
      <Navbar />
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-border/50 card-shadow animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 animate-bounce">
            <CheckCircle className="h-20 w-20 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Registration Successful!
          </CardTitle>
          <CardDescription className="text-lg">
            Thank you for registering. We're excited to see you at the event!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 animate-fade-in">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              What happens next?
            </p>
            <ul className="text-sm space-y-1">
              <li>📧 Confirmation email sent to your inbox</li>
              <li>📅 Event reminder 24 hours before</li>
              <li>📍 Location details included in email</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <Link to="/events" className="block">
              <Button variant="outline" className="w-full hover-scale">
                <Calendar className="h-4 w-4 mr-2" />
                View More Events
              </Button>
            </Link>
            
            <Link to="/" className="block">
              <Button className="w-full event-gradient hover-shadow transition-all duration-300">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default SuccessPage;