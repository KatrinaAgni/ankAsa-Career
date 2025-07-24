"use client"

import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { analyzeCV, type AnalyzeCVOutput } from "@ai/flows/cv-analyzer"
import { UploadCloud, FileText, Loader2, ThumbsUp, ThumbsDown, Lightbulb, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export function CvAnalyzer() {
  const [analysis, setAnalysis] = useState<AnalyzeCVOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const { toast } = useToast()

  const handleAnalysis = useCallback(async (file: File) => {
    if (!file) {
      toast({ title: "Tidak ada file yang dipilih", description: "Silakan pilih file PDF.", variant: "destructive" })
      return
    }

    setFileName(file.name)
    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      try {
        const cvPdfDataUri = reader.result as string
        const result = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cvPdfDataUri })
        }).then(res => res.json());
        setAnalysis(result)
        toast({ title: "Analisis Selesai", description: "CV Anda telah berhasil dianalisis." })
      } catch (e) {
        setError("Terjadi kesalahan saat analisis. Model AI mungkin kelebihan beban. Silakan coba lagi nanti.")
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    reader.onerror = () => {
      setError("Gagal membaca file.")
      toast({ title: "Kesalahan Membaca File", description: "Tidak dapat membaca file yang dipilih.", variant: "destructive" })
      setIsLoading(false)
    }
  }, [toast])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleAnalysis(acceptedFiles[0])
    }
  }, [handleAnalysis])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
  })

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline tracking-tight lg:text-4xl">Penganalisis CV dengan AI</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Unggah CV Anda dalam format PDF untuk menerima umpan balik instan mengenai kekuatan, kelemahan, dan area untuk perbaikan.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
          >
            <input {...getInputProps()} />
            <UploadCloud className={`h-12 w-12 mb-4 ${isDragActive ? "text-primary": "text-muted-foreground"}`} />
            <p className="text-center text-lg font-semibold">
              {isDragActive ? "Jatuhkan file di sini..." : "Drag & drop CV Anda di sini, atau klik untuk memilih file"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Hanya format PDF, maksimal 10MB</p>
            {fileName && !isLoading && (
              <div className="mt-4 flex items-center text-sm text-foreground">
                <FileText className="h-4 w-4 mr-2" />
                <span>{fileName}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-semibold">Menganalisis CV Anda...</p>
          <p className="text-muted-foreground">Ini mungkin memakan waktu beberapa saat. Mohon tunggu.</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Analisis Gagal</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-headline text-center">Hasil Analisis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-500/50 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <ThumbsUp className="mr-2 h-6 w-6" />
                  Kekuatan
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-900">
                <p>{analysis.strengths}</p>
              </CardContent>
            </Card>
            <Card className="border-red-500/50 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <ThumbsDown className="mr-2 h-6 w-6" />
                  Kelemahan
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-red-900">
                <p>{analysis.weaknesses}</p>
              </CardContent>
            </Card>
            <Card className="border-blue-500/50 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Lightbulb className="mr-2 h-6 w-6" />
                  Saran
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-900">
                <p>{analysis.suggestions}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </section>
  )
}
