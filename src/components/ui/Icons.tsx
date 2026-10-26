import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 24) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const });

export const ArrowUpRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const ArrowRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const ArrowDown = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Plus = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
);
export const Close = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
export const MenuGrid = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="4" y="4" width="6" height="6" rx="1.2" fill="currentColor" />
    <rect x="14" y="4" width="6" height="6" rx="1.2" fill="currentColor" />
    <rect x="4" y="14" width="6" height="6" rx="1.2" fill="currentColor" />
    <rect x="14" y="14" width="6" height="6" rx="1.2" fill="currentColor" />
  </svg>
);
export const Bolt = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
export const Send = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
export const Mail = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
export const LinkedIn = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path fill="currentColor" d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 7a1.97 1.97 0 0 0 0-4ZM20.44 13.4c0-3.1-1.65-4.55-3.86-4.55a3.34 3.34 0 0 0-3 1.65V8.5H10.2V20h3.38v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.38l-.52-6.6Z" /></svg>
);
export const Instagram = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg>
);
export const XIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" /></svg>
);
export const GitHub = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
);
export const Chat = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4.2A2.5 2.5 0 0 1 4 13.5v-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
export const Pen = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m14 5 5 5M4 20l4.5-1L19.4 8.1a2 2 0 0 0 0-2.8l-.7-.7a2 2 0 0 0-2.8 0L5 15.5 4 20Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
export const Code = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Cube = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9m0-9L4 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
export const Spark = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M19 15c.25 1.6 1 2.4 2.5 2.6-1.5.3-2.3 1-2.5 2.6-.3-1.6-1-2.4-2.6-2.6 1.6-.3 2.4-1 2.6-2.6Z" fill="currentColor" /></svg>
);

export const SocialIcon = ({ name, size = 18 }: { name: string; size?: number }) => {
  switch (name) {
    case "linkedin":
      return <LinkedIn size={size} />;
    case "instagram":
      return <Instagram size={size} />;
    case "x":
      return <XIcon size={size} />;
    case "github":
      return <GitHub size={size} />;
    case "mail":
      return <Mail size={size} />;
    default:
      return <ArrowUpRight size={size} />;
  }
};

export const ToolIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  const n = name.toLowerCase();
  if (n.includes("figma") || n.includes("design")) return <Pen size={size} />;
  if (n.includes("blender") || n.includes("3d")) return <Cube size={size} />;
  if (n.includes("ai")) return <Spark size={size} />;
  return <Code size={size} />;
};
