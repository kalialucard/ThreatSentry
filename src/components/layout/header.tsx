
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Search, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
    if (pathname.includes('/dashboard')) return 'Dashboard';
    if (pathname.includes('/ingest')) return 'Ingest Logs';
    if (pathname.includes('/incidents')) return 'Incidents';
    if (pathname.includes('/search')) return 'Search';
    if (pathname.includes('/threat-intel')) return 'Threat Intel';
    if (pathname.includes('/settings')) return 'Settings';
    return 'ThreatSentry AI';
}

export default function Header() {
    const pathname = usePathname();
    const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-xl font-semibold hidden md:block">{title}</h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative hidden md:block w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs, incidents, IPs..."
            className="pl-8"
          />
        </div>

        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/user/32/32" alt="User" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Security Analyst</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href="/login">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
