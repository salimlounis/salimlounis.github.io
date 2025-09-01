// src/components/Projects.tsx
"use client";
import { useState } from "react";

import Link from "next/link";
import { Project, Work } from "../src/types/Project";
import Image from "next/image";
import Masonry from "react-masonry-css";

interface ProjectsProps {
  projectslist: Project[];
  workslist: Work[];
}

export default function Projects({ projectslist, workslist }: ProjectsProps) {
  const [filter, setFilter] = useState<"all" | "projects" | "works">("all");
  const itemlist = projectslist.concat(workslist);

  itemlist.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    } else {
      return (a.priority ?? Infinity) - (b.priority ?? Infinity);
    }
  });

  const filteredItems = itemlist.filter((item) => {
    if (filter === "all") return true;
    return filter === "works"
      ? item.type === "works"
      : item.type === "projects";
  });

  const breakpointColumnsObj = {
    default: 3,
    1200: 3,
    760: 1,
    480: 1,
  };

  return (
    <div id="warpSite" className="full">
      <div className="wrapper">
        <div className="flex gap-6 mb-6 menu">
          <span>
            <button
              onClick={() => setFilter("all")}
              className={filter === "all" ? "active" : ""}
            >
              Tous/
            </button>
          </span>
          <span>
            <button
              onClick={() => setFilter("projects")}
              className={filter === "projects" ? "active" : ""}
            >
              Personnels/
            </button>
          </span>
          <span>
            <button
              onClick={() => setFilter("works")}
              className={filter === "works" ? "active" : ""}
            >
              Professionnels/
            </button>
          </span>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredItems.map((project, index) => (
            <div key={index} className="gridItem">
              {project.type === "works" ? (
                <Link href={`/work/${project.id}`}>
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
                      <h3>{project.agence}</h3>
                      <h3>{project.year}</h3>
                    </div>
                  </div>
                </Link>
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
