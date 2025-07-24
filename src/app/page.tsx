import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyShowcase } from "@/components/company-showcase"
import { CvAnalyzer } from "@/components/cv-analyzer"
import { CvBuilder } from "@/components/cv-builder"
import { FileText, FilePlus2, Instagram, Mail, Phone } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <a href="/" className="flex items-center space-x-3">
            <Image src="/ankAsa.png" alt="ankAsa Logo" width={80} height={200} />
            <span className="inline-block font-headline text-2xl font-bold">ankAsa Career Hub</span>
          </a>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-background py-16 md:py-24">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">Aksi Nyata Kolektif Meraih Asa
                </h1>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                Kami adalah platform yang memudahkan Anda menemukan pekerjaan di perusahaan teknologi terkemuka, didukung oleh teknologi AI untuk membantu Anda mencapai potensi maksimal.
                </p>
                <div className="relative w-full max-w-5xl mx-auto h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mt-8">
                    <Image 
                        src="/ankasa.jpg"
                        data-ai-hint="office team collaboration"
                        alt="Tim ankAsa" 
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h2 className="absolute bottom-8 left-8 text-4xl font-bold text-white">Inovasi. Kolaborasi. Kesuksesan.</h2>
                </div>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                🧭 Visi
                Menjadi ruang digital yang mendorong generasi muda untuk bertindak nyata dan bersama-sama meraih masa depan karier yang lebih baik dan bermakna.
                  
                🎯 Misi
                Membantu pengguna menyiapkan dokumen kerja seperti CV secara efisien.

                </p>
            </div>
        </section>

        <section id="company-showcase" className="py-16 bg-muted/20">
            <div className="container mx-auto">
              <CompanyShowcase />
            </div>
        </section>
        
        <section id="ai-tools" className="py-16">
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-headline tracking-tight">Peralatan Karir AI Anda</h2>
                    <p className="text-muted-foreground mt-2">Manfaatkan kekuatan AI untuk menyempurnakan CV Anda.</p>
                </div>

                <Tabs defaultValue="builder" className="w-full max-w-6xl mx-auto">
                  <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 h-auto md:h-10">
                    <TabsTrigger value="builder" className="py-2">
                      <FilePlus2 className="mr-2 h-5 w-5" />
                      CV Builder
                    </TabsTrigger>
                    <TabsTrigger value="analyzer" className="py-2">
                      <FileText className="mr-2 h-5 w-5" />
                      CV Analyzer
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="builder" className="mt-6">
                    <CvBuilder />
                  </TabsContent>
                  <TabsContent value="analyzer" className="mt-6">
                    <CvAnalyzer />
                  </TabsContent>
                </Tabs>
            </div>
        </section>
      </main>

      <footer className="bg-foreground text-background">
        <div className="container mx-auto py-8 text-center">
          <h3 className="text-2xl font-headline font-bold">Hubungi Kami</h3>
          <p className="text-muted-foreground mt-2 mb-4">Kami siap membantu perjalanan karir Anda.</p>
          <div className="flex justify-center items-center space-x-6">
            <a href="mailto:contact@ankasa.com" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span>contact@ankasa.com</span>
            </a>
            <a href="https://instagram.com/ankasa.career" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
              <span>@ankasa.career</span>
            </a>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+62 821 1234 5678</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-8">&copy; {new Date().getFullYear()} ankAsa Career Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
