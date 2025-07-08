"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { getLocalStorageItem } from "@/utils/helper";

const authRoutes = ["/login", "/signup", "/forget-password", "/reset-password"];

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const token = getLocalStorageItem("token");

  useEffect(() => {
    if (!token && !authRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, token]);

  const showLayout = !authRoutes.includes(pathname);

  return (
    <>
      {showLayout && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <main className="px-4 pt-4">{children}</main>
    </>
  );
}
