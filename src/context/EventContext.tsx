import React, { createContext, useContext, useState } from 'react';

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  image?: string;
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
  getEventById: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Mock events data (replace with Firebase integration)
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Fundamentals Workshop',
    date: '2024-12-15',
    description: 'Learn React fundamentals in this comprehensive 3-hour session covering components, state, props, and modern React patterns.',
    location: 'Saylani Tech Center, FSD',
    image: '/api/placeholder/400/250'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Techniques',
    date: '2024-12-20',
    description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, async programming, and ES6+ features.',
    location: 'Tech Hub, Karachi',
    image: '/api/placeholder/400/250'
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    date: '2024-12-25',
    description: 'Master the art of user interface and experience design with hands-on projects and real-world examples.',
    location: 'Design Studio, Lahore',
    image: '/api/placeholder/400/250'
  },
  {
    id: '4',
    title: 'Full Stack Development Bootcamp',
    date: '2025-01-10',
    description: 'Complete bootcamp covering frontend, backend, and database technologies for modern web development.',
    location: 'Code Academy, Islamabad',
    image: '/api/placeholder/400/250'
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

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  return (
    <EventContext.Provider value={{
      events,
      registrations,
      addRegistration,
      addEvent,
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