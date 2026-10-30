// frontend/src/services/api.ts
import axios from "axios";
import i18n from "../i18n"; // Import your initialized i18n instance
import type { ContactSubmission, Project, Skill, Experience, Education, Testimonial } from "../types";

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
  const response = await api.get<Project[] | { results: Project[] }>(
    "/projects/",
  );
  const data = response.data;

  // Handle both ordinary arrays and DRF paginated responses.
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    typeof data === "object" &&
    "results" in data &&
    Array.isArray(data.results)
  ) {
    return data.results;
  }

  return [];
};

export const fetchSkills = async (): Promise<Skill[]> => {
  const response = await api.get<Skill[]>("/skills/");
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await api.get<Testimonial[]>("/testimonials/");
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchExperiences = async (): Promise<Experience[]> => {
  const response = await api.get<Experience[]>("/experiences/");
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchEducation = async (): Promise<Education[]> => {
  const response = await api.get<Education[]>("/education/");
  return Array.isArray(response.data) ? response.data : [];
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
