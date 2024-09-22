"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaRegCopy } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


function caesarCipher(str: string, shift: number, decrypt = false) {
  return str
    .split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0)
        const base = code >= 97 ? 97 : 65
        const normalizedShift = (decrypt ? -shift : shift) % 26
        const shiftedCode = ((code - base + normalizedShift + 26) % 26) + base
        return String.fromCharCode(shiftedCode)
      }
      return char
    })
    .join('')
}

export default function CifradoCesar() {
  const [input, setInput] = useState("")
  const [shift, setShift] = useState(3)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleCipher = useCallback((decrypt: boolean) => {
    if (!input.trim()) {
      setError("Por favor, ingrese un mensaje para cifrar/descifrar.")
      return
    }
    if (shift < 0 || shift > 25) {
      setError("El desplazamiento debe estar entre 0 y 25.")
      return
    }
    setOutput(caesarCipher(input, shift, decrypt))
    setError("")
  }, [input, shift])

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
      <Breadcrumb >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cifrado">Cifrado</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cifrado por Transposición</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8">
                Cifrado César
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                En criptografía, el cifrado César, también conocido como cifrado por desplazamiento, código de César o desplazamiento de César, es una de las técnicas de cifrado más simples y más usadas.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué es el código César?</AccordionTrigger>
                <AccordionContent>
                  El cifrado César (o código César) es un cifrado de sustitución monoalfabético, donde cada letra se reemplaza por otra letra ubicada un poco más adelante en el alfabeto (por lo tanto, desplazada pero siempre la misma para un mensaje cifrado determinado).
                  La distancia de cambio se elige mediante un número llamado desplazamiento, que puede ser hacia la derecha (A a B) o hacia la izquierda (B a A).
                  Por cada desplazamiento hacia la derecha (de N), hay un desplazamiento equivalente hacia la izquierda (de 26-N) porque el alfabeto gira sobre sí mismo, por lo que el código César a veces se denomina cifrado de rotación.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo codificar con el cifrado de César?</AccordionTrigger>
                <AccordionContent>
                  El código César es un cifrado basado en un cambio alfabético. El desplazamiento más utilizado es el de 3 letras, de modo que A se convierte en D.<br />
                  <Image src="https://d2swcew5zhhdiz.cloudfront.net/course/dsuh/5gqslZ1S7oxIrwh2sfH3T9/3cedfde07b2f92e7e14b5c2cade0e30c/c3ch3.1_Caesar.svg" width={300} height={200} alt="Ejemplo cifrado César con desplazamiento de 3 letras." className="mx-auto"></Image>
                  Ejemplo: Codifique DCODEX con un desplazamiento de 3.
                  Para codificar D, tome el alfabeto y busque tres letras más: allí está la G. Entonces D se codifica como G.
                  Para codificar X, repite el alfabeto: después de X, está Y, después de Y, está Z y después de Z, hay una A. Entonces X está codificado como A.
                  DCODEX está cifrado como GFRGHA
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Cómo descifrar el cifrado César?</AccordionTrigger>
                <AccordionContent>
                  Al descifrar a César, se sustituye una letra por otra anterior desplazando el alfabeto.

                  Ejemplo: Descifre GFRGHA con un desplazamiento de 3.
                  Para decodificar G, tome el alfabeto y mire tres letras antes: hay D.
                  Para decodificar A, haga un bucle con el alfabeto: antes de A: Z, antes de Z: Y y antes de Y, está X.
                  GFRGHA se descifra como DCODEX.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Cómo reconocer el código César?</AccordionTrigger>
                <AccordionContent>
                  Un mensaje codificado con el cifrado César tiene desplazamientos constantes para cada letra, por lo que su diagrama de análisis de frecuencia está desplazado (en un número de letras igual al desplazamiento).

                  El índice de coincidencia es igual al del texto plano (como para cualquier cifrado de sustitución).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="space-x-4">

            </div>
          </div>
        </div>
      </section>
      <section id="encoder" className="py-6 md:py-12 lg:py-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"></h2>
        <Card className="w-full max-w-2xl mx-auto ">
          <CardHeader>
            <CardTitle>Cifrado César</CardTitle>
            <CardDescription>
              Ingresa el mensaje que quieras cifrar o descifrar, así como la clave (desplazamiento) para llevar a cabo el cifrado o descifrado. Los espacios en blanco no se tomarán en cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caesar-input">Mensaje</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <Input
                        id="caesar-input"
                        placeholder="Ingrese el mensaje"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ingrese el contenido del mensaje a cifrar o descifrar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </div>
              <div className="space-y-2">
                <Label htmlFor="caesar-shift">Desplazamiento (0-25)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <Input
                        id="caesar-shift"
                        type="number"
                        min="0"
                        max="25"
                        value={shift}
                        onChange={(e) => setShift(Number(e.target.value))}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ingrese el desplazamiento para cifrar del mensaje del 0-25</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>


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
      </section>
      <section>
        <div className="mt-4 mx-4">
          <h3 className="font-semibold">Referencias</h3>
          <p>
            Cifrado César en dCode.fr [sitio web en línea], recuperado el 2024-09-22,
            <a href="https://www.dcode.fr/cifrado-cesar" target="_blank" rel="noopener noreferrer">
              https://www.dcode.fr/cifrado-cesar
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
