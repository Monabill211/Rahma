// Everything editable lives here: name, links, nav items.
export type NavItem = { label: string; href: string; action?: "projects" };

export const site = {
  name: "Rahma",
  handle: "Rahma.psd",
  tag: "Graphic designer",
  blurb: "Brand identities, posters and illustrations with a handmade feel.",
  email: "hello@rahma.design",
  nav: [
    { label: "Work", href: "#work", action: "projects" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  about: [
    "I'm Rahma, a graphic designer who likes work that looks like a person made it: rough edges, hand-drawn lines and colors that don't apologize.",
    "I help small brands and creators turn a vague idea into an identity they can use everywhere, from a logo to a poster to a feed that feels like one thing.",
  ],
  tools: ["Photoshop", "Illustrator", "Procreate", "Figma"],
  services: [
    { title: "Brand identity", icon: "crown", desc: "Logo, colors, type and a short guide, so your brand looks the same everywhere." },
    { title: "Posters and print", icon: "planet", desc: "Posters, flyers and packaging with real texture and one clear message." },
    { title: "Illustration", icon: "eye", desc: "Hand-drawn characters, icons and sticker sets made in your palette." },
    { title: "Social media design", icon: "sparkle", desc: "Templates and carousels that keep your feed consistent and easy to post." },
  ],
};
