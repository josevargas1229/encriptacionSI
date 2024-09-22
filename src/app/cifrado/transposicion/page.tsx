"use client"

import { useState } from "react"
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Función para cifrado de transposición con número de columnas
function scytaleCipher(str: string, numColumns: number, decrypt = false) {
  const normalizedStr = str.replace(/\s/g, '').toUpperCase()
  const len = normalizedStr.length
  const numRows = Math.ceil(len / numColumns)

  if (decrypt) {
    // Descifrado: Reorganizar el texto en una cuadrícula y leer por filas
    const numFullColumns = len % numColumns;
    const fullColumnLength = Math.ceil(len / numColumns);
    const shortColumnLength = fullColumnLength - 1;

    let result = '';
    let index = 0;

    for (let row = 0; row < fullColumnLength; row++) {
      for (let col = 0; col < numColumns; col++) {
        if (col < numFullColumns) {
          if (index < len) {
            result += normalizedStr[index];
            index += fullColumnLength;
          }
        } else {
          if (row < shortColumnLength && index < len) {
            result += normalizedStr[index];
            index += shortColumnLength;
          }
        }

        if (index >= len) {
          index = index % len + 1;
        }
      }
    }

    return result;
  } else {
    // Cifrado: Organizar el texto en una cuadrícula y leer por columnas
    let result = ''

    for (let col = 0; col < numColumns; col++) {
      for (let row = 0; row < numRows; row++) {
        const index = row * numColumns + col
        result += index < len ? normalizedStr[index] : ''
      }
    }

    return result
  }
}

export default function CifradoEscitala() {
  const [input, setInput] = useState("")
  const [columns, setColumns] = useState(6)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const { toast } = useToast()
  const handleCipher = (decrypt: boolean) => {
    try {
      const normalizedInput = input.replace(/\s/g, '') // Eliminar espacios en blanco

      if (!normalizedInput) throw new Error("Por favor, ingrese un mensaje para cifrar/descifrar.")
      if (columns <= 1) throw new Error("El número de columnas debe ser mayor que 1.")
      if (columns >= normalizedInput.length) throw new Error("El número de columnas debe ser menor que la longitud del mensaje sin espacios.")

      const result = scytaleCipher(normalizedInput, columns, decrypt)
      setOutput(result)
      setError("")
    } catch (err:any) {
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
                Cifrado por Transposición
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Un cifrado de transposición es aquel en el que se cambia el orden de los caracteres para cifrar el mensaje.              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué es el código por Transposición?</AccordionTrigger>
                <AccordionContent>
                  Un cifrado por transposición es un método de encriptación donde las posiciones de las letras en el texto claro se reorganizan según un sistema específico para formar el texto cifrado. Este método no reemplaza las letras con otros caracteres, sino que cambia su orden para ofuscar el mensaje original.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo codificar con el cifrado por Transposición?</AccordionTrigger>
                <AccordionContent>
                  En un cifrado por transposición, las letras del mensaje en texto claro se reorganizan según una regla o clave específica para crear el texto cifrado.Los cifrados por transposición se pueden implementar de varias maneras: <br />
                  <ol>
                    <li><strong>Transposición de Patrón Regular:</strong> Este método implica reorganizar las letras en un patrón regular. Por ejemplo, cada tercera letra en el texto claro podría moverse al frente, creando un nuevo orden de letras.</li>
                    <li><strong>Transposición por Palabra Clave:</strong> Otro enfoque es usar una palabra clave como base para la reorganización. Cada letra en la palabra clave determina la posición de un carácter en el texto claro reorganizado. Las letras no repetidas de la palabra clave se asignan a las posiciones restantes en orden alfabético.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Ejemplos de cifrados por Transposición</AccordionTrigger>
                <AccordionContent>
                  <ol>
                    <li><strong>Cifrado de la Valla de Rieles:</strong> En este método, el texto claro se escribe diagonalmente en un patrón de zigzag a través de una serie de rieles (líneas horizontales). El texto cifrado se obtiene luego leyendo las letras de manera sistemática desde los rieles. Por ejemplo, si tenemos tres rieles y el texto claro &quot;HELLO WORLD&quot;, el texto cifrado sería &quot;HLOLEOWLRD&quot;.</li>
                    <li><strong>Cifrado por Transposición Columnar: </strong> Este cifrado dispone el texto claro en columnas basadas en la longitud de una palabra clave. La palabra clave determina el orden en el que se leen las columnas para obtener el texto cifrado. Por ejemplo, si el texto claro es &quot;HELLO WORLD&quot; y la palabra clave es &quot;SECRET&quot;, las columnas se organizarían como &quot;S E C R E T&quot; y el texto cifrado sería &quot;HRLOEWDLO L&quot;.</li>
                  </ol>
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
          <CardTitle>Cifrado Escítala</CardTitle>
          <CardDescription>
            Esta herramienta se basa en el cifrado por Transposición Columnar, que es el más similar a la Escítala utilizada en la antigüedad.
            <br />Ingrese el mensaje que quiera cifrar o descrifrar en el espacio de abajo, ingrese el número de columnas (grosor de vara) que tendrá y presione el botón que corresponda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scytale-input">Mensaje</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Input
                      id="scytale-input"
                      placeholder="Ingrese el mensaje"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ingrese el mensaje a cifrar o descifrar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>
            <div className="space-y-2">
              <Label htmlFor="scytale-columns">Número de Columnas</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <Input
                      id="scytale-columns"
                      type="number"
                      min="2"
                      value={columns}
                      onChange={(e) => setColumns(Number(e.target.value))}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ingrese el número de columnas para cifrar su mensaje</p>
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
      <section>
        <div className="mt-4 mx-4">
          <h3 className="font-semibold">Referencias</h3>
          <p>
            Cifrado por transposición. (s/f). Vpnunlimited.com. Recuperado el 22 de septiembre de 2024,
            <a href="https://www.vpnunlimited.com/es/help/cybersecurity/transposition-cipher" target="_blank" rel="noopener noreferrer">
              https://www.vpnunlimited.com/es/help/cybersecurity/transposition-cipher
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
