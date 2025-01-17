"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Breadcrumbs from "@/components/pagina/breadcrums"
import { FaRegCopy } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
const Blowfish = require('javascript-blowfish');

const HelpTooltip = ({ content }: { content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 ml-1 inline-block" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)
export default function CifradoBlowfish() {
  const [input, setInput] = useState("")
  const [key, setKey] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [encryptedMessage, setEncryptedMessage] = useState("")
  const [encryptionKey, setEncryptionKey] = useState("")
  const { toast } = useToast()
  const handleCipher = (decrypt: boolean) => {
    try {
      if (!input) throw new Error("Por favor, ingrese un mensaje para cifrar/descifrar.")
      if (!key) throw new Error("Por favor, ingrese una clave para el cifrado Blowfish.")

      // Usamos la librería de Blowfish para cifrado real
      const bf = new Blowfish(key);

      if (decrypt) {
        if (key !== encryptionKey) throw new Error("Clave inválida para el descifrado.")
        const decrypted = bf.decrypt(bf.base64Decode(input));  // Descifrado
        setOutput(decrypted);
      } else {
        const encrypted = bf.encrypt(input);  // Cifrado
        let encryptedMime = bf.base64Encode(encrypted);
        setOutput(encryptedMime);
        setEncryptedMessage(encryptedMime);
        setEncryptionKey(key);
      }

      setError(""); // Limpiar errores si el proceso fue exitoso
    } catch (err: any) {
      setError(err.message);
    }
  }

  const toggleShowKey = () => {
    setShowKey(!showKey)
  }
  const handleCopy = () => {
    if (output) {
      toast({
        title: "¡Texto copiado!",
        description: "El texto ha sido copiado al portapapeles.",
      })
      navigator.clipboard.writeText(output)
    }
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
            <br />Este simulador fue hecho para demostrar el funcionamiento de este cifrado, sin utilizar librerias adicionales o guardando información sobre las claves utilizadas, por lo que puede haber fallas al descifrar más de un mensaje a la vez.
            <br />Para utilizarlo simplemente ingrese el mensaje que quiera cifrar/descifrar y su respectiva clave.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blowfish-input">
                Mensaje
                <HelpTooltip content="Ingrese el texto que desea cifrar o descifrar usando el algoritmo Blowfish." />
              </Label>
              <Input
                id="blowfish-input"
                placeholder="Ingrese el mensaje"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="blowfish-key">
                Clave Blowfish
                <HelpTooltip content="Ingrese la clave para el cifrado o descifrado. La misma clave se usa para ambos procesos." />
              </Label>
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
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Resultado:</p>
                    <p className="break-all">{output}</p>
                  </div>
                  <Button variant="ghost" onClick={() => handleCopy()}>
                    <FaRegCopy className="text-xl" />
                  </Button>
                </div>
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
