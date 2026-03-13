"use client";

import { StoreProvider } from "./_store";
import { DashboardSidebar } from "./_components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#f2f2f2] flex">
        <DashboardSidebar />
        <main className="flex-1 md:ml-[240px] min-h-screen">
          {children}
        </main>
      </div>
    </StoreProvider>
  );
}