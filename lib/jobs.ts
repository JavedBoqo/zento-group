export interface JobListing {
  id: string;
  slug: string;
  title: string;
  location: string;
  region: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  contractTypes: string[];
  office: string;
  phone: string;
  phoneHref: string;
  email: string;
  image: string;
  referralBonus: string;
  highlights: string[];
  overview: string;
  responsibilities: string[];
  whatWeOffer: string[];
  requirements: string[];
}
