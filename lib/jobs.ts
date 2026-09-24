import jobsData from "@/mock/jobs.json";

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

const jobs: JobListing[] = jobsData as JobListing[];

export function getAllJobs(): JobListing[] {
  return jobs;
}

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobs.find((j) => j.slug === slug);
}
