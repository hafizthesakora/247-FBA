import type { NavItem } from "@/types/services";

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "FBA Prep", href: "/services/fba-prep" },
      { label: "Direct Injection", href: "/services/direct-injection" },
      { label: "Volume Prep", href: "/services/volume-prep" },
      { label: "Returns Management", href: "/services/returns" },
      { label: "Storage Solutions", href: "/services/storage" },
      { label: "Fulfillment", href: "/services/fulfillment" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Ghana Line", href: "/ghana-line" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNavItems = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "FBA Prep", href: "/services/fba-prep" },
    { label: "Direct Injection", href: "/services/direct-injection" },
    { label: "Volume Prep", href: "/services/volume-prep" },
    { label: "Returns Management", href: "/services/returns" },
    { label: "Storage Solutions", href: "/services/storage" },
    { label: "Ghana Line", href: "/ghana-line" },
  ],
  resources: [
    { label: "Get a Quote", href: "/contact" },
    { label: "Client Login", href: "#" },
    { label: "FAQ", href: "/how-it-works#faq" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" },
  ],
};
