// src/utils/loadProjects.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const fileDirectory = path.join(process.cwd(), "src/data");

export function loadProjects(directory: string) {
  const fileType = path.join(fileDirectory, directory);
  const filenames = fs.readdirSync(fileType);
  const projects = filenames.map((filename) => {
    const filePath = path.join(fileType, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      id: filename.replace(/\.md$/, ""),
      title: data.title,
      year: data.year,
      agence: data.agence || "personnal project",
      priority: data.priority,
      cover: data.cover,
      images: data.images,
      video: data.video,
      link: data.link,
      type: directory,
      content: content,
    };
  });
  return projects;
}

// Function to load a single project by ID
export function loadProjectById(directory: string, id: string) {
  const projectsPath = path.join(fileDirectory, directory);
  const filePath = path.join(projectsPath, `${id}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id,
    title: data.title,
    year: data.year,
    priority: data.priority,
    cover: data.cover,
    images: data.images,
    video: data.video,
    link: data.link,
    type: "project",
    content: content,
  };
}
