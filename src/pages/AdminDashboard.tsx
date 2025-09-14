import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Users, BarChart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";

const AdminDashboard = () => {
  const { events, registrations } = useEvents();
  const { user } = useAuth();

  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-hero-gradient to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome back, {user?.name}! Here's your event management overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-scale-in">
          <Card className="bg-card/70 backdrop-blur-sm border-border/50 card-shadow hover-shadow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                {upcomingEvents} upcoming events
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/70 backdrop-blur-sm border-border/50 card-shadow hover-shadow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">
                Across all events
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/70 backdrop-blur-sm border-border/50 card-shadow hover-shadow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Registration</CardTitle>
              <BarChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalEvents > 0 ? Math.round(totalRegistrations / totalEvents) : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Per event
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Event Section */}
          <Card className="bg-card/70 backdrop-blur-sm border-border/50 card-shadow animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Manage your events and view analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/admin/create-event" className="block">
                <Button className="w-full event-gradient hover-shadow transition-all duration-300 justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
              </Link>
              <Link to="/events" className="block">
                <Button variant="outline" className="w-full hover-scale justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Events
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Events */}
          <Card className="bg-card/70 backdrop-blur-sm border-border/50 card-shadow animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Recent Events
              </CardTitle>
              <CardDescription>
                Your latest created events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-3">
                  {events.slice(0, 3).map((event) => {
                    const eventRegistrations = registrations.filter(r => r.eventId === event.id).length;
                    return (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{eventRegistrations}</p>
                          <p className="text-xs text-muted-foreground">registrations</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No events created yet</p>
                  <Link to="/admin/create-event">
                    <Button variant="outline" className="mt-2 hover-scale">
                      Create your first event
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Registrations Overview */}
        {registrations.length > 0 && (
          <Card className="mt-8 bg-card/70 backdrop-blur-sm border-border/50 card-shadow animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Registrations
              </CardTitle>
              <CardDescription>
                Latest registrations from students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {registrations.slice(0, 5).map((registration) => {
                  const event = events.find(e => e.id === registration.eventId);
                  return (
                    <div key={registration.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{registration.name}</p>
                        <p className="text-xs text-muted-foreground">{registration.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(registration.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;