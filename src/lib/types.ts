export type CvBuilderOutput = {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  summary: string;
  experience: {
    title: string;
    company: string;
    dates: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    dates: string;
  }[];
  skills: string[];
  certifications?: {
    name: string;
    organizer: string;
    dates: string;
  }[];
};
