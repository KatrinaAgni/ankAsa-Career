import { Briefcase, ArrowLeft, Archive, FilePlus2, FileText, Sparkles } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CvBuilder } from "@/components/cv-builder"
import { CvAnalyzer } from "@/components/cv-analyzer"

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>

      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-12 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Briefcase className="w-4 h-4" /> Ankasa Career
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Pusat Karier Profesional</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto md:mx-0">
            Selamat datang di ruang kariermu. Kelola arsip lamaran dan gunakan kecerdasan buatan untuk meracik CV yang dijamin lolos filter ATS perusahaan.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SISI KIRI: Ruang Arsip & Loker */}
          <div className="flex-[0.8] space-y-6">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/80 shadow-sm text-center">
              <Archive className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Manajemen Arsip</h3>
              <p className="text-gray-500 mt-2 mb-6 text-sm">Simpan ijazah, transkrip, dan portofolio digitalmu secara terpusat dan aman.</p>
              <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                Buka Brankas Arsip
              </button>
            </div>

            <div className="bg-blue-600 p-8 rounded-[2rem] shadow-md text-center text-white relative overflow-hidden">
              <Sparkles className="absolute top-4 right-4 w-16 h-16 text-white/10" />
              <h3 className="text-xl font-bold">Portal MBKM & Loker</h3>
              <p className="text-blue-100 mt-2 mb-6 text-sm">Temukan loker dan magang yang paling cocok dengan kualifikasi CV-mu.</p>
              <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
                Eksplorasi Lowongan
              </button>
            </div>
          </div>

          {/* SISI KANAN: AI Tools (Builder & Analyzer) */}
          <div className="flex-[1.2] w-full">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 shadow-md p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Peralatan Karier AI</h2>
                <p className="text-gray-500 text-sm">Gunakan AI untuk membuat atau menganalisis dokumen kerjamu.</p>
              </div>

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
                  <CvBuilder />
                </TabsContent>
                <TabsContent value="analyzer" className="mt-2 outline-none">
                  <CvAnalyzer />
                </TabsContent>
              </Tabs>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}