"use client"

import React, { useState, useCallback } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDropzone } from "react-dropzone"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

import { buildCv, type CvBuilderOutput } from "@ai/flows/cv-builder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PlusCircle, XCircle, Loader2, Download, Image as ImageIcon, FileText, Trash2, Mail, Phone, Linkedin, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const experienceSchema = z.object({
  title: z.string().min(1, "Jabatan harus diisi"),
  company: z.string().min(1, "Perusahaan harus diisi"),
  dates: z.string().min(1, "Tanggal harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
});

const educationSchema = z.object({
  institution: z.string().min(1, "Institusi harus diisi"),
  degree: z.string().min(1, "Gelar harus diisi"),
  dates: z.string().min(1, "Tanggal harus diisi"),
});

const certificationSchema = z.object({
    name: z.string().min(1, "Nama pelatihan harus diisi"),
    organizer: z.string().min(1, "Penyelenggara harus diisi"),
    dates: z.string().min(1, "Tanggal harus diisi"),
});

const cvBuilderSchema = z.object({
  photoDataUri: z.string().optional(),
  name: z.string().min(1, "Nama lengkap harus diisi"),
  email: z.string().email("Alamat email tidak valid"),
  phone: z.string().min(1, "Nomor telepon harus diisi"),
  linkedin: z.string().url("URL tidak valid").optional().or(z.literal('')),
  summary: z.string().min(10, "Ringkasan harus minimal 10 karakter"),
  experience: z.array(experienceSchema).min(1, "Minimal satu pengalaman kerja harus diisi"),
  education: z.array(educationSchema).min(1, "Minimal satu riwayat pendidikan harus diisi"),
  skills: z.string().min(1, "Sebutkan minimal satu keahlian"),
  certifications: z.array(certificationSchema).optional(),
});

type CvBuilderFormValues = z.infer<typeof cvBuilderSchema>

