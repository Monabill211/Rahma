"use client";

import type { MouseEvent, ReactNode } from "react";
import { openProjects } from "@/lib/events";

type Props = {
  href: string;
  action?: "projects";
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
};

// Normal anchor, except items with action="projects" open the folders overlay instead of scrolling.
export default function NavLink({ href, action, className, onNavigate, children }: Props) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (action === "projects") {
      e.preventDefault();
      openProjects();
    }
    onNavigate?.();
  };
  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
