'use client';

import JobSearchBar from "@/components/JobSearchBar";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col flex-1 items-center justify-center font-sans"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <JobSearchBar />
    </div>
  );
}
