export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  long_description?: string;
  image: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  featured: boolean;
  date_created: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
