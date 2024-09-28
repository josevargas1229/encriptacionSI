"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

function simulatedBlowfish(str: string, key: string, decrypt = false): string {
  const keySum = key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)

  return str
    .split('')
    .map(char => {
      const code = char.charCodeAt(0)
      const shift = decrypt ? -keySum : keySum
      return String.fromCharCode((code + shift + 65536) % 65536)
    })
    .join('')
}

export default function CifradoBlowfish() {
  const [input, setInput] = useState("")
  const [key, setKey] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [encryptedMessage, setEncryptedMessage] = useState("")
  const [encryptionKey, setEncryptionKey] = useState("")

  const handleCipher = (decrypt: boolean) => {
    try {
      if (!input) throw new Error("Por favor, ingrese un mensaje para cifrar/descifrar.")
      if (!key) throw new Error("Por favor, ingrese una clave para el cifrado Blowfish.")

      if (decrypt) {
        if (key !== encryptionKey) throw new Error("Clave inválida para el descifrado.")
        const result = simulatedBlowfish(input, key, true)
        setOutput(result)
        setError("")
      } else {
        const result = simulatedBlowfish(input, key, false)
        setOutput(result)
        setEncryptedMessage(result)
        setEncryptionKey(key)
        setError("")
      }
    } catch (err:any) {
      setError(err.message)
    }
  }

  const toggleShowKey = () => {
    setShowKey(!showKey)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Cifrado Blowfish (Simulado)</CardTitle>
        <CardDescription>
          Blowfish es un cifrado de bloque simétrico diseñado por Bruce Schneier. 
          Esta es una simulación simplificada para fines educativos y no debe usarse 
          para seguridad real.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="blowfish-input">Mensaje</Label>
            <Input
              id="blowfish-input"
              placeholder="Ingrese el mensaje"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="blowfish-key">Clave Blowfish</Label>
            <Input
              id="blowfish-key"
              placeholder="Ingrese la clave"
              type={showKey ? "text" : "password"}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-2 right-3 flex items-center justify-center h-full"
              onClick={toggleShowKey}
            >
              {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleCipher(false)}>Cifrar</Button>
            <Button onClick={() => handleCipher(true)}>Descifrar</Button>
          </div>
          {output && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
              <p className="font-medium">Resultado:</p>
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
