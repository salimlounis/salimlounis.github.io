// app/project/[id]/Project.tsx
import React from "react";
import { Project } from "../../src/types/Project";
import MarkdownRenderer from "./MarkdownRenderer";
import Image from "next/image";

interface ProjectContentProps {
  project: Project; // Expecting a 'project' prop of type 'Project'
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  const texte = project.content || "No content available";
  return (
    <div className="wrapper project">
      <div className="infoSection">
        <h1>{project.title}</h1>
        <div className="text">
          <MarkdownRenderer content={texte} />
          <div className="mb1"></div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Pour plus de détails
            </a>
          )}
        </div>
      </div>
      <div className="media">
        {project.video && (
          <div className="embed-container">
            <iframe src={`${project.video}`}></iframe>
          </div>
        )}
        {project.images &&
          project.images.map((image: string, index: number) => (
            <div key={index}>
              <Image
                src={`/img/${project.id}/${image}`}
                alt={`Project Image ${index}`}
                width={800}
                height={400}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectContent;
