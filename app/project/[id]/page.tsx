// app/project/[id]/page.tsx
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Project } from "../../../src/types/Project";
import { loadProjects, loadProjectById } from "../../../src/utils/loadProjects";
import ProjectContent from "./Project";

//import { useParams } from "next/navigation";
interface ProjectPageProps {
  params: {
    id: string;
  };
}

// Function to generate static params for each project
export async function generateStaticParams() {
  // Load all projects to get their IDs
  const allProjects = loadProjects("projects"); // Adjust the directory name if needed
  const paths = allProjects.map((project) => ({
    id: project.id,
  }));

  return paths;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project: Project = loadProjectById(params.id);
  return (
    <main>
      <Header />
      <div className="header"></div>
      <div>
        <ProjectContent project={project} />
      </div>
      <Footer />
    </main>
  );
}
