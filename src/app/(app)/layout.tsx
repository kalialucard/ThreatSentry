import ClientSidebar from '@/components/layout/client-sidebar';
import Header from '@/components/layout/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <ClientSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
