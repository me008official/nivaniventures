"use client";
import { ButtonProvider } from "@/services/contextService/admin/buttonContextProvicer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function Provider({ children }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ButtonProvider>{children}</ButtonProvider>
    </QueryClientProvider>
  );
}
