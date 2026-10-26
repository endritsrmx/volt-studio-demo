"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";
import Logo from "@/components/ui/Logo";
import { Plus } from "@/components/ui/Icons";
import { useUI } from "@/components/providers/UIProvider";
import site, { services } from "@/config/site";
import { cn } from "@/lib/utils";

export default function MenuModal() {
  const { panel, close, open } = useUI();
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <Modal
      open={panel === "menu"}
      onClose={close}
      title="Menu"
      labelledBy="menu-title"
      footer={
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[20px] text-fg" aria-label={`${site.name} home`}>
            <Logo />
          </Link>
          <span className="text-[13px] font-light text-accent">{site.tagline}</span>
        </div>
      }
    >
      <nav className="px-1 py-3" aria-label="Main">
        <div className="pb-2 pl-3 pt-1 font-mono text-[12px] font-light text-accent">PAGES</div>
        <ul>
          {site.nav.map((item) => {
            if (item.children) {
              return (
                <li key={item.label}>
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-6 py-4 text-left transition-colors duration-[50ms] ease-in-out-ui hover:bg-[#282828]",
                      servicesOpen && "bg-[#282828]",
                    )}
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    <span className="text-[16px] font-light text-fg">{item.label}</span>
                    <span className="flex items-center gap-3 text-[13px] font-light text-muted">
                      <span className="max-xs:hidden">{item.hint}</span>
                      <Plus size={16} className={cn("text-accent transition-transform duration-300", servicesOpen && "rotate-45")} />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-[350ms] ease-out"
                    style={{ gridTemplateRows: servicesOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-5 border-t border-dashed border-white/25" />
                      <ul className="flex flex-col gap-1 p-4">
                        <li>
                          <Link href="/services" className="flex items-center justify-between rounded-lg px-6 py-3 transition-colors hover:bg-[#282828]">
                            <span className="text-[14px] font-light text-fg">All services</span>
                            <span className="text-[13px] font-light text-muted max-xs:hidden">Overview</span>
                          </Link>
                        </li>
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className={cn(
                                "flex items-center justify-between rounded-lg px-6 py-3 transition-colors hover:bg-[#282828]",
                                pathname === `/services/${s.slug}` && "bg-[#282828]",
                              )}
                            >
                              <span className="text-[14px] font-light text-fg">{s.menuLabel}</span>
                              <span className="text-[13px] font-light text-muted max-xs:hidden">{s.menuHint}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            }
            const isContact = item.href === "/contact";
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (isContact) {
                      e.preventDefault();
                      open("contact");
                    }
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-6 py-4 transition-colors duration-[50ms] ease-in-out-ui hover:bg-[#282828]",
                    pathname === item.href && "bg-white/[0.04]",
                  )}
                >
                  <span className="text-[16px] font-light leading-4 text-fg">{item.label}</span>
                  <span className="text-[13px] font-light text-muted max-xs:hidden">{item.hint}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Modal>
  );
}
