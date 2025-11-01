"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "./app-sidebar";

// This wrapper component is a client component that determines the active path
// and passes it to the AppSidebar server component.
export default function ClientSidebar() {
  const pathname = usePathname();
  return <AppSidebar activePath={pathname} />;
}
