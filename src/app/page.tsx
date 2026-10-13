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
  Archive,
  BookMarked,
  Building2,
  Phone,
  ChevronDown,
  Search,
  Megaphone,
  Newspaper
} from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col overflow-hidden font-sans scroll-smooth">
      
      {/* AMBIENT BACKGROUND BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E8E0D5] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-5%] w-[40vw] h-[40vw] bg-[#D6C5B3] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-[#F4EBE1] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>

      {/* HEADER - Glassmorphism */}
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="/" className="flex items-center space-x-3 group">
            
            {/* LOGO BARU (A Silver Gelap, Lintasan Silver Gelap, Bintang Putih Cerah) */}
            <div className="relative flex items-center justify-center w-11 h-11 bg-[#2D2D2D] rounded-xl shadow-md overflow-hidden group-hover:scale-105 transition-transform">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-gray-400 to-gray-600 z-10 relative top-[1px]">
                A
              </span>
              <div className="absolute w-12 h-6 border-b-[3px] border-l-[3px] border-gray-500 rounded-full -rotate-12 transform scale-110 top-1.5 left-1"></div>
              <Sparkles className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-white fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] z-20" />
            </div>
            
            <span className="inline-block font-headline text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              ankasa.hub
            </span>
          </a>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600 items-center">
            <a href="#about" className="hover:text-gray-900 transition-colors">Tentang Kami</a>
            
            {/* DROPDOWN MENU LAYANAN */}
            <div className="relative group inline-block">
              <button className="flex items-center gap-1 hover:text-gray-900 transition-colors py-2">
                Layanan <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-64 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 p-2 z-50">
                <div className="space-y-1">
                  <a href="#ankasa-career" className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group/item">
                    <div className="bg-blue-100 p-1.5 rounded-lg text-blue-700 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Ankasa Career</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Loker, CV AI, Arsip & Portofolio</div>
                    </div>
                  </a>
                  <a href="#ankasa-study" className="flex items-start gap-3 p-3 rounded-xl hover:bg-rose-50 transition-colors group/item">
                    <div className="bg-rose-100 p-1.5 rounded-lg text-rose-700 group-hover/item:bg-rose-600 group-hover/item:text-white transition-colors">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Ankasa Study</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Materi, Desain & Publikasi Artikel</div>
                    </div>
                  </a>
                  <a href="#ankasa-b2b" className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50 transition-colors group/item">
                    <div className="bg-amber-100 p-1.5 rounded-lg text-amber-700 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">B2B Eksekutif</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Jurnal SINTA & CV Massal</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/80 backdrop-blur-md border border-amber-200 shadow-sm text-xs font-bold text-amber-800 mb-6 uppercase tracking-wider">
              <Megaphone className="w-4 h-4" />
              <span>Hadir Untuk Mahasiswa Semarang & Sekitarnya</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tight text-gray-900 mb-6 leading-tight">
              Aksi Nyata Kolektif <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-[#8B7355]">Meraih Asa</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-3xl mx-auto leading-relaxed font-bold">
              "Menjadi platform edukasi dan karier digital terdepan di tingkat global."
            </p>

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

        {/* SECTION 1: ANKASA CAREER (AI Tools Dimasukkan ke Sini) */}
        <section id="ankasa-career" className="py-24 px-4 bg-white/30 backdrop-blur-sm border-y border-white/50 scroll-mt-16">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Deskripsi Career */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" /> Karier Profesional
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Ankasa Career</h2>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  Gerbang utamamu menuju dunia profesional. Mulai dari manajemen dokumen hingga optimalisasi profil menggunakan AI.
                </p>
                
                <ul className="space-y-4 mt-8">
                  {[
                    { icon: FilePlus2, title: "Pembangun & Analisis CV AI", desc: "Susun CV ATS-Friendly dalam hitungan menit dan dapatkan *feedback* otomatis." },
                    { icon: Search, title: "Portal Lowongan & MBKM", desc: "Akses loker eksklusif dan program magang kampus merdeka." },
                    { icon: Archive, title: "Penyimpanan Arsip Digital", desc: "Jasa pengelolaan dokumen lamaran dan portofolio secara terpusat." }
                  ].map((fitur, idx) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-white/80">
                      <div className="bg-blue-600 text-white p-3 rounded-xl h-fit shadow-md">
                        <fitur.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{fitur.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{fitur.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Functional AI CV Tools Panel */}
              <div className="flex-[1.2] w-full">
                <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6">
                  <Tabs defaultValue="builder" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-auto p-1.5 bg-gray-200/50 backdrop-blur-sm rounded-2xl mb-6">
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

            </div>
          </div>
        </section>

        {/* SECTION 2: ANKASA STUDY (Publikasi Dimasukkan ke Sini) */}
        <section id="ankasa-study" className="py-24 px-4 scroll-mt-16">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-100/80 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4" /> Kebutuhan Akademik
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Ankasa Study</h2>
              <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                Solusi cerdas untuk mempermudah kehidupan kampusmu. Dari penyusunan laporan, desain visual, hingga publikasi karya ilmiah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/80 shadow-sm hover:shadow-md transition-shadow">
                 <BookOpen className="w-10 h-10 text-rose-500 mb-4" />
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Materi & E-Book</h3>
                 <p className="text-sm text-gray-600">Akses ringkasan kuliah dan literatur pendukung untuk mendongkrak nilai IPK-mu.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/80 shadow-sm hover:shadow-md transition-shadow">
                 <PenTool className="w-10 h-10 text-amber-500 mb-4" />
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Jasa Desain</h3>
                 <p className="text-sm text-gray-600">Bantuan visualisasi untuk poster presentasi, lomba, dan *layout* makalah.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/80 shadow-sm hover:shadow-md transition-shadow">
                 <Globe className="w-10 h-10 text-blue-500 mb-4" />
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Info Conference</h3>
                 <p className="text-sm text-gray-600">Jadwal *Call for Papers* seminar nasional dan internasional terbaru.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/80 shadow-sm hover:shadow-md transition-shadow">
                 <Newspaper className="w-10 h-10 text-emerald-500 mb-4" />
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Pembuatan Artikel</h3>
                 <p className="text-sm text-gray-600">Layanan pendampingan penulisan hingga penerbitan artikel populer & akademik.</p>
              </div>
            </div>

            {/* Mitra Publikasi di dalam Ankasa Study */}
            <div className="mt-16 bg-white/40 rounded-[2rem] p-8 border border-white/60 text-center">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-6">Didukung Oleh Mitra Publikasi Resmi</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                 <h4 className="text-2xl font-extrabold font-headline text-gray-800">Publikasi indonesia.id</h4>
                 <h4 className="text-2xl font-extrabold font-headline text-gray-800">readone institut</h4>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ANKASA B2B & EKSEKUTIF */}
        <section id="ankasa-b2b" className="py-24 px-4 bg-gray-900 text-white scroll-mt-16 relative overflow-hidden">
           <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-amber-900/40 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
           <div className="container mx-auto max-w-6xl relative z-10">
             <div className="flex flex-col md:flex-row items-center gap-12">
               
               <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 border border-amber-500/30">
                    <Building2 className="w-4 h-4" /> Solusi B2B
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Layanan Institusi & Komunitas</h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Kami membantu kampus, organisasi, dan lembaga riset untuk mengakselerasi publikasi jurnal dan standarisasi kesiapan karier anggota secara kolektif.
                  </p>
                  <button className="px-8 py-3 bg-amber-500 text-gray-900 font-bold rounded-xl hover:bg-amber-400 transition-colors">
                    Hubungi Tim Kemitraan
                  </button>
               </div>
               
               <div className="flex-1 w-full space-y-4">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex gap-5 items-start">
                     <BookMarked className="w-8 h-8 text-amber-400 shrink-0" />
                     <div>
                       <h3 className="text-xl font-bold mb-2">Fast-Track Jurnal SINTA</h3>
                       <p className="text-gray-400 text-sm leading-relaxed">Jasa pengelolaan dan manajemen *review* jurnal institusi agar terpublikasi dan terindeks SINTA dengan alur yang lebih cepat.</p>
                     </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex gap-5 items-start">
                     <Archive className="w-8 h-8 text-blue-400 shrink-0" />
                     <div>
                       <h3 className="text-xl font-bold mb-2">Pengelolaan CV Massal B2B</h3>
                       <p className="text-gray-400 text-sm leading-relaxed">Penyusunan format, *review* massal, dan arsip dokumen karier untuk program lulusan kampus atau *bootcamp*.</p>
                     </div>
                  </div>
               </div>

             </div>
           </div>
        </section>

        {/* COMPANY SHOWCASE */}
        <section className="py-16 px-4 bg-white/50">
          <div className="container mx-auto max-w-6xl">
             <CompanyShowcase />
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
                 Aksi Nyata Kolektif Meraih Asa. Mendampingi langkah karier dan akademikmu sejak hari pertama kuliah.
               </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
               <h4 className="text-lg font-bold mb-4">Tautan Navigasi</h4>
               <nav className="space-y-3 text-gray-400 font-medium">
                 <a href="/career" className="block hover:text-white transition-colors">Ankasa Career</a>
                 <a href="/study" className="block hover:text-white transition-colors">Ankasa Study</a>
                 <a href="/b2b" className="block hover:text-white transition-colors">Layanan B2B & Institusi</a>
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
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="h-5 w-5" /> <span>+62 821 1234 5678</span>
                </div>
              </div>
            </div>

          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 font-medium flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Ankasa Hub. All rights reserved.</p>
            <p className="text-amber-500/50">Mahasiswa Semarang & Sekitarnya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}