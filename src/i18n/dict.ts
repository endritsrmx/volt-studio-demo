export type Lang = "de" | "en";

/** Swiss Standard German (ss instead of sharp s) + English. */
export const dict = {
  de: {
    skip: "Zum Inhalt springen",
    nav: { services: "Leistungen", about: "Über mich", contact: "Kontakt" },
    hero: {
      tag: "Informatiker · Buchs AG",
      title: "IT, die einfach funktioniert.",
      body: "Ich bin Endrit Sermaxhaj, Informatiker mit BSc in Computer Science. Mit endrIT Solutions unterstütze ich Privatpersonen und KMU – von der IT-Infrastruktur über die eigene Website bis zum Social-Media-Auftritt.",
      cta: "Anfrage senden",
      cta2: "Leistungen ansehen",
    },
    services: {
      eyebrow: "Leistungen",
      title: "Alles aus einer Hand",
      items: [
        {
          title: "IT-Dienstleistungen",
          body: "Persönliche Unterstützung vor Ort oder per Fernwartung.",
          points: ["IT-Support & Fehlerbehebung", "Netzwerk & WLAN", "Einrichtung von Geräten & Software", "Wartung & Updates"],
        },
        {
          title: "Webdesign & Website-Redesign",
          body: "Moderne, schnelle Websites – neu oder als Auffrischung Ihres bestehenden Auftritts.",
          points: ["Responsive Design für alle Geräte", "Redesign bestehender Websites", "SEO-Grundlagen", "Inkl. 1 Jahr Wartung"],
        },
        {
          title: "Social-Media-Betreuung",
          body: "Ein gepflegter Auftritt auf den Kanälen, auf denen Ihre Kundschaft unterwegs ist.",
          points: ["Instagram & TikTok", "Profil-Einrichtung & -Optimierung", "Beiträge planen & veröffentlichen", "Regelmässige Betreuung"],
        },
      ],
    },
    about: {
      eyebrow: "Über mich",
      title: "Persönlich, direkt und lösungsorientiert.",
      body: "Als Informatiker (BSc Computer Science) verbinde ich technisches Fachwissen mit einem Gespür für Design. Sie haben bei mir eine feste Ansprechperson – verständlich erklärt, ohne Fachchinesisch.",
      facts: ["BSc Computer Science", "Sitz in 5033 Buchs AG", "Deutsch & Englisch"],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Lassen Sie uns sprechen.",
      body: "Schreiben Sie mir kurz, worum es geht – ich melde mich so rasch wie möglich.",
      name: "Name",
      email: "E-Mail",
      service: "Leistung",
      serviceAny: "Allgemeine Anfrage",
      message: "Nachricht",
      send: "E-Mail vorbereiten",
      hint: "Öffnet Ihr E-Mail-Programm mit der ausgefüllten Nachricht.",
      error: "Bitte Name, gültige E-Mail und Nachricht angeben.",
      subject: "Anfrage über endrit-solutions",
      phone: "Telefon",
      location: "Standort",
    },
    footer: { rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz & Impressum" },
    privacy: {
      title: "Datenschutz & Impressum",
      back: "Zurück zur Startseite",
      sections: [
        { h: "Verantwortlich", p: "endrIT Solutions, Endrit Sermaxhaj, 5033 Buchs AG, Schweiz. E-Mail: esermaxhaj@icloud.com, Telefon: +41 79 788 54 21." },
        { h: "Datenbearbeitung", p: "Diese Website wird statisch über GitHub Pages ausgeliefert. Es werden keine Cookies für Tracking oder Werbung gesetzt. Der Hoster kann technisch notwendige Server-Logdaten (z. B. IP-Adresse, Zeitpunkt) bearbeiten." },
        { h: "Kontaktaufnahme", p: "Das Kontaktformular öffnet lediglich Ihr eigenes E-Mail-Programm. Daten, die Sie mir per E-Mail oder Telefon senden, verwende ich ausschliesslich zur Bearbeitung Ihrer Anfrage." },
        { h: "Ihre Rechte", p: "Sie können gemäss dem Schweizer Datenschutzgesetz (DSG) jederzeit Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen. Kontaktieren Sie mich dazu per E-Mail." },
      ],
    },
    notFound: { title: "Seite nicht gefunden", back: "Zur Startseite" },
  },
  en: {
    skip: "Skip to content",
    nav: { services: "Services", about: "About", contact: "Contact" },
    hero: {
      tag: "IT specialist · Buchs AG",
      title: "IT that simply works.",
      body: "I'm Endrit Sermaxhaj, an IT specialist with a BSc in Computer Science. With endrIT Solutions I support individuals and small businesses – from IT infrastructure to your website and social media presence.",
      cta: "Get in touch",
      cta2: "View services",
    },
    services: {
      eyebrow: "Services",
      title: "Everything from one source",
      items: [
        {
          title: "IT Services",
          body: "Personal support on site or via remote assistance.",
          points: ["IT support & troubleshooting", "Network & Wi-Fi", "Device & software setup", "Maintenance & updates"],
        },
        {
          title: "Web Design & Website Redesign",
          body: "Modern, fast websites – brand new or as a refresh of your existing site.",
          points: ["Responsive design for every device", "Redesign of existing websites", "SEO basics", "Incl. 1 year of maintenance"],
        },
        {
          title: "Social Media Management",
          body: "A well-kept presence on the channels where your customers are.",
          points: ["Instagram & TikTok", "Profile setup & optimisation", "Planning & publishing posts", "Ongoing management"],
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "Personal, direct and solution-oriented.",
      body: "As an IT specialist (BSc Computer Science) I combine technical know-how with a feel for design. You get one fixed point of contact – explained clearly, without jargon.",
      facts: ["BSc Computer Science", "Based in 5033 Buchs AG", "German & English"],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk.",
      body: "Send me a short note about what you need – I'll get back to you as soon as possible.",
      name: "Name",
      email: "Email",
      service: "Service",
      serviceAny: "General enquiry",
      message: "Message",
      send: "Prepare email",
      hint: "Opens your email app with the completed message.",
      error: "Please enter your name, a valid email and a message.",
      subject: "Enquiry via endrit-solutions",
      phone: "Phone",
      location: "Location",
    },
    footer: { rights: "All rights reserved.", privacy: "Privacy & legal notice" },
    privacy: {
      title: "Privacy & legal notice",
      back: "Back to home",
      sections: [
        { h: "Responsible", p: "endrIT Solutions, Endrit Sermaxhaj, 5033 Buchs AG, Switzerland. Email: esermaxhaj@icloud.com, phone: +41 79 788 54 21." },
        { h: "Data processing", p: "This website is served statically via GitHub Pages. No tracking or advertising cookies are used. The host may process technically required server logs (e.g. IP address, time)." },
        { h: "Contact", p: "The contact form only opens your own email app. Data you send me by email or phone is used solely to handle your enquiry." },
        { h: "Your rights", p: "Under the Swiss Data Protection Act (FADP) you may request access, correction or deletion of your data at any time. Just contact me by email." },
      ],
    },
    notFound: { title: "Page not found", back: "Back to home" },
  },
} as const;
