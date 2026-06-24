import React, { createContext, useContext, useState } from 'react';

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  image: string;
}

export interface Registration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  timestamp: string;
}

interface EventContextType {
  events: Event[];
  registrations: Registration[];
  addRegistration: (registration: Omit<Registration, 'id' | 'timestamp'>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Mock events data (replace with Firebase integration)
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Fundamentals Workshop',
    date: '2025-12-15',
    description: 'Learn React fundamentals in this comprehensive 3-hour session covering components, state, props, and modern React patterns.',
    location: 'Saylani Tech Center, FSD',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Techniques',
    date: '2025-12-20',
    description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, async programming, and ES6+ features.',
    location: 'Tech Hub, Karachi',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80'
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    date: '2025-12-25',
    description: 'Master the art of user interface and experience design with hands-on projects and real-world examples.',
    location: 'Design Studio, Lahore',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=800&q=80'
  },
  {
    id: '4',
    title: 'Full Stack Development Bootcamp',
    date: '2026-01-10',
    description: 'Complete bootcamp covering frontend, backend, and database technologies for modern web development.',
    location: 'Code Academy, Islamabad',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80'
  }
];

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const addRegistration = (registration: Omit<Registration, 'id' | 'timestamp'>) => {
    const newRegistration: Registration = {
      ...registration,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setRegistrations(prev => [...prev, newRegistration]);
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, event: Omit<Event, 'id'>) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...event, id } : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setRegistrations(prev => prev.filter(r => r.eventId !== id));
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  return (
    <EventContext.Provider value={{
      events,
      registrations,
      addRegistration,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventById
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};