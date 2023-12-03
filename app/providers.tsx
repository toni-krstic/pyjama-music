"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { Provider, createStore } from "jotai";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const store = createStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <Provider store={store}>{children}</Provider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
