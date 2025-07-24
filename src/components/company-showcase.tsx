import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, Briefcase } from "lucide-react"

const companies = [
  {
    name: "InnovateTech Solutions",
    logo: "https://placehold.co/100x100.png",
    logoHint: "logo tech",
    description: "Pioneering the future of AI-driven analytics and cloud computing solutions.",
    contact: {
      email: "careers@innovatetech.com",
      phone: "+1 (555) 123-4567",
    },
    jobs: [
      { title: "Senior AI Engineer", type: "Full-time" },
      { title: "Cloud Solutions Architect", type: "Full-time" },
      { title: "UX/UI Designer", type: "Contract" },
    ],
  },
  {
    name: "GreenLeaf Organics",
    logo: "https://placehold.co/100x100.png",
    logoHint: "logo nature",
    description: "Committed to sustainable and organic farming, delivering fresh produce to communities.",
    contact: {
      email: "hr@greenleaf.org",
      phone: "+1 (555) 987-6543",
    },
    jobs: [
      { title: "Supply Chain Manager", type: "Full-time" },
      { title: "Marketing Specialist", type: "Full-time" },
      { title: "Farm Operations Lead", type: "Part-time" },
    ],
  },
  {
    name: "QuantumLeap Finance",
    logo: "https://placehold.co/100x100.png",
    logoHint: "logo finance",
    description: "A fintech startup revolutionizing personal finance with cutting-edge technology.",
    contact: {
      email: "joinus@quantumleap.fi",
      phone: "+1 (555) 246-8135",
    },
    jobs: [
      { title: "Full-Stack Developer", type: "Full-time" },
      { title: "Data Scientist", type: "Full-time" },
      { title: "Product Manager", type: "Full-time" },
    ],
  },
]

export function CompanyShowcase() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline tracking-tight lg:text-4xl">Explore Opportunities</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
        Temukan karier yang menarik dengan perusahaan mitra kami. Kami menghubungkan talenta dengan inovasi.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={company.logo} alt={`${company.name} logo`} data-ai-hint={company.logoHint} />
                <AvatarFallback>
                  <Building2 className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-xl">{company.name}</CardTitle>
                <CardDescription className="mt-1">{company.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <h4 className="font-semibold mb-2 flex items-center"><Briefcase className="mr-2 h-4 w-4" />Open Positions</h4>
              <div className="space-y-2">
                {company.jobs.map((job, jobIndex) => (
                  <div key={jobIndex} className="flex justify-between items-center">
                    <span className="text-sm">{job.title}</span>
                    <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'} className="bg-primary/10 text-primary hover:bg-primary/20">{job.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground space-y-1 w-full">
                 <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    <a href={`mailto:${company.contact.email}`} className="hover:text-primary transition-colors">{company.contact.email}</a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>{company.contact.phone}</span>
                  </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
