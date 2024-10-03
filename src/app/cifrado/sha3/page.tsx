"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CryptoJS from "crypto-js"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Breadcrumbs from "@/components/pagina/breadcrums"
import { HelpCircle } from "lucide-react"
import { FaRegCopy } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"

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
export default function SHA3Hash() {
  const [input, setInput] = useState("")
  const [variant, setVariant] = useState("SHA3-256")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const { toast } = useToast()
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
                Algoritmo SHA-3 (Secure Hash Algorithm 3)
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                El SHA-3 es la última versión de la familia de funciones hash criptográficas SHA, diseñada para proporcionar un mayor nivel de seguridad con variantes que ofrecen diferentes longitudes de salida.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué es SHA-3?</AccordionTrigger>
                <AccordionContent>
                  SHA-3 es una familia de funciones hash criptográficas estándar desarrolladas por NIST. Se basa en el algoritmo Keccak y proporciona una alternativa a las versiones anteriores de SHA, como SHA-1 y SHA-2, mejorando la seguridad y resistencia ante ciertos ataques.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo funciona SHA-3?</AccordionTrigger>
                <AccordionContent>
                  SHA-3 utiliza una estructura de esponja, donde el mensaje de entrada se absorbe en un estado y luego se "exprime" para producir una salida hash. Sus variantes incluyen SHA3-224, SHA3-256, SHA3-384, y SHA3-512, con diferentes tamaños de salida en bits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Aplicaciones de SHA-3</AccordionTrigger>
                <AccordionContent>
                  SHA-3 se utiliza en diversas áreas, como la generación de firmas digitales, la verificación de la integridad de datos, y la creación de funciones hash seguras para contraseñas y otros datos sensibles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Por qué SHA-3 es irreversible?</AccordionTrigger>
                <AccordionContent>
                  SHA-3, como todas las funciones hash criptográficas, está diseñada para ser unidireccional. Esto significa que:
                  <ul className="list-disc pl-5 mt-2 text-left">
                    <li>Es computacionalmente fácil calcular el hash de un mensaje dado.</li>
                    <li>Es extremadamente difícil (prácticamente imposible) encontrar el mensaje original a partir de su hash.</li>
                    <li>Esta propiedad se conoce como "resistencia a la preimagen" y es crucial para la seguridad en muchas aplicaciones criptográficas.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="space-x-4"></div>
          </div>
        </div>
      </section>

      <section id="encoder" className="py-6 md:py-12 lg:py-16"></section>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Generar Hash con SHA-3</CardTitle>
          <CardDescription>
            Selecciona una variante de SHA-3 y genera el hash del mensaje ingresado. Ej. una contraseña sería indescifrable aplicándole un hasheado, lo que permita que tu contraseña sea segura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sha3-input">
                Mensaje
                <HelpTooltip content="Ingrese el texto que desea convertir en hash. Puede ser cualquier cadena de caracteres." />
              </Label>
              <Input
                id="sha3-input"
                placeholder="Ingrese el mensaje"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sha3-variant">
                Variante de SHA-3
                <HelpTooltip content="Seleccione la variante de SHA-3 que desea utilizar. Cada variante produce un hash de diferente longitud." />
              </Label>
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

      
    </div>
  )
}
