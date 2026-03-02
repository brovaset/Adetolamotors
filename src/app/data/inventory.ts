// ─────────────────────────────────────────────────────────────────────────────
// Shared vehicle inventory — edit here to update BOTH the Vehicles section
// and the chatbot automatically.
// ─────────────────────────────────────────────────────────────────────────────
export interface Vehicle {
  name: string;
  years: string;
  image: string;
}

export const VEHICLES: Vehicle[] = [
  {
    name: 'Toyota RAV4',
    years: '2010–2016',
    image: 'https://images.unsplash.com/photo-1617600346256-af3cd5b16a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBSQVY0JTIwU1VWfGVufDF8fHx8MTc3MTYxMjM3MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Toyota Corolla',
    years: '2003–2010+',
    image: 'https://images.unsplash.com/photo-1763268265028-1631360c07dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBDb3JvbGxhJTIwc2VkYW58ZW58MXx8fHwxNzcxNTQ5Mzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Toyota Matrix',
    years: '2007–2025',
    image: 'https://images.unsplash.com/photo-1720545044233-d2ac77fa6030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjB3YWdvbiUyMGNvbXBsZXRlJTIwY2FyfGVufDF8fHx8MTc3MTYxOTU1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Pontiac',
    years: '2007–2025',
    image: 'https://images.unsplash.com/photo-1658479202733-6ee950b78dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb250aWFjJTIwY29tcGFjdCUyMFNVViUyMGZyb250JTIwdmlld3xlbnwxfHx8fDE3NzE2MjA5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Toyota Highlander',
    years: '2012–2016',
    image: 'https://images.unsplash.com/photo-1610855143470-0967a7348972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBIaWdobGFuZGVyJTIwU1VWfGVufDF8fHx8MTc3MTUyNjU1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Toyota Yaris Sedan',
    years: '2007, 2016',
    image: 'https://images.unsplash.com/photo-1749058983469-11eaef8d7bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBZYXJpcyUyMHNlZGFufGVufDF8fHx8MTc3MTYxODY5NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Mazda CX-5',
    years: '2013–2016',
    image: 'https://images.unsplash.com/photo-1557800524-af842580933c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXpkYSUyMENYNSUyMFNVVnxlbnwxfHx8fDE3NzE2MTg2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Lexus RX330',
    years: '2004–2005',
    image: 'https://images.unsplash.com/photo-1702757329625-79a1fce52614?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMZXh1cyUyMFJYJTIwZGVhbGVyc2hpcCUyMHN0b2NrJTIwcGhvdG98ZW58MXx8fHwxNzcxNjIwNzYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Lexus RX350',
    years: '2010–2016',
    image: 'https://images.unsplash.com/photo-1742941129482-843e7492aa0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMZXh1cyUyMFJYJTIwbHV4dXJ5JTIwdmVoaWNsZXxlbnwxfHx8fDE3NzE2MTkzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Lexus GX460',
    years: '2010–2016',
    image: 'https://images.unsplash.com/photo-1759355787078-9ce9fde2503a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMZXh1cyUyMEdYNDYwJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcxNjIwMDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];
