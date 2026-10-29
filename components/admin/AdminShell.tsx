"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  Users,
  ChartNoAxesCombined,
  ArrowUpRight,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/components/ToastProvider";
const navigation = [
  {
    href: "/admin/authors",
    label: "Authors",
    icon: Users,
    group: "Publishing",
  },
  {
    href: "/admin/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    group: "Workspace",
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: ChartNoAxesCombined,
    group: "Workspace",
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    icon: FileText,
    group: "Publishing",
  },
  {
    href: "/admin/careers",
    label: "Careers",
    icon: BriefcaseBusiness,
    group: "Publishing",
  },
  {
    href: "/admin/applicants",
    label: "Applicants",
    icon: Users,
    group: "Publishing",
  },
];
export default function AdminShell({
  admin,
  children,
}: {
  admin: { name: string; email: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const current = navigation.find((item) => pathname.startsWith(item.href));
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keydown);
    };
  }, [menuOpen]);
  async function logout() {
    setBusy(true);
    try {
      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
      });
      if (!response.ok)
        throw new Error("Could not sign out. Please try again.");
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      showToast({
        type: "error",
        title: "Sign out failed",
        message: (error as Error).message,
      });
    } finally {
      setBusy(false);
    }
  }
  const detail = pathname.endsWith("/new")
    ? "Create"
    : pathname.endsWith("/edit")
      ? "Edit"
      : current?.href === "/admin/applicants" && pathname !== current.href
        ? "Application details"
        : "";
  return (
    <div className="admin-shell min-h-screen lg:pl-[244px]">
      {menuOpen && (
        <button
          className="fixed inset-0 z-40 bg-[#233c2a]/30 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        id="admin-navigation"
        className={`admin-navigation fixed inset-y-0 left-0 z-50 flex w-[244px] flex-col border-r border-[#e3eadd] bg-white lg:visible lg:translate-x-0 ${menuOpen ? "visible translate-x-0" : "invisible -translate-x-full"}`}
      >
        <div className="admin-brand flex h-[100px] items-center justify-between px-7">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Zento Care"
              width={43}
              height={45}
              className="h-12 w-12 object-contain"
            />
            <div>
              <span className="text-[25px] font-bold tracking-[-.06em] text-secondary">
                zento<span className="text-primary">.</span>
              </span>
              <span className="block text-[9px] font-semibold tracking-[.17em] text-[#666f60]">
                CARE MANAGEMENT
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 lg:hidden"
            aria-label="Close menu"
          >
            <X size={17} />
          </button>
        </div>
        <nav aria-label="Admin navigation" className="admin-nav-links px-4">
          {["Workspace", "Publishing", "People"].map((group) => (
            <div key={group} className="mb-7">
              <p className="mb-3 px-3 text-[9px] font-bold tracking-[.16em] text-[#697163]">
                {group}
              </p>
              <div className="space-y-1">
                {navigation
                  .filter((item) =>
                    item.href === "/admin/authors" ||
                    item.href === "/admin/applicants"
                      ? group === "People"
                      : item.group === group,
                  )
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={
                        pathname.startsWith(item.href) ? "page" : undefined
                      }
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[12px] font-medium transition-colors ${pathname.startsWith(item.href) ? "bg-[#eef5e4] text-[#557630]" : "text-[#656d60] hover:bg-[#f7faf2] hover:text-[#536c42]"}`}
                    >
                      <item.icon size={17} strokeWidth={1.6} />
                      {item.label}
                      {pathname.startsWith(item.href) && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="admin-nav-footer">
          <a href="/" target="_blank" rel="noreferrer">
            <ArrowUpRight size={17} /> View website
          </a>
          <button type="button" onClick={logout} disabled={busy}>
            <LogOut size={17} />
            {busy ? "Signing out…" : "Sign out"}
          </button>
          <span>Zento · Administration</span>
        </div>
      </aside>
      <header className="admin-topbar sticky top-0 z-30 flex h-[78px] items-center justify-between gap-3 border-b border-[#e7eddf] bg-white/95 px-5 backdrop-blur-md sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            ref={menuButton}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="admin-navigation"
            className="rounded-lg p-2 text-[#63735a] lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-2 text-[11px] text-[#677060]"
          >
            <Link href="/admin/dashboard" className="hidden sm:inline">
              Workspace
            </Link>
            <ChevronRight size={11} className="hidden sm:inline" />
            <Link
              href={current?.href || "/admin/dashboard"}
              className="whitespace-nowrap font-medium text-[#617254]"
            >
              {current?.label || "Admin"}
            </Link>
            {detail && (
              <>
                <ChevronRight size={11} />
                <span>{detail}</span>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 text-[11px] text-[#646d5b] sm:flex"
          >
            View website <ArrowUpRight size={12} />
          </a>
          <span className="hidden h-6 w-px bg-[#e8eddf] sm:block" />
          <details className="relative">
            <summary className="flex cursor-pointer list-none items-center gap-2.5">
              <span className="admin-avatar !h-9 !w-9 !rounded-full">
                {admin.name
                  .trim()
                  .split(/\s+/)
                  .map((word) => word[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <span className="hidden sm:block">
                <span className="block text-[12px] font-semibold">
                  {admin.name}
                </span>
                <span className="block text-[10px] text-[#676e60]">
                  Administrator
                </span>
              </span>
              <ChevronDown size={13} className="text-[#677060]" />
            </summary>
            <div className="absolute right-0 top-12 w-56 rounded-2xl border border-[#e1e9d9] bg-white p-3 shadow-lg">
              <p className="truncate px-2 pt-1 text-xs font-semibold">
                {admin.name}
              </p>
              <p className="mb-3 truncate px-2 text-[11px] text-[#636d5b]">
                {admin.email}
              </p>
              <button
                aria-label="Sign out"
                disabled={busy}
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-lg bg-[#f6f9f1] px-3 py-2.5 text-xs text-[#5c7147]"
              >
                <LogOut size={14} />
                {busy ? "Signing out…" : "Sign out"}
              </button>
            </div>
          </details>
        </div>
      </header>
      <main className="admin-main mx-auto min-w-0 max-w-[1550px] space-y-6 p-5 sm:p-8 xl:p-9">
        {children}
        <footer className="flex flex-wrap justify-between gap-2 border-t border-[#e4ebdc] pt-6 text-[10px] text-[#656c5f]">
          <span>© Zento Group · Thoughtful care, thoughtfully managed.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Private admin workspace
          </span>
        </footer>
      </main>
    </div>
  );
}
