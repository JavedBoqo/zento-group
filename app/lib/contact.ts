export interface Office {
  name: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
}

export const OFFICES: Office[] = [
  {
    name: "Edinburgh Office",
    address: "Adit Place, Edinburgh EH17",
    phone: "0131 210 0095",
    phoneHref: "tel:01312100095",
    email: "info@zentogroup.co.uk",
  },
  {
    name: "Crieff Office",
    address: "East High Street, Crieff PH7",
    phone: "0176 479 0095",
    phoneHref: "tel:01764790095",
    email: "info@zentogroup.co.uk",
  },
];

export const CONTACT_EMAIL = "info@zentogroup.co.uk";
export const CONTACT_WEBSITE = "www.zentogroup.co.uk";
export const CONTACT_WEBSITE_HREF = "https://zentogroup.co.uk";

export const SERVICE_AREAS =
  "East Lothian, Midlothian, West Lothian, City of Edinburgh, Crieff, Comrie, Muthill, Braco & Perthshire";

export const PERTHSHIRE_TAGLINE =
  "Now caring for Crieff, Comrie & Perthshire — from our new East High Street office";
