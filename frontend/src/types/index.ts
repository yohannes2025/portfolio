/**
 * Shared application types.
 *
 * These describe the data used by the frontend. They do not imply that
 * every corresponding Django API endpoint has already been implemented.
 */

export interface Project {
  id: number | string;
  title: string;
  description: string;
  title_de?: string;
  title_en?: string;
  description_de?: string;
  description_en?: string;
  long_description_de?: string;
  long_description_en?: string;
  long_description?: string;
  image?: string | null;
  img?: string | null;
  technologies: string[];
  tags?: string[];
  github_url?: string;
  github_link?: string;
  live_url?: string;
  live_demo?: string;
  liveUrl?: string;
  featured?: boolean;
  date?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
  stars?: number;
}

export interface Experience {
  id: number | string;
  title: string;
  company: string;
  start_date: string;
  current: boolean;
  end_date: string | null;
  description: string;
}

export interface Education {
  id: number | string;
  degree: string;
  institution: string;
  start_year: string | number;
  end_year: string | number;
}

export interface Skill {
  id: number | string;
  name: string;
  category: string;
  proficiency: number;
}

export interface Testimonial {
  id: number | string;
  name: string;
  position: string;
  company?: string | null;
  image?: string | null;
  rating?: number;
  feedback: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
  language?: "en" | "de";
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  bio: string;
  profession: string;
  is_email_verified: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  password2?: string;
  password_confirm?: string;
}

export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string | null;
  bio?: string;
  profession?: string;
}
