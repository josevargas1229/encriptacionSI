import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LockIcon, ShuffleIcon, KeyIcon, HashIcon, ShieldIcon } from "lucide-react"

export default function Tools() {
  const tools = [
    {
      icon: <LockIcon className="w-12 h-12 mb-4 mx-auto text-primary" />,
      title: "Cifrado César",
      description: "Desplaza cada letra del mensaje un número fijo de posiciones en el alfabeto.",
      link: "/cifrado/cesar/#encoder"
    },
    {
      icon: <ShuffleIcon className="w-12 h-12 mb-4 mx-auto text-primary" />,
      title: "Cifrado Transposición",
      description: "Reorganiza las letras del mensaje según una clave específica.",
      link: "/cifrado/transposicion/#encoder"
    },
    {
      icon: <KeyIcon className="w-12 h-12 mb-4 mx-auto text-primary" />,
      title: "Cifrado Blowfish",
      description: "Algoritmo de cifrado simétrico que opera en bloques de 64 bits.",
      link: "/cifrado/blowfish/#encoder"
    },
    {
      icon: <ShieldIcon className="w-12 h-12 mb-4 mx-auto text-primary" />,
      title: "Cifrado ElGamal",
      description: "Sistema de cifrado de clave pública basado en el problema del logaritmo discreto.",
      link: "/cifrado/elgamal/#encoder"
    },
    {
      icon: <HashIcon className="w-12 h-12 mb-4 mx-auto text-primary" />,
      title: "Función Hash SHA-3",
      description: "Genera hashes de longitud fija para cualquier entrada de datos.",
      link: "/cifrado/sha3/#encoder"
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              ¿Listo para experimentar?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Prueba nuestras herramientas interactivas y aprende cómo funcionan estos métodos de cifrado.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {tools.map((tool, index) => (
              <Card key={index} className="flex flex-col items-center text-center">
                <CardHeader>
                  <CardTitle></CardTitle>
                  <CardTitle>{tool.icon}{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Link href={tool.link}>
                    <Button>Probar ahora</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}