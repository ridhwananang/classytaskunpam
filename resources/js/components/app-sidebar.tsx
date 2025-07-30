import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  Calendar,
  ClipboardList,
  LayoutGrid,
  MessageCircleCode,
  MessageCircle,
  ShieldCheck,
  Bot,
  Vote,
  PlusCircle,
} from 'lucide-react';
import AppLogo from './app-logo';

// Semua menu utama
const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Tugas',
    url: '/tugas',
    icon: ClipboardList,
  },
  {
    title: 'Jadwal',
    url: '/jadwal',
    icon: Calendar,
  },
  {
    title: 'Forum Diskusi',
    url: '/forum',
    icon: MessageCircleCode,
  },
  {
    title: 'Classy AI',
    url: '/chatboxai',
    icon: Bot,
  },
  {
    title: 'Absensi',
    url: '/setup-authenticator',
    icon: MessageCircle,
  },
  {
    title: 'Riwayat Absensi',
    url: '/absensi/riwayat',
    icon: ClipboardList,
  },
  {
  title: 'Nilai',
  url: '/nilai',
  icon: ClipboardList,
},

  {
    title: 'Vote',
    url: '/vote',
    icon: Vote,
  },
  {
    title: 'Pengaturan 2FA',
    url: '/two-factor',
    icon: ShieldCheck,
  },
];

// Menu khusus admin / kelasAdmin
const adminNavItems: NavItem[] = [
  {
    title: 'Dashboard Admin',
    url: '/dashboard_admin',
    icon: ShieldCheck,
  },
  {
    title: 'Buat Vote',
    url: '/vote/create',
    icon: PlusCircle,
  },
];

// Menu khusus dosen
const dosenNavItems: NavItem[] = [
  {
    title: 'Tambah Pertemuan',
    url: '/admin/pertemuan/create',
    icon: PlusCircle,
  },
  {
    title: 'Kehadiran Pertemuan',
    url: '/kehadiran-pertemuan',
    icon: MessageCircle,
  },
  // {
  //   title: 'Input Kehadiran',
  //   url: '/absensi/input',
  //   icon: MessageCircleCode,
  // },
  // {
  //   title: 'Rekap Kehadiran',
  //   url: '/rekap-kehadiran',
  //   icon: ClipboardList,
  // },
  {
    title: 'Input Nilai',
    url: '/rekap-nilai',
    icon: ClipboardList,
  },
  // {
  //   title: 'Hasil Vote',
  //   url: '/vote/hasil',
  //   icon: Vote,
  // },
];

const footerNavItems: NavItem[] = [
  // Tambahkan menu footer jika ada
];

export function AppSidebar() {
 type User = {
  role?: string;
  [key: string]: any;
};

type PageProps = {
  auth?: {
    user?: User;
  };
} & Record<string, any>; // <- tambahkan ini untuk menghindari error
const page = usePage();
const user = (page.props as PageProps).auth?.user;


  // Filter menu utama jika user adalah dosen
  const filteredMainNavItems =
    user?.role === 'dosen'
      ? mainNavItems.filter(
          (item) =>
            !['/tugas', '/jadwal', '/setup-authenticator', '/absensi/riwayat', '/vote', '/nilai'].includes(item.url)
        )
      : mainNavItems;

  return (
    <Sidebar collapsible="icon" variant="inset">
      {/* Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Konten */}
      <SidebarContent>
        <NavMain label="Platform" items={filteredMainNavItems} />

        {(user?.role === 'admin' || user?.role === 'kelasAdmin') && (
          <NavMain label="Platform Admin" items={adminNavItems} />
        )}

        {(user?.role === 'admin' || user?.role === 'dosen') && (
          <NavMain label="Platform Dosen" items={dosenNavItems} />
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
