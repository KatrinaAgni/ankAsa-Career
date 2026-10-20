import { CompanyShowcase } from "@/components/company-showcase"
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
  Phone,
  ChevronDown,
  Search,
  LayoutTemplate,
  User,
  LogIn,
  MessageCircle
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col overflow-hidden font-sans scroll-smooth">
      
      {/* AMBIENT BACKGROUND BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E8E0D5] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-5%] w-[40vw] h-[40vw] bg-[#D6C5B3] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-[#F4EBE1] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>

      {/* HEADER - Menu Bar Lengkap Sesuai Permintaan */}
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-3 group">
            {/* LOGO KIRI ATAS */}
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
          </Link>
          
          <nav className="hidden md:flex gap-6 text-sm font-bold text-gray-600 items-center">
            <Link href="/" className="text-gray-900 transition-colors">Home</Link>
            <Link href="/tentang" className="hover:text-gray-900 transition-colors">Tentang Kami</Link>
            <Link href="/study" className="hover:text-gray-900 transition-colors">Ankasa Study</Link>
            <Link href="/career" className="hover:text-gray-900 transition-colors">Ankasa Career</Link>
            <Link href="/harga" className="hover:text-gray-900 transition-colors">Harga</Link>
            <Link href="/profil" className="hover:text-gray-900 transition-colors flex items-center gap-1"><User className="w-4 h-4"/> Profil</Link>
            
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            
            <Link href="/login" className="flex items-center gap-1 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-sm"><LogIn className="w-4 h-4"/> Masuk</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow relative z-10">
        
        {/* HERO SECTION - Kotak besar dihapus, diganti Logo */}
        <section className="relative py-20 md:py-32 px-4" id="home">
          <div className="container mx-auto max-w-5xl text-center flex flex-col items-center">
            
            {/* Tempat Logo Gambar Kamu (Menggantikan Kotak Besar ankasa.jpg) */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 rounded-3xl shadow-xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              {/* Jika sudah punya file gambar logo, masukkan ke folder public (misal public/logo.png) dan hapus tanda komentar di bawah ini: */}
              {/* <Image src="/logo.png" alt="Logo Ankasa" fill className="object-cover" /> */}
              <div className="text-4xl font-black text-gray-900">A</div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-sm font-semibold text-gray-700 mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Satu Platform untuk Edukasi & Karier</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tight text-gray-900 mb-6 leading-tight">
              Aksi Nyata Kolektif <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-[#8B7355]">Meraih Asa</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Platform digital terdepan yang mendampingi mahasiswa Indonesia melintasi orbit pertumbuhannya dari bangku kuliah hingga siap bersinar di dunia kerja.
            </p>
          </div>
        </section>

        {/* SECTION: ANKASA CAREER (Tidak diubah, tetap keren seperti aslimu) */}
        <section id="ankasa-career" className="py-24 px-4 bg-white/30 backdrop-blur-sm border-y border-white/50 scroll-mt-16">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              
              {/* Kiri: Deskripsi & Fitur */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" /> Karier Profesional
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Ankasa Career</h2>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  Gerbang utamamu menuju dunia profesional. Kami menyediakan ekosistem lengkap untuk mempersiapkan dirimu memenangkan rekrutmen di perusahaan impian.
                </p>
                
                <ul className="space-y-4 mt-8">
                  {[
                    { icon: Search, title: "Portal Lowongan Kerja & MBKM", desc: "Akses ribuan loker dan program magang kampus merdeka gratis." },
                    { icon: FilePlus2, title: "Pembangun CV berbasis AI", desc: "Buat CV ATS-Friendly dalam hitungan menit dengan panduan cerdas." },
                    { icon: Globe, title: "Manajemen Portofolio Digital", desc: "Pamerkan hasil karyamu dalam etalase digital yang elegan dan profesional." }
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

              {/* Kanan: Mockup UI Panel */}
              <div className="flex-1 w-full max-w-md relative">
                <div className="absolute inset-0 bg-blue-200 blur-[80px] opacity-40 rounded-full"></div>
                <div className="relative bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">Rekomendasi Magang</h3>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Terbaru</span>
                  </div>
                  
                  {/* Dummy Job Cards */}
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">X</div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Fullstack Developer (Laravel & Next.js)</h4>
                        <p className="text-xs text-gray-500 mt-1">TechCorp Indo • Jakarta (Hybrid)</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">MBKM</span>
                          <span className="text-[10px] bg-green-100 px-2 py-1 rounded text-green-700">Cocok dengan CV-mu</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">F</div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Mobile App Intern (Flutter/Dart)</h4>
                        <p className="text-xs text-gray-500 mt-1">CreativeStudio • Remote</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">Magang</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/career" className="block w-full mt-6 py-3 bg-gray-900 text-white text-center rounded-xl text-sm font-bold shadow-md hover:bg-gray-800 transition-colors">
                    Eksplorasi Portal Karier
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: ANKASA STUDY (Tidak diubah, tetap keren seperti aslimu) */}
        <section id="ankasa-study" className="py-24 px-4 scroll-mt-16">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12">
              
              {/* Kiri: Mockup UI Panel */}
              <div className="flex-1 w-full max-w-md relative">
                <div className="absolute inset-0 bg-rose-200 blur-[80px] opacity-40 rounded-full"></div>
                <div className="relative bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">Katalog Edukasi & Template</h3>
                    <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Populer</span>
                  </div>
                  
                  {/* Dummy Study Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer text-center group">
                      <div className="w-12 h-12 mx-auto bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <PenTool className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-xs line-clamp-2">Template Proposal PKM (IoT & Smart Device)</h4>
                      <p className="text-[10px] font-bold text-amber-600 mt-2">Rp 25.000</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer text-center group">
                      <div className="w-12 h-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <LayoutTemplate className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-xs line-clamp-2">Desain Poster Presentasi Bhs. Inggris</h4>
                      <p className="text-[10px] font-bold text-emerald-600 mt-2">Tersedia (Jasa)</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">E-Book: Logika Pemrograman</h4>
                      <p className="text-[10px] text-gray-500">Oleh Tim Ankasa • 120 Halaman</p>
                    </div>
                  </div>
                  
                  <Link href="/study" className="block w-full mt-6 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white text-center rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
                    Buka Dasbor Akademik
                  </Link>
                </div>
              </div>

              {/* Kanan: Deskripsi & Fitur */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-100/80 text-rose-800 text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" /> Kebutuhan Akademik
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Ankasa Study</h2>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  Solusi cerdas untuk mempermudah kehidupan kampusmu. Dari penyusunan laporan, visualisasi data, hingga materi perkuliahan terpadu.
                </p>
                
                <ul className="space-y-4 mt-8">
                  {[
                    { icon: BookOpen, title: "Rangkuman Materi & E-Book", desc: "Akses ratusan modul belajar berformat ringkas (Tersedia opsi Freemium)." },
                    { icon: PenTool, title: "Jasa Desain Profesional", desc: "Pemesanan desain poster presentasi, seminar, lomba, hingga makalah." },
                    { icon: LayoutTemplate, title: "Template Dokumen Proyek", desc: "Unduh template laporan, proposal kegiatan, dan presentasi siap pakai." }
                  ].map((fitur, idx) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-white/80">
                      <div className="bg-rose-600 text-white p-3 rounded-xl h-fit shadow-md">
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

            </div>
          </div>
        </section>

        {/* COMPANY SHOWCASE */}
        <section className="py-16 px-4 bg-gray-50/50">
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
                 <Link href="/career" className="block hover:text-white transition-colors">Ankasa Career</Link>
                 <Link href="/study" className="block hover:text-white transition-colors">Ankasa Study</Link>
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
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 font-medium">
            <p>&copy; {new Date().getFullYear()} Ankasa Hub. Aksi Nyata Kolektif Meraih Asa.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WA BOT BUTTON */}
      <a 
        href="https://wa.me/6282112345678?text=Halo%20Admin%20Ankasa%20Hub,%20saya%20ingin%20bertanya%20mengenai%20layanan%20platform%20ini." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50 flex items-center justify-center group"
      >
         <MessageCircle className="w-7 h-7" />
         <span className="absolute right-16 bg-white text-gray-800 text-xs font-bold px-3 py-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
           Chat Bot WhatsApp (Auto-Reply)
         </span>
      </a>
    </div>
  )
}