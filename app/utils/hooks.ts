import { useState, useMemo } from "react";
import { ContentOutline, Chapter } from "@/lib/types";

/**
 * Hook to search chapters and lessons by title
 * Returns filtered outline based on search query
 */
export function useSearch(outline: ContentOutline) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter outline based on search query (memoized for performance)
  const filteredOutline = useMemo(() => {
    if (!searchQuery.trim()) {
      return outline;
    }

    const query = searchQuery.toLowerCase().trim();

    // Filter chapters and steps by search query
    const filtered = outline
      .map((chapter) => {
        const chapterMatches = chapter.title.toLowerCase().includes(query);
        const matchingSteps = chapter.steps.filter((step) =>
          step.title.toLowerCase().includes(query)
        );

        // Include chapter if title or any step matches
        if (chapterMatches || matchingSteps.length > 0) {
          return {
            ...chapter,
            steps: chapterMatches ? chapter.steps : matchingSteps,
          };
        }

        return null;
      })
      .filter((chapter): chapter is Chapter => chapter !== null);

    return filtered;
  }, [searchQuery, outline]);

  return {
    searchQuery,
    setSearchQuery,
    filteredOutline,
  };
}
