import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from '@/components/ui/sidebar';
  import { type NavItem } from '@/types';
  import { Link, usePage } from '@inertiajs/react';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  
export function NavMain({
  items = [],
  label = 'Menu',
}: {
  items: NavItem[];
  label?: string;
}) {
  const page = usePage();

  return (
    <SidebarGroup className="mb-6">
      <SidebarGroupLabel className="text-sm font-bold text-yellow-500 dark:text-gray-100 uppercase tracking-wider mb-4">
        {label}
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-3">
        {items.map((item) => {
          const isActive = page.url === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`
                  group relative flex items-center gap-4 w-full px-5 py-3 rounded-xl transition-all duration-300 ease-in-out
                  text-[16px] font-medium
                  ${
                    isActive
                      ? 'bg-[#ffffff]/10 text-orange-500 shadow-md border-l-4 border-red-600'
                      : 'bg-orange-400 dark:bg-slate-700 text-white dark:text-gray-300 hover:bg-[#000000]/10 hover:text-[#006359] hover:scale-[1.02] hover:shadow-md hover:translate-x-[2px]'
                  }
                `}
              >
                <Link href={item.url} prefetch className="flex items-center gap-4 w-full">
                  {item.icon && (
                    <item.icon
                      className={`w-6 h-6 transition-transform duration-300 ${
                        isActive ? 'text-[#006359]' : 'group-hover:text-[#006359]'
                      }`}
                    />
                  )}
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
