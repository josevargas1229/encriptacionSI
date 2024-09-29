"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Breadcrumbs from "@/components/pagina/breadcrums"

// Simulación básica del cifrado Blowfish
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
    } catch (err: any) {
      setError(err.message)
    }
  }

  const toggleShowKey = () => {
    setShowKey(!showKey)
  }

  return (
    <div>
      <div className="ml-4">
        <Breadcrumbs />
      </div>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8">
                Cifrado Blowfish
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Blowfish es un algoritmo de cifrado simétrico diseñado para una alta velocidad y seguridad. 
                Esta es una simulación simplificada con fines educativos.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué es el cifrado Blowfish?</AccordionTrigger>
                <AccordionContent>
                  Blowfish es un cifrado de bloque simétrico creado por Bruce Schneier en 1993. Es rápido y seguro, con un tamaño de bloque de 64 bits y longitudes de clave que pueden variar de 32 a 448 bits. Este cifrado es ampliamente utilizado en software de seguridad y cifrado de datos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo funciona Blowfish?</AccordionTrigger>
                <AccordionContent>
                  Blowfish funciona dividiendo el mensaje en bloques de datos de 64 bits y aplicando una serie de transformaciones y sustituciones controladas por la clave. La misma clave se utiliza tanto para cifrar como para descifrar los datos, lo que hace que sea un cifrado simétrico.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="space-x-4">
            </div>
          </div>
        </div>
      </section>

      <section id="encoder" className="py-6 md:py-12 lg:py-16"></section>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Cifrado Blowfish (Simulado)</CardTitle>
          <CardDescription>
            Esta es una simulación educativa de Blowfish. No debe usarse para propósitos de seguridad real.
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

      <section>
        <div className="mt-4 mx-4">
          <h3 className="font-semibold">Referencias</h3>
          <p>
            Schneier, B. (1993). Blowfish. En <em>Applied Cryptography</em>. Wiley.
          </p>
        </div>
      </section>
    </div>
  )
}
