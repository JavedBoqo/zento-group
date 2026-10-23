export interface LocationNavigationLink {
  name: string;
  href: string;
  desc: string;
  children?: LocationNavigationLink[];
}

export const PERTHSHIRE_NAV_LINKS: LocationNavigationLink[] = [
  { name: "Perthshire Region Hub", href: "/locations/perthshire", desc: "Home care across Perthshire" },
  {
    name: "Crieff",
    href: "/locations/perthshire/crieff",
    desc: "Perthshire office & surrounds",
  },
  { name: "Comrie", href: "/locations/perthshire/comrie", desc: "Comrie, St Fillans & surrounds" },
];
