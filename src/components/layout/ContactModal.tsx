"use client";

import Modal from "./Modal";
import ContactForm from "./ContactForm";
import { useUI } from "@/components/providers/UIProvider";
import site from "@/config/site";

export default function ContactModal() {
  const { panel, close } = useUI();
  return (
    <Modal
      open={panel === "contact"}
      onClose={close}
      title="Start a project"
      labelledBy="contact-title"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] font-light">
          <a href={`mailto:${site.contact.email}`} className="link-sweep text-fg">
            {site.contact.email}
          </a>
          <span className="text-accent">Reply within 1 business day</span>
        </div>
      }
    >
      <ContactForm compact />
    </Modal>
  );
}
