import About from "@/components/About";
import GlassTunnel from "@/components/GlassTunnel";
import Hero from "@/components/Hero";
import ProjectsOverlay from "@/components/ProjectsOverlay";
import Services from "@/components/Services";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <GlassTunnel id="work" items={projects} heading="Selected work" className="torn-both" />
      <About />
      <Services />
      <ProjectsOverlay projects={projects} />
    </>
  );
}
