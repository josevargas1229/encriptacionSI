import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LockIcon, ShuffleIcon, KeyIcon, ShieldIcon, HashIcon } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              Acerca de CifradoEdu
            </h1>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start justify-center">
              <Card>
                <CardHeader>
                  <CardTitle>Nuestra Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    CifradoEdu es una plataforma educativa diseñada para introducir a estudiantes y entusiastas en el
                    fascinante mundo de la criptografía. Nuestro objetivo es proporcionar herramientas interactivas y
                    recursos educativos que hagan que el aprendizaje de técnicas de cifrado, desde las clásicas hasta las modernas,
                    sea accesible y divertido.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Evolución del Cifrado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Desde los métodos clásicos como el Cifrado César y la Escítala, pasando por algoritmos simétricos como Blowfish,
                    hasta llegar a sistemas asimétricos como ElGamal y funciones hash como SHA-3, la criptografía ha evolucionado
                    significativamente. En CifradoEdu, exploramos esta fascinante progresión, ofreciendo una visión completa
                    de cómo la seguridad de la información ha cambiado a lo largo del tiempo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Métodos de Cifrado
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start justify-center">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <LockIcon className="w-6 h-6 mr-2" />
                    Cifrado César
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Método clásico de sustitución simple, ideal para entender los conceptos básicos de cifrado.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <ShuffleIcon className="w-6 h-6 mr-2" />
                    Cifrado Escítala
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Antiguo método de transposición que demuestra cómo el reordenamiento puede ocultar información.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <KeyIcon className="w-6 h-6 mr-2" />
                    Cifrado Blowfish
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Algoritmo simétrico de bloques, conocido por su velocidad y flexibilidad en la longitud de la clave.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <ShieldIcon className="w-6 h-6 mr-2" />
                    Cifrado ElGamal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Sistema de cifrado asimétrico basado en el problema del logaritmo discreto, utilizado en firmas digitales.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <HashIcon className="w-6 h-6 mr-2" />
                    Función Hash SHA-3
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Algoritmo de hash criptográfico moderno, esencial para la integridad de datos y firmas digitales.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Explora la Criptografía
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Desde métodos clásicos hasta técnicas modernas, descubre cómo la criptografía ha evolucionado y sigue protegiendo nuestra información.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                <Link href="/cifrado/cesar/#encoder">
                  <Button variant="outline" className="w-full">César</Button>
                </Link>
                <Link href="/cifrado/transposicion/#encoder">
                  <Button variant="outline" className="w-full">Escítala</Button>
                </Link>
                <Link href="/cifrado/blowfish/#encoder">
                  <Button variant="outline" className="w-full">Blowfish</Button>
                </Link>
                <Link href="/cifrado/elgamal/#encoder">
                  <Button variant="outline" className="w-full">ElGamal</Button>
                </Link>
                <Link href="/cifrado/sha3/#encoder">
                  <Button variant="outline" className="w-full">SHA-3</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}