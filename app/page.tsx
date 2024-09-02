// app/page.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Projects from "./Projects";
import { loadProjects } from "../src/utils/loadProjects";
import { Project } from "../src/types/Project";
import { Work } from "../src/types/Work";

export default async function Home() {
  const projectslist: Project[] = loadProjects("projects");
  const workslist: Work[] = loadProjects("works");
  return (
    <main>
      <Header />
      <div className="header"></div>
      <Projects projectslist={projectslist} workslist={workslist} />
      <Footer />
    </main>
  );
}
