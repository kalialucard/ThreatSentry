"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileInput,
  ShieldAlert,
  Search,
  Settings,
  CircleHelp,
  ShieldHalf,
  Network,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ingest", label: "Ingest Logs", icon: FileInput },
  { href: "/incidents", label: "Incidents", icon: ShieldAlert },
  { href: "/search", label: "Search", icon: Search },
  { href: "/threat-intel", label: "Threat Intel", icon: Network },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppSidebar({ activePath }: { activePath: string }) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ShieldHalf className="w-8 h-8 text-sidebar-primary" />
          <div className="flex flex-col">
            <h2 className="font-headline text-lg font-semibold text-sidebar-foreground">
              ThreatSentry AI
            </h2>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarMenu className="flex-1 px-4">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={activePath.startsWith(item.href)}
              tooltip={{ children: item.label, side: "right", align: "center" }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter className="p-4 mt-auto">
        <Button
          variant="ghost"
          className="justify-start w-full gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CircleHelp />
          <span>Help & Support</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
