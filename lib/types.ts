import type { ReactNode } from "react";

export type NavDropdownItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  preview: {
    image: string;
    quote: string;
    cta: string;
    ctaHref: string;
  };
};

export type NavItem = {
  label: string;
  href: string;
  sectionLabel?: string;
  dropdown?: NavDropdownItem[];
};

export type Service = {
  num: string;
  category: string;
  title: string;
  description: string;
  icon: ReactNode;
  featured?: boolean;
};

export type ProcessStep = {
  num: string;
  title: string;
  description: string;
  tag: string;
  icon: ReactNode;
};

export type Tool = {
  emoji: string;
  name: string;
};

export type Project = {
  tag: string;
  title: string;
  description: string;
  bgText: string;
  image?: string;
  large?: boolean;
  delay?: string;
};

export type Review = {
  text: string;
  initials: string;
  name: string;
  role: string;
  image?: string;
  delay?: string;
};

export type Stat = {
  target: number;
  suffix: string;
  label: string;
  description: string;
  float: "tr" | "ml" | "bc" | "br";
  accent?: boolean;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string; external?: boolean; badge?: string }[];
};