const ProfessionalCvTemplate = React.forwardRef<HTMLDivElement, { cvData: CvBuilderOutput, photo?: string }>(({ cvData, photo }, ref) => {
  return (
    <div ref={ref} className="p-8 bg-white text-gray-800 rounded-lg font-sans w-[210mm] min-h-[297mm]">
      <header className="flex items-center space-x-6 pb-6 border-b-2 border-gray-200">
        {photo && (
          <Image src={photo} alt="CV Photo" width={100} height={100} className="w-24 h-24 rounded-full object-cover border-4 border-gray-200" />
        )}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold text-gray-800">{cvData.name}</h1>
          <div className="flex flex-col space-y-1 mt-2 text-sm text-gray-600">
            <a href={`mailto:${cvData.email}`} className="flex items-center hover:text-blue-600"><Mail className="mr-2 h-4 w-4 flex-shrink-0" /><span>{cvData.email}</span></a>
            <span className="flex items-center"><Phone className="mr-2 h-4 w-4 flex-shrink-0" /><span>{cvData.phone}</span></span>
            {cvData.linkedin && <a href={cvData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600"><Linkedin className="mr-2 h-4 w-4 flex-shrink-0" /><span>LinkedIn Profile</span></a>}
          </div>
        </div>
      </header>
      <main className="mt-6">
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-blue-800 border-b-2 border-gray-200 pb-1 mb-3">Ringkasan Profesional</h2>
          <p className="text-sm leading-relaxed">{cvData.summary}</p>
        </section>
        <section className="mt-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-blue-800 border-b-2 border-gray-200 pb-1 mb-3">Pengalaman Kerja</h2>
          {cvData.experience.map((exp, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{exp.company}</span>
                <span className="font-medium">{exp.dates}</span>
              </div>
              <ul className="text-sm leading-relaxed list-disc pl-5">
                {exp.description.split(';').map(item => item.trim().replace(/^-/, '')).filter(Boolean).map((bullet, i) => (
                   <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="mt-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-blue-800 border-b-2 border-gray-200 pb-1 mb-3">Pendidikan</h2>
          {cvData.education.map((edu, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{edu.institution}</span>
                <span className="font-medium">{edu.dates}</span>
              </div>
            </div>
          ))}
        </section>
        {cvData.certifications && cvData.certifications.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-blue-800 border-b-2 border-gray-200 pb-1 mb-3">Pelatihan & Sertifikasi</h2>
            {cvData.certifications.map((cert, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-800">{cert.name}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{cert.organizer}</span>
                  <span className="font-medium">{cert.dates}</span>
                </div>
              </div>
            ))}
          </section>
        )}
        <section className="mt-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-blue-800 border-b-2 border-gray-200 pb-1 mb-3">Keahlian</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
});
ProfessionalCvTemplate.displayName = "ProfessionalCvTemplate";


export function CvBuilder() {
  const [generatedCv, setGeneratedCv] = useState<CvBuilderOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const { toast } = useToast()
  const cvPreviewRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<CvBuilderFormValues>({
    resolver: zodResolver(cvBuilderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      summary: "",
      experience: [{ title: "", company: "", dates: "", description: "" }],
      education: [{ institution: "", degree: "", dates: "" }],
      skills: "",
      certifications: [],
    },
  })

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control: form.control,
    name: "experience",
  })

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control: form.control,
    name: "education",
  })
  
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({
      control: form.control,
      name: "certifications",
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setPhotoPreview(dataUri);
        form.setValue("photoDataUri", dataUri);
      };
      reader.readAsDataURL(file);
    }
  }, [form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false,
  });

  const removePhoto = () => {
    setPhotoPreview(null);
    form.setValue("photoDataUri", undefined);
  }

  async function onSubmit(data: CvBuilderFormValues) {
    setIsLoading(true)
    setGeneratedCv(null)

    const submissionData = {
      ...data,
      skills: data.skills.split(',').map(s => s.trim()).filter(Boolean),
    }

    try {
      const result = await buildCv(submissionData)
      setGeneratedCv(result)
      toast({ title: "CV Berhasil Dibuat!", description: "CV profesional Anda telah siap diunduh." })
    } catch (error) {
      console.error(error)
      toast({ title: "Error", description: "Gagal membuat CV. Silakan coba lagi.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPdf = async () => {
    if (!generatedCv) {
      toast({ title: "Error", description: "Tidak ada CV untuk diunduh.", variant: "destructive" });
      return;
    }

    const toastId = toast({
      title: 'Mempersiapkan PDF...',
      description: 'Harap tunggu sementara kami membuat file Anda.',
    }).id;

    const printableElement = document.createElement('div');
    document.body.appendChild(printableElement);

    // Render the component to the new div
    const root = (await import('react-dom/client')).createRoot(printableElement);
    
    // We need to wait for the component to render before we can take a screenshot
    // Using a promise to ensure react has rendered the component.
    await new Promise<void>((resolve) => {
      root.render(
         <ProfessionalCvTemplate cvData={generatedCv} photo={photoPreview || undefined} ref={cvPreviewRef} />
      );
      // A short timeout to allow images and fonts to load before capturing.
      setTimeout(resolve, 500); 
    });

    const cvElement = cvPreviewRef.current;
    if (!cvElement) {
        toast({ title: "Error", description: "Gagal membuat elemen CV untuk PDF.", variant: "destructive" });
        root.unmount();
        document.body.removeChild(printableElement);
        return;
    }
    
    cvElement.style.position = 'absolute';
    cvElement.style.left = '-9999px';
    cvElement.style.top = '-9999px';

    try {
      const canvas = await html2canvas(cvElement, {
        scale: 2, 
        useCORS: true,
        logging: false, 
        width: cvElement.offsetWidth,
        height: cvElement.offsetHeight,
        windowWidth: cvElement.scrollWidth,
        windowHeight: cvElement.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("cv-profesional.pdf");

      toast({title: "CV Diunduh!", description: "CV Anda telah diunduh sebagai PDF." });
    } catch (error) {
       console.error("PDF generation failed:", error);
       toast({ title: "Gagal Mengunduh", description: "Terjadi kesalahan saat membuat PDF.", variant: "destructive" });
    } finally {
       // Cleanup
       root.unmount();
       if (printableElement.parentNode) {
         printableElement.parentNode.removeChild(printableElement);
       }
    }
  };


  return (
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline tracking-tight lg:text-4xl">Pembuat CV dengan AI</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Isi detail Anda di bawah ini, dan AI kami akan membuatkan CV profesional untuk Anda dalam hitungan detik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Anda</CardTitle>
            <CardDescription>Berikan detail untuk CV baru Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <Card className="bg-background/50">
                   <CardHeader><CardTitle className="text-lg font-headline">Foto Profil</CardTitle></CardHeader>
                   <CardContent>
                     <FormField
                        control={form.control}
                        name="photoDataUri"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div>
                                {photoPreview ? (
                                    <div className="relative w-32 h-32">
                                        <Image src={photoPreview} alt="Pratinjau foto" className="rounded-full object-cover w-32 h-32" width={128} height={128} />
                                        <Button type="button" variant="destructive" size="icon" className="absolute top-0 right-0 h-8 w-8 rounded-full" onClick={removePhoto}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                  <div {...getRootProps()} className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                                    <input {...getInputProps()} />
                                    <ImageIcon className={`h-12 w-12 mb-4 ${isDragActive ? "text-primary": "text-muted-foreground"}`} />
                                    <p className="text-center text-sm font-semibold">
                                      {isDragActive ? "Jatuhkan foto di sini..." : "Seret & jatuhkan foto Anda di sini, atau klik"}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG (maks. 2MB)</p>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                   </CardContent>
                </Card>

                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-lg font-headline">Detail Pribadi</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <FormField name="name" control={form.control} render={({ field }) => <FormItem><FormLabel>Nama Lengkap</FormLabel><FormControl><Input placeholder="Budi Santoso" {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField name="email" control={form.control} render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="budi.santoso@example.com" {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField name="phone" control={form.control} render={({ field }) => <FormItem><FormLabel>Telepon</FormLabel><FormControl><Input placeholder="+62 812 3456 7890" {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField name="linkedin" control={form.control} render={({ field }) => <FormItem><FormLabel>Profil LinkedIn (Opsional)</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/budisantoso" {...field} /></FormControl><FormMessage /></FormItem>} />
                  </CardContent>
                </Card>

                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-lg font-headline">Ringkasan Profesional</CardTitle></CardHeader>
                  <CardContent>
                    <FormField name="summary" control={form.control} render={({ field }) => <FormItem><FormControl><Textarea placeholder="Ringkasan singkat profesional..." {...field} /></FormControl><FormMessage /></FormItem>} />
                  </CardContent>
                </Card>

                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-lg font-headline">Pengalaman Kerja</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {expFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg relative space-y-2">
                        <FormField name={`experience.${index}.title`} control={form.control} render={({ field }) => <FormItem><FormLabel>Jabatan</FormLabel><FormControl><Input placeholder="Pengembang Senior" {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`experience.${index}.company`} control={form.control} render={({ field }) => <FormItem><FormLabel>Perusahaan</FormLabel><FormControl><Input placeholder="PT Teknologi Maju" {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`experience.${index}.dates`} control={form.control} render={({ field }) => <FormItem><FormLabel>Tanggal</FormLabel><FormControl><Input placeholder="Jan 2020 - Sekarang" {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`experience.${index}.description`} control={form.control} render={({ field }) => <FormItem><FormLabel>Deskripsi</FormLabel><FormControl><Textarea placeholder="Tanggung jawab dan pencapaian..." {...field} /></FormControl><FormMessage /></FormItem>} />
                        {expFields.length > 1 && <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeExp(index)}><XCircle /></Button>}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ title: "", company: "", dates: "", description: "" })}><PlusCircle className="mr-2 h-4 w-4" /> Tambah Pengalaman</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-lg font-headline">Pendidikan</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {eduFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg relative space-y-2">
                        <FormField name={`education.${index}.institution`} control={form.control} render={({ field }) => <FormItem><FormLabel>Institusi</FormLabel><FormControl><Input placeholder="Universitas Teknologi" {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`education.${index}.degree`} control={form.control} render={({ field }) => <FormItem><FormLabel>Gelar</FormLabel><FormControl><Input placeholder="S.Kom. Ilmu Komputer" {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name={`education.${index}.dates`} control={form.control} render={({ field }) => <FormItem><FormLabel>Tanggal</FormLabel><FormControl><Input placeholder="Sep 2016 - Jun 2020" {...field} /></FormControl><FormMessage /></FormItem>} />
                        {eduFields.length > 1 && <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeEdu(index)}><XCircle /></Button>}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ institution: "", degree: "", dates: "" })}><PlusCircle className="mr-2 h-4 w-4" /> Tambah Pendidikan</Button>
                  </CardContent>
                </Card>

                <Card className="bg-background/50">
                    <CardHeader><CardTitle className="text-lg font-headline flex items-center"><Award className="mr-2 h-5 w-5" /> Pelatihan & Sertifikasi (Opsional)</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {certFields.map((field, index) => (
                            <div key={field.id} className="p-4 border rounded-lg relative space-y-2">
                                <FormField name={`certifications.${index}.name`} control={form.control} render={({ field }) => <FormItem><FormLabel>Nama Pelatihan/Sertifikasi</FormLabel><FormControl><Input placeholder="Certified React Developer" {...field} /></FormControl><FormMessage /></FormItem>} />
                                <FormField name={`certifications.${index}.organizer`} control={form.control} render={({ field }) => <FormItem><FormLabel>Penyelenggara</FormLabel><FormControl><Input placeholder="React Org" {...field} /></FormControl><FormMessage /></FormItem>} />
                                <FormField name={`certifications.${index}.dates`} control={form.control} render={({ field }) => <FormItem><FormLabel>Tanggal</FormLabel><FormControl><Input placeholder="Agu 2023" {...field} /></FormControl><FormMessage /></FormItem>} />
                                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeCert(index)}><XCircle /></Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendCert({ name: "", organizer: "", dates: "" })}><PlusCircle className="mr-2 h-4 w-4" /> Tambah Sertifikasi</Button>
                    </CardContent>
                </Card>

                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-lg font-headline">Keahlian</CardTitle></CardHeader>
                  <CardContent>
                    <FormField name="skills" control={form.control} render={({ field }) => <FormItem><FormLabel>Keahlian</FormLabel><FormControl><Textarea placeholder="JavaScript, React, Node.js, Python..." {...field} /></FormControl><FormDescription>Pisahkan keahlian dengan koma.</FormDescription><FormMessage /></FormItem>} />
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Membuat...</> : "Buat CV Saya"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:sticky top-24">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Pratinjau CV</CardTitle>
                    <CardDescription>CV Anda akan muncul di sini.</CardDescription>
                </div>
                {generatedCv && (
                    <Button variant="outline" size="sm" onClick={handleDownloadPdf} disabled={isLoading}>
                        <Download className="mr-2 h-4 w-4" />
                        Unduh PDF
                    </Button>
                )}
            </CardHeader>
            <CardContent>
              {isLoading && (
                 <div className="flex flex-col items-center justify-center text-center p-8 h-96">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-lg font-semibold">Membuat CV Anda...</p>
                 </div>
              )}
              {!isLoading && !generatedCv && (
                <div className="flex flex-col items-center justify-center h-96 text-muted-foreground text-center p-4">
                  <FileText className="h-16 w-16 mb-4" />
                  <p>Isi formulir dan klik "Buat CV Saya" untuk melihat hasilnya.</p>
                </div>
              )}
              {generatedCv && (
                <div className="bg-gray-200 p-4 rounded-lg max-h-[70vh] overflow-auto">
                    <div className="transform scale-[0.5] origin-top">
                        <ProfessionalCvTemplate cvData={generatedCv} photo={photoPreview || undefined} />
                    </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
