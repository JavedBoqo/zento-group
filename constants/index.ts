export interface OfficeLocation {
  id: string;
  name: string;
  shortName: string;
  address: string;
  streetAddress: string;
  locality: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneHref: string;
  email: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
}

export type Office = OfficeLocation;

export const OFFICES: OfficeLocation[] = [
  {
    id: "edinburgh",
    name: "Edinburgh Office",
    shortName: "Edinburgh",
    address: "Adit Place, Edinburgh EH17",
    streetAddress: "Adit Place",
    locality: "Edinburgh",
    postalCode: "EH17",
    country: "GB",
    phone: "0131 210 0095",
    phoneHref: "tel:01312100095",
    email: "info@zentogroup.co.uk",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Adit+Place+Edinburgh+EH17&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.google.com/?q=Adit+Place+Edinburgh+EH17",
  },
  {
    id: "crieff",
    name: "Crieff Office",
    shortName: "Crieff",
    address: "East High Street, Crieff PH7",
    streetAddress: "East High Street",
    locality: "Crieff",
    postalCode: "PH7",
    country: "GB",
    phone: "0176 479 0095",
    phoneHref: "tel:01764790095",
    email: "info@zentogroup.co.uk",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=East+High+Street+Crieff+PH7&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.google.com/?q=East+High+Street+Crieff+PH7",
  },
];

export const CONTACT_NUMBER = "0131 210 0095";
export const CONTACT_EMAIL = "info@zentogroup.co.uk";
export const CONTACT_WEBSITE = "www.zentogroup.co.uk";
export const CONTACT_WEBSITE_HREF = "https://zentogroup.co.uk";

export const SERVICE_AREAS =
  "East Lothian, Midlothian, West Lothian, City of Edinburgh, Crieff, Comrie, Muthill, Braco & Perthshire";

export const PERTHSHIRE_TAGLINE =
  "Now caring for Crieff, Comrie & Perthshire — from our new East High Street office";

export interface SocialLink {
  name: string;
  href: string;
  iconName: "facebook" | "instagram" | "linkedin";
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/zentogroupuk/",
    iconName: "facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/zento_groupuk/",
    iconName: "instagram",
  },
];