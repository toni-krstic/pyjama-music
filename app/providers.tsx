"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

import { PlayerProvider } from "@/context/PlayerContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <PlayerProvider>{children}</PlayerProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
