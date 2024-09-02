// src/types/Project.ts
export interface Project {
  id: string;
  title: string;
  year: number;
  type: string;
  priority?: number;
  cover: string;
  images?: string[];
  video?: string;
  link?: string;
  content?: string;
}
