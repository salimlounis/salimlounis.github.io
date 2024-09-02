// app/project/[id]/page.tsx
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Project } from "../../../src/types/Project";
import { loadProjectById } from "../../../src/utils/loadProjects";
import ProjectContent from "./Project";

//import { useParams } from "next/navigation";
interface ProjectPageProps {
  params: {
    id: string;
  };
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
