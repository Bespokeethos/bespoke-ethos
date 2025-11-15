"use client";
import * as React from "react";

export interface SearchAvatar {
  url: string;
  alt?: string | null;
  width?: number;
  height?: number;
}

interface SearchHitsContextType {
  authorsAvatars: Record<string, SearchAvatar>;
}

const SearchHitsContext = React.createContext<SearchHitsContextType | undefined>(undefined);

export function SearchHitsProvider({
  authorsAvatars: authors,
  children,
}: React.PropsWithChildren<SearchHitsContextType>) {
  return (
    <SearchHitsContext.Provider value={{ authorsAvatars: authors }}>
      {children}
    </SearchHitsContext.Provider>
  );
}

export function useSearchHits() {
  const context = React.useContext(SearchHitsContext);

  if (!context) {
    throw new Error("useSearchHits must be used within a SearchHitsProvider");
  }

  return context;
}
