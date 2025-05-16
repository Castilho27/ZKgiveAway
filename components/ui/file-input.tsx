"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, FileIcon, ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: File[]
  onChange?: (files: File[]) => void
  onError?: (error: string) => void
  maxFiles?: number
  maxSize?: number // in MB
  accept?: string
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, value = [], onChange, onError, maxFiles = 5, maxSize = 5, accept, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [files, setFiles] = React.useState<File[]>(value)
    const [dragActive, setDragActive] = React.useState(false)

    const handleChange = (newFiles: FileList | null) => {
      if (!newFiles?.length) return

      const validFiles: File[] = []
      const invalidFiles: string[] = []

      Array.from(newFiles).forEach((file) => {
        // Check file type
        if (accept) {
          const acceptedTypes = accept.split(",").map((type) => type.trim())
          const fileType = file.type
          const isValidType = acceptedTypes.some((type) => {
            if (type.startsWith(".")) {
              // Check file extension
              return file.name.toLowerCase().endsWith(type.toLowerCase())
            }
            return fileType.match(new RegExp(type.replace("*", ".*")))
          })

          if (!isValidType) {
            invalidFiles.push(`${file.name} (tipo de arquivo não permitido)`)
            return
          }
        }

        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          invalidFiles.push(`${file.name} (tamanho excede ${maxSize}MB)`)
          return
        }

        validFiles.push(file)
      })

      if (invalidFiles.length > 0 && onError) {
        onError(`Arquivos inválidos: ${invalidFiles.join(", ")}`)
      }

      if (validFiles.length > 0) {
        const newFileList = [...files, ...validFiles].slice(0, maxFiles)
        setFiles(newFileList)
        onChange?.(newFileList)
      }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleChange(e.dataTransfer.files)
    }

    const removeFile = (index: number) => {
      const newFiles = [...files]
      newFiles.splice(index, 1)
      setFiles(newFiles)
      onChange?.(newFiles)
    }

    const handleClick = () => {
      inputRef.current?.click()
    }

    const getFileIcon = (file: File) => {
      if (file.type.startsWith("image/")) {
        return <ImageIcon className="h-4 w-4" />
      }
      return <FileIcon className="h-4 w-4" />
    }

    return (
      <div className={cn("space-y-2", className)}>
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center",
            dragActive ? "border-[#FFCC33] bg-[#FFCC33]/10" : "border-input",
            files.length >= maxFiles ? "opacity-50" : "",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={files.length >= maxFiles ? undefined : handleClick}
        >
          <input
            type="file"
            ref={(el) => {
              // Handle both refs
              if (ref) {
                if (typeof ref === "function") {
                  ref(el)
                } else {
                  ref.current = el
                }
              }
              inputRef.current = el
            }}
            className="hidden"
            onChange={(e) => handleChange(e.target.files)}
            multiple={maxFiles > 1}
            disabled={files.length >= maxFiles}
            {...props}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#FFCC33]/10 p-3 rounded-full">
              <Upload className="h-6 w-6 text-[#FFCC33]" />
            </div>
            <div className="text-sm font-medium">
              {files.length >= maxFiles ? (
                <span className="text-muted-foreground">Número máximo de arquivos atingido</span>
              ) : (
                <>
                  <span className="font-semibold text-[#FFCC33]">Clique para fazer upload</span> ou arraste e solte
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              PNG ou PDF (máx. {maxSize}MB por arquivo, máx. {maxFiles} arquivos)
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">Arquivos anexados:</p>
            <div className="space-y-2">
              {files.map((file, i) => (
                <div
                  key={`${file.name}-${i}`}
                  className="flex items-center justify-between rounded-xl border border-border bg-background p-3"
                >
                  <div className="flex items-center gap-2 text-sm">
                    {getFileIcon(file)}
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)}MB</span>
                  </div>
                  <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeFile(i)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remover arquivo</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
)

FileInput.displayName = "FileInput"
