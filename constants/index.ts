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
  mapEmbedHref: string;
  googleMapsUrl: string;
}

export type Office = OfficeLocation;


export const OFFICES: OfficeLocation[] = [
  {
    id: "crieff",
    name: "Crieff Office",
    shortName: "Crieff",
    address: "8 East High Street, Crieff PH7 3AF",
    streetAddress: "8 East High Street",
    locality: "Crieff",
    postalCode: "PH7 3AF",
    country: "GB",
    phone: "0176 479 0095",
    phoneHref: "tel:01764790095",
    email: "info@zentogroup.co.uk",
    mapEmbedHref: "https://maps.google.com/?q=8+East+High+Street+Crieff+PH7",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d816.856225207229!2d-3.837855724760665!3d56.372812241966066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48889b15bf9edec5%3A0x58d3cb79f013de85!2sZento%20Group!5e0!3m2!1sen!2s!4v1787140795353!5m2!1sen!2s",
    googleMapsUrl: "https://maps.google.com/?q=East+High+Street+Crieff+PH7",
  },
  {
    id: "edinburgh",
    name: "Edinburgh Office",
    shortName: "Edinburgh",
    address: "",
    streetAddress: "",
    locality: "Edinburgh",
    postalCode: "",
    country: "GB",
    phone: "0131 210 0095",
    phoneHref: "tel:01312100095",
    email: "info@zentogroup.co.uk",
    mapEmbedHref: "https://maps.google.com/?q=Edinburgh",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103991.20702129533!2d-3.1640364089791353!3d55.8926557355164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaf14cfe1e125191d%3A0x9cdbc1f03e81337c!2sZento%20Group!5e0!3m2!1sen!2s!4v1787141013636!5m2!1sen!2s",
    googleMapsUrl: "https://maps.google.com/?q=Edinburgh",
  },
];

export const CONTACT_NUMBER = "0176 479 0095";
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