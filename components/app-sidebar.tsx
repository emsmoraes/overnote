import * as React from "react";

import { auth } from "@/lib/auth";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { links } from "@/constants/links";
import Link from "next/link";
import { Button } from "./ui/button";
import { HiOutlinePlusSm } from "react-icons/hi";

export async function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();

  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <Button
            className="group-data-[collapsible=icon]:min-h-10 h-auto font-semibold text-lg mb-5 [&_svg]:size-auto"
            asChild
          >
            <Link href={"/dashboard/my-notes/new"}>
              <HiOutlinePlusSm size={22} />
              <span className="group-data-[collapsible=icon]:hidden">
                Escrever
              </span>
            </Link>
          </Button>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
