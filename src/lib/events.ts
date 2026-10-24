export const OPEN_PROJECTS = "open-projects";

// Anything on the page (nav, buttons) can open the projects folders with this.
export function openProjects() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_PROJECTS));
}
