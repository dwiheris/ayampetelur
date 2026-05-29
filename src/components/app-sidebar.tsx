import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Warehouse, Bird, Egg, Wheat, HeartPulse, Package, Boxes,
  ShoppingCart, Users, Wallet, Calendar, FileBarChart, Settings, LogOut, Feather,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { useStore } from "@/lib/store";
import { ROLE_LABELS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const menu = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Kandang", url: "/kandang", icon: Warehouse },
  { title: "Populasi Ayam", url: "/populasi", icon: Bird },
  { title: "Produksi Telur", url: "/produksi", icon: Egg },
  { title: "Pakan", url: "/pakan", icon: Wheat },
  { title: "Kesehatan", url: "/kesehatan", icon: HeartPulse },
  { title: "Stok Telur", url: "/stok-telur", icon: Package },
  { title: "Gudang", url: "/gudang", icon: Boxes },
  { title: "Penjualan", url: "/penjualan", icon: ShoppingCart },
  { title: "Pelanggan", url: "/pelanggan", icon: Users },
  { title: "Keuangan", url: "/keuangan", icon: Wallet },
  { title: "Jadwal", url: "/jadwal", icon: Calendar },
  { title: "Laporan", url: "/laporan", icon: FileBarChart },
  { title: "Pengaturan", url: "/pengaturan", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { currentUser, logout } = useStore();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Feather className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-sidebar-foreground">Telurku</span>
              <span className="text-xs text-sidebar-foreground/60">Management System</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((m) => {
                const active = path === m.url || path.startsWith(m.url + "/");
                return (
                  <SidebarMenuItem key={m.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={m.title}>
                      <Link to={m.url}>
                        <m.icon className="h-4 w-4" />
                        <span>{m.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        {currentUser && !collapsed && (
          <div className="px-2 py-2">
            <div className="text-sm font-medium text-sidebar-foreground">{currentUser.name}</div>
            <div className="text-xs text-sidebar-foreground/60">{ROLE_LABELS[currentUser.role]}</div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { logout(); window.location.href = "/login"; }}
          className="justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Keluar</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
