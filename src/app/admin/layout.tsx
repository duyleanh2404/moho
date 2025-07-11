import { AppSidebar } from './components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className=" bg-[#F5F5F5]">
      <AppSidebar variant="floating" />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
};

export default AdminLayout;
