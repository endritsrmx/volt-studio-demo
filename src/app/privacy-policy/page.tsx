import type { Metadata } from "next";
import Privacy from "@/components/site/Privacy";

export const metadata: Metadata = { title: "Datenschutz & Impressum", alternates: { canonical: "./" } };

export default function PrivacyPage() {
  return <Privacy />;
}
