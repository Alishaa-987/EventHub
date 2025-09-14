import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-hero-gradient to-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Event Registration System
            </h1>
          </div>
          <Link to="/events">
            <Button variant="outline" className="hover-scale">
              View Events
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
              Discover Amazing Events
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join workshops, seminars, and meetups that inspire growth and learning. 
              Register easily and be part of something extraordinary.
            </p>
          </div>

          <div className="animate-scale-in">
            <Link to="/events">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 event-gradient hover-shadow transition-all duration-300 hover:scale-105 animate-glow"
              >
                <Users className="mr-2 h-5 w-5" />
                Explore Events
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 animate-fade-in">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
              <p className="text-muted-foreground">
                Simple and quick registration process for all events
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Events</h3>
              <p className="text-muted-foreground">
                Carefully curated workshops and seminars for learning
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Convenient Locations</h3>
              <p className="text-muted-foreground">
                Events hosted at accessible and modern venues
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 Event Registration System. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default HomePage;