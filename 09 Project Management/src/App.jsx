import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  const handleStartAddProject = () => {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      };
    });
  };

  const handleCancel = () => {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      };
    });
  };

  function handleAddProject(projectData) {
    setProjectsState((prev) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject],
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 gap-8 flex">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} />
      {content}
    </main>
  );
}

export default App;
