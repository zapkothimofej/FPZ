export type NavLink = { label: string; href: string }

/** Base links shared by Navbar and Footer. */
export const NAV_LINKS_BASE: NavLink[] = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Preise", href: "#pricing" },
]

/** Extended link list used by Footer (adds Kontakt). */
export const NAV_LINKS_FOOTER: NavLink[] = [
  ...NAV_LINKS_BASE,
  { label: "Kontakt", href: "#contact" },
]
