// src/types/Project.ts
export interface Project {
  id: string;
  title: string;
  year: number;
  cover: string;
  type: string;
  priority?: number;
  agence?: string;
  images?: string[];
  video?: string;
  link?: string;
  content?: string;
}

export interface Work {
  id: string;
  title: string;
  year: number;
  cover: string;
  type: string;
  priority?: number;
  agence?: string;
  images?: string[];
  video?: string;
  link?: string;
  content?: string;
}
