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
import { useEffect, useState } from "react";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/my-notes": "Minhas Anotações",
  "/dashboard/my-notes/new": "Nova Anotação",
  "/dashboard/public-notes": "Anotações Públicas",
  "/notes": "Anotações",
};

const isId = (segment: string) => segment.length > 10;

export default function CustomBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
          let label = breadcrumbMap[fullPath] || segment;

          if (index > 1 && pathSegments[index - 1] === "my-notes" && isId(segment)) {
            label = "Editar Anotação";
          }

          if (index > 0 && pathSegments[index - 1] === "notes" && isId(segment)) {
            label = "Ver Anotação";
          }

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
