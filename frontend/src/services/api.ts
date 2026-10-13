// frontend/src/services/api.ts
import axios from "axios";
import i18n from "../i18n"; // Import your initialized i18n instance
import type {
  ContactSubmission,
  Education,
  Experience,
  Project,
  Skill,
  Testimonial,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically inject the active i18next language into every API request
api.interceptors.request.use(
  (config) => {
    const currentLanguage = i18n.language || "en";
    config.headers["Accept-Language"] = currentLanguage;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  },
);

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get<Project[] | { results: Project[] }>("/projects/");
    const data = response.data;

    // Handle both ordinary arrays and DRF paginated responses.
    if (Array.isArray(data)) {
      return data;
    }

    if ("results" in data && Array.isArray(data.results)) {
      return data.results;
    }

    return [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const fetchSkills = async (): Promise<Skill[]> => {
  try {
    const response = await api.get<Skill[]>("/skills/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await api.get<Testimonial[]>("/testimonials/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

export const fetchExperiences = async (): Promise<Experience[]> => {
  try {
    const response = await api.get<Experience[]>("/experiences/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};

export const fetchEducation = async (): Promise<Education[]> => {
  try {
    const response = await api.get<Education[]>("/education/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
};

export const fetchBlogPosts = async () => {
  try {
    const response = await api.get("/blog/");
    const data = response.data;
    if (data && typeof data === "object") {
      if (Array.isArray(data.results)) return data.results;
      if (Array.isArray(data)) return data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

export const submitContact = async (data: ContactSubmission) => {
  const response = await api.post("/contact/", data);
  return response.data;
};

export default api;
