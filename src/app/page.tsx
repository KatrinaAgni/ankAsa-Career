import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyShowcase } from "@/components/company-showcase"
import { CvAnalyzer } from "@/components/cv-analyzer"
import { CvBuilder } from "@/components/cv-builder"
import { 
  FileText, 
  FilePlus2, 
  Instagram, 
  Mail, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  BookOpen, 
  PenTool,
  Compass
} from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col overflow-hidden font-sans">
      
      {/* AMBIENT BACKGROUND BLOBS (Sesuai nuansa Black, Brown, White gradient modern) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E8E0D5] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-5%] w-[40vw] h-[40vw] bg-[#D6C5B3] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-[#F4EBE1] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>

      {/* HEADER - Glassmorphism */}
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/50 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="/" className="flex items-center space-x-3 group">
            {/* Ganti src dengan logo Ankasa transparan yang sesuai */}
            <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl">A</span>
            </div>
            <span className="inline-block font-headline text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              ankasa.hub
            </span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#about" className="hover:text-gray-900 transition-colors">Tentang Kami</a>
            <a href="#services" className="hover:text-gray-900 transition-colors">Layanan</a>
            <a href="#ai-tools" className="hover:text-gray-900 transition-colors">AI Tools</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-sm font-semibold text-gray-700 mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>One Platform for Academic and Career Growth</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tight text-gray-900 mb-6 leading-tight">
              Aksi Nyata Kolektif <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-[#8B7355]">Meraih Asa</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Platform digital terdepan yang mendampingi mahasiswa Indonesia melintasi orbit pertumbuhannya dari bangku kuliah hingga siap bersinar di dunia kerja.
            </p>

            {/* Glassmorphism Image Container */}
            <div className="relative w-full h-72 md:h-96 rounded-[2rem] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-4 border-white/60">
              <Image 
                src="/ankasa.jpg"
                alt="Tim ankAsa" 
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8 md:p-12">
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Mulai Orbitmu Sekarang.</h2>
                  <p className="text-gray-200 font-medium">Temukan arah, kembangkan potensi, dan ambil langkah nyata.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE SECTION (O.R.B.I.T) */}
        <section id="about" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-sm flex flex-col justify-center">
                <Compass className="w-10 h-10 text-[#8B7355] mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Nilai Inti Kami</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Seperti lintasan orbit, kami membawa mahasiswa dari titik awal menuju bintang pencapaian mereka melalui O.R.B.I.T.
                </p>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "Open", desc: "Transparan dalam komunikasi." },
                  { title: "Responsible", desc: "Kualitas layanan terjamin." },
                  { title: "Bold", desc: "Berani berinovasi." },
                  { title: "Integrity", desc: "Konsisten dan jujur." },
                  { title: "Trustworthy", desc: "Bisa diandalkan." },
                ].map((item, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-600 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Layanan Terintegrasi</h2>
              <p className="text-gray-600 mt-3 font-medium">Satu platform untuk kebutuhan akademik dan karier.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ankasa Career Card */}
              <div className="bg-white/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-white/80 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-[40px] opacity-60 group-hover:scale-150 transition-transform duration-700"></div>
                <Briefcase className="w-12 h-12 text-blue-700 mb-6 relative z-10" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">Ankasa Career</h3>
                <ul className="space-y-3 text-gray-700 font-medium relative z-10">
                  <li className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-amber-500" /> Pencarian lowongan kerja, magang & MBKM</li>
                  <li className="flex items-center gap-3"><FilePlus2 className="w-4 h-4 text-blue-500" /> Pembuatan CV online dengan AI</li>
                  <li className="flex items-center gap-3"><Globe className="w-4 h-4 text-indigo-500" /> Pembuatan portofolio digital</li>
                </ul>
              </div>

              {/* Ankasa Study Card */}
              <div className="bg-white/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-white/80 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full mix-blend-multiply filter blur-[40px] opacity-60 group-hover:scale-150 transition-transform duration-700"></div>
                <GraduationCap className="w-12 h-12 text-rose-700 mb-6 relative z-10" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">Ankasa Study</h3>
                <ul className="space-y-3 text-gray-700 font-medium relative z-10">
                  <li className="flex items-center gap-3"><BookOpen className="w-4 h-4 text-rose-500" /> Rangkuman materi kuliah & E-book</li>
                  <li className="flex items-center gap-3"><PenTool className="w-4 h-4 text-amber-500" /> Desain poster seminar & lomba</li>
                  <li className="flex items-center gap-3"><FileText className="w-4 h-4 text-emerald-500" /> Template laporan & proposal kegiatan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI TOOLS SECTION (CV Builder & Analyzer) */}
        <section id="ai-tools" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 md:p-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Peralatan Karier AI</h2>
                <p className="text-gray-600 mt-2 font-medium">Bangun CV ATS Friendly dan analisis potensi dokumen kerjamu.</p>
              </div>

              <Tabs defaultValue="builder" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-auto p-1.5 bg-gray-200/50 backdrop-blur-sm rounded-2xl mb-8">
                  <TabsTrigger value="builder" className="py-3 rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                    <FilePlus2 className="mr-2 h-4 w-4" /> CV Builder
                  </TabsTrigger>
                  <TabsTrigger value="analyzer" className="py-3 rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                    <FileText className="mr-2 h-4 w-4" /> CV Analyzer
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="builder" className="mt-2 outline-none">
                  <div className="bg-white/80 rounded-2xl p-2 md:p-4 shadow-sm border border-gray-100">
                    <CvBuilder />
                  </div>
                </TabsContent>
                <TabsContent value="analyzer" className="mt-2 outline-none">
                  <div className="bg-white/80 rounded-2xl p-2 md:p-4 shadow-sm border border-gray-100">
                    <CvAnalyzer />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* COMPANY SHOWCASE */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
             <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-white/60 shadow-sm">
                <CompanyShowcase />
             </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white relative z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent opacity-50"></div>
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            
            <div>
               <h3 className="text-2xl font-extrabold tracking-tight mb-4">ankasa.hub</h3>
               <p className="text-gray-400 font-medium leading-relaxed max-w-xs mx-auto md:mx-0">
                 Platform berbasis website yang mengintegrasikan kebutuhan akademik dan persiapan karier generasi muda.
               </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
               <h4 className="text-lg font-bold mb-4">Tautan</h4>
               <nav className="space-y-3 text-gray-400 font-medium">
                 <a href="https://ankasa-career.vercel.app/" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Website Resmi</a>
                 <a href="#about" className="block hover:text-white transition-colors">Tentang O.R.B.I.T</a>
                 <a href="#ai-tools" className="block hover:text-white transition-colors">AI CV Tools</a>
               </nav>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-4">Hubungi Kami</h4>
              <div className="space-y-4 text-gray-400 font-medium">
                <a href="mailto:contact@ankasa.com" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" /> <span>contact@ankasa.com</span>
                </a>
                <a href="https://instagram.com/ankasa.hub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" /> <span>@ankasa.hub</span>
                </a>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" /> <span>+62 821 1234 5678</span>
                </div>
              </div>
            </div>

          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 font-medium">
            <p>&copy; {new Date().getFullYear()} Ankasa Hub. Aksi Nyata Kolektif Meraih Asa.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}