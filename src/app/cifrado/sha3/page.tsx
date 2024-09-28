"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CryptoJS from "crypto-js"

export default function SHA3Hash() {
  const [input, setInput] = useState("")
  const [variant, setVariant] = useState("SHA3-256")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  
  const handleHash = () => {
    try {
      if (!input) throw new Error("Por favor, ingrese un mensaje para generar el hash.")

      let hash
      switch (variant) {
        case "SHA3-224":
          hash = CryptoJS.SHA3(input, { outputLength: 224 }).toString()
          break
        case "SHA3-256":
          hash = CryptoJS.SHA3(input, { outputLength: 256 }).toString()
          break
        case "SHA3-384":
          hash = CryptoJS.SHA3(input, { outputLength: 384 }).toString()
          break
        case "SHA3-512":
          hash = CryptoJS.SHA3(input, { outputLength: 512 }).toString()
          break
        default:
          throw new Error("Variante SHA-3 no válida.")
      }

      setOutput(hash)
      setError("")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>SHA-3 (Secure Hash Algorithm 3)</CardTitle>
        <CardDescription>
          SHA-3 es la última versión de la familia de funciones hash criptográficas SHA. 
          Ofrece varias variantes con diferentes longitudes de salida, proporcionando 
          un alto nivel de seguridad para diversas aplicaciones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sha3-input">Mensaje</Label>
            <Input
              id="sha3-input"
              placeholder="Ingrese el mensaje"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sha3-variant">Variante de SHA-3</Label>
            <Select value={variant} onValueChange={setVariant}>
              <SelectTrigger id="sha3-variant">
                <SelectValue placeholder="Seleccione una variante" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHA3-224">SHA3-224</SelectItem>
                <SelectItem value="SHA3-256">SHA3-256</SelectItem>
                <SelectItem value="SHA3-384">SHA3-384</SelectItem>
                <SelectItem value="SHA3-512">SHA3-512</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleHash}>Generar Hash</Button>
          {output && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
              <p className="font-medium">Resultado ({variant}):</p>
              <p className="break-all">{output}</p>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
