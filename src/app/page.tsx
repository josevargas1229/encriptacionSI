import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Tools from "@/components/pagina/tools"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Primer banner */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Descubre el arte del cifrado
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explora y aprende sobre técnicas de cifrado clásicas con nuestras herramientas interactivas.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/cifrado">
                  <Button>Comenzar</Button>
                </Link>
                <Link href="#learn-more">
                  <Button variant="outline">Saber más</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Tipos de cifrado */}
        <section id="learn-more" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Tipos de cifrado
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              {/* Cifrado por desplazamiento */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Cifrado por Desplazamiento</CardTitle>
                  <CardDescription>También conocido como Cifrado César</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Este método desplaza cada letra del mensaje un número fijo de posiciones en el alfabeto.
                    Es simple pero efectivo para entender los conceptos básicos del cifrado.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href="/cifrado/cesar">
                    <Button>Saber más</Button>
                  </Link>
                </CardFooter>
              </Card>
              {/* Cifrado ElGamal */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Cifrado Asimétrico: ElGamal</CardTitle>
                  <CardDescription>Basado en el problema del logaritmo discreto</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    ElGamal es un sistema de cifrado de clave pública basado en el problema del logaritmo discreto.
                    Se utiliza tanto para cifrado como para firmas digitales.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center mt-auto">
                  <Link href="/cifrado/elgamal">
                    <Button>Saber más</Button>
                  </Link>
                </CardFooter>
              </Card>
              {/* Cifrado por transposición */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Cifrado por Transposición</CardTitle>
                  <CardDescription>Reordenamiento de caracteres</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Este método reorganiza las letras del mensaje según una clave específica.
                    Ofrece una perspectiva diferente sobre cómo se puede ocultar información.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href="/cifrado/transposicion">
                    <Button>Saber más</Button>
                  </Link>
                </CardFooter>
              </Card>
              {/* Cifrado Blowfish */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Cifrado Simétrico: Blowfish</CardTitle>
                  <CardDescription>Algoritmo de cifrado por bloques</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Blowfish es un algoritmo de cifrado simétrico que opera en bloques de 64 bits.
                    Es conocido por su velocidad y flexibilidad en la longitud de la clave.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center mt-auto">
                  <Link href="/cifrado/blowfish">
                    <Button>Saber más</Button>
                  </Link>
                </CardFooter>
              </Card>
              {/* Cifrado SHA-3 */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Función Hash: SHA-3</CardTitle>
                  <CardDescription>Secure Hash Algorithm 3</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    SHA-3 es la última versión de la familia de funciones hash SHA. Ofrece cuatro longitudes de salida:
                    SHA3-224, SHA3-256, SHA3-384 y SHA3-512, proporcionando diferentes niveles de seguridad.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center mt-auto">
                  <Link href="/cifrado/sha3">
                    <Button>Saber más</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        {/* Section para las herramientas */}
        <Tools/>
      </main>
    </div>
  )
}