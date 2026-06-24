import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Award, Target, Clock, Sparkles, ArrowRight, CheckCircle2, Star, Quote, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";

const HomePage = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const featuredEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-hero-gradient to-background">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 -right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Welcome to EventHub</span>
            </div>
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
              {user ? `Welcome back, ${user.name}!` : 'Discover Amazing Events'}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {user && user.role === 'admin' 
                ? 'Create and manage events for your community. Build engaging experiences that bring people together.'
                : 'Join workshops, seminars, and meetups that inspire growth and learning. Register easily and be part of something extraordinary.'
              }
            </p>
          </div>

          <div className="animate-scale-in flex flex-col sm:flex-row gap-4 justify-center">
            {user?.role === 'admin' ? (
              <>
                <Link to="/admin/create-event">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 event-gradient hover-shadow transition-all duration-300 hover:scale-105 animate-glow"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Create New Event
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="text-lg px-8 py-6 hover-shadow transition-all duration-300 hover:scale-105"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/events">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 event-gradient hover-shadow transition-all duration-300 hover:scale-105 animate-glow"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Explore Events
                </Button>
              </Link>
            )}
          </div>
          </div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section className="py-16 border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Events Hosted', value: '500+', icon: Calendar },
              { label: 'Happy Attendees', value: '12K+', icon: Users },
              { label: 'Cities Covered', value: '25+', icon: Globe },
              { label: 'Satisfaction', value: '98%', icon: Star },
            ].map((stat, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose EventHub?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover, host, and join amazing events
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {user?.role === 'admin' ? (
              <>
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Event Creation</h3>
                  <p className="text-muted-foreground">
                    Create engaging events with detailed descriptions and manage registrations
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
                  <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Manage Participants</h3>
                  <p className="text-muted-foreground">
                    Track registrations and manage attendee information efficiently
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">
                    Monitor event performance and registration statistics
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
                  <p className="text-muted-foreground">
                    Simple and quick registration process for all events
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
                  <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quality Events</h3>
                  <p className="text-muted-foreground">
                    Carefully curated workshops and seminars for learning
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 card-shadow hover-shadow transition-all duration-300 hover-scale">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Flexible Timing</h3>
                  <p className="text-muted-foreground">
                    Events scheduled at convenient times for all participants
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ============ FEATURED EVENTS SECTION ============ */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Events</h2>
              <p className="text-xl text-muted-foreground">Don't miss these upcoming highlights</p>
            </div>
            <Link to="/events">
              <Button variant="outline" className="hover-scale">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredEvents.map((event, i) => (
              <Link to="/events" key={event.id} className="group">
                <div className="rounded-2xl overflow-hidden bg-card card-shadow hover-shadow transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="h-52 overflow-hidden relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-semibold text-primary">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center"><MapPin className="h-3 w-3 mr-1" />{event.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS SECTION ============ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your free account as a student or admin in seconds.' },
              { step: '02', title: 'Browse Events', desc: 'Explore curated workshops and seminars in your area.' },
              { step: '03', title: 'Register & Attend', desc: 'Reserve your spot with one click and enjoy the experience.' },
            ].map((s, i) => (
              <div key={i} className="relative animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="bg-card rounded-2xl p-8 card-shadow hover-shadow transition-all duration-300 h-full">
                  <div className="text-6xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-4">
                    {s.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS SECTION ============ */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What People Say</h2>
            <p className="text-xl text-muted-foreground">Loved by students and organizers alike</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Ayesha Khan', role: 'Student', text: 'EventHub made it so easy to find and register for workshops. The interface is beautiful!' },
              { name: 'Hassan Ali', role: 'Workshop Host', text: 'Creating and managing events is effortless. Best platform I have used so far.' },
              { name: 'Fatima Arshad', role: 'Designer', text: 'I attended 3 amazing events this month. Highly recommend EventHub to everyone!' },
            ].map((t, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 card-shadow hover-shadow transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <Quote className="h-8 w-8 text-accent mb-4" />
                <p className="text-muted-foreground mb-4 italic">"{t.text}"</p>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-accent text-accent" />)}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl event-gradient p-12 md:p-16 text-center text-primary-foreground card-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of learners and creators. Sign up free today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user && (
                  <Link to="/signup">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover-scale">
                      Create Free Account <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                )}
                <Link to="/events">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover-scale">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">EventHub</span>
              </div>
              <p className="text-sm text-muted-foreground">Your gateway to amazing events and workshops.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/events" className="story-link">Events</Link></li>
                <li><Link to="/login" className="story-link">Login</Link></li>
                <li><Link to="/signup" className="story-link">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Organizers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Create Events</li>
                <li>Manage Registrations</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>hello@eventhub.com</li>
                <li>+92 300 1234567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 EventHub. Built with React, Tailwind CSS & Firebase.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;