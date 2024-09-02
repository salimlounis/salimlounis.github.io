// src/components/Projects.tsx
"use client";
import Link from "next/link";
import { Project } from "../src/types/Project";
import { Work } from "../src/types/Work";
import Image from "next/image";
import Masonry from "react-masonry-css";

interface ProjectsProps {
  projectslist: Project[];
  workslist: Work[];
}

export default function Projects({ projectslist, workslist }: ProjectsProps) {
  const itemlist = projectslist.concat(workslist);

  itemlist.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    } else {
      return (a.priority ?? Infinity) - (b.priority ?? Infinity);
    }
  });

  return (
    <div id="warpSite" className="full white">
      <div className="wrapper">
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {itemlist.map((project, index) => (
            <div key={index} className="gridItem">
              {project.type === "works" ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="item">
                    <Image
                      src={`/img/cover/${project.cover}`}
                      alt={project.title}
                      width="400"
                      height="400"
                      className="coverImage"
                    />
                    <div className="info">
                      <h2>{project.title}</h2>
                      <h3>{project.year}</h3>
                    </div>
                  </div>
                </a>
              ) : (
                <Link href={`/project/${project.id}`}>
                  <div className="item">
                    <Image
                      src={`/img/cover/${project.cover}`}
                      alt={project.title}
                      width="400"
                      height="400"
                      className="coverImage"
                    />
                    <div className="info">
                      <h2>{project.title}</h2>
                      <h3>{project.year}</h3>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
