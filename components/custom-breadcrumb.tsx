"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/my-notes": "Minhas Anotações",
  "/dashboard/my-notes/new": "Nova Anotação",
  "/dashboard/my-notes/edit": "Editar Anotação",
  "/dashboard/public-notes": "Anotações Públicas",
  "/dashboard/public-notes/edit": "Editar Anotação",
};

export default function CustomBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const label = breadcrumbMap[fullPath] || segment;

          return (
            <BreadcrumbItem key={fullPath}>
              {index < pathSegments.length - 1 ? (
                <Link href={fullPath} className="text-blue-600 hover:underline">
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                </Link>
              ) : (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              )}
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
