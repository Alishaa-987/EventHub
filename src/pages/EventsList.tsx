import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const EventsList = () => {
  const { events } = useEvents();
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-hero-gradient to-background">
      <Navbar />

      {/* Events Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Choose Your Event</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover workshops and seminars designed to enhance your skills and knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-scale-in">
          {events.map((event, index) => (
            <Card 
              key={event.id} 
              className="bg-card/70 backdrop-blur-sm border-border/50 card-shadow hover-shadow transition-all duration-300 hover-scale overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Calendar className="h-16 w-16 text-primary/60" />
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                <CardDescription className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(event.date)}
                </CardDescription>
                <CardDescription className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {event.description}
                </p>
              </CardContent>
              
              <CardFooter>
                {user?.role === 'student' || !user ? (
                  <Link to={user ? `/register/${event.id}` : '/login'} className="w-full">
                    <Button className="w-full event-gradient hover-shadow transition-all duration-300">
                      <Users className="h-4 w-4 mr-2" />
                      {user ? 'Register Now' : 'Login to Register'}
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    <Calendar className="h-4 w-4 mr-2" />
                    Admin View
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No Events Available</h3>
            <p className="text-muted-foreground">
              Check back soon for exciting upcoming events!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default EventsList;