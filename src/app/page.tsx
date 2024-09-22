import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Descubre el Arte del Cifrado
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
        <section id="learn-more" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Tipos de Cifrado
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
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
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Listo para Experimentar?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Prueba nuestras herramientas interactivas y aprende cómo funcionan estos métodos de cifrado.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/cifrado/cesar/#encoder">
                  <Button size="lg">Cifrado César</Button>
                </Link>
                <Link href="/cifrado/transposicion/#encoder">
                  <Button size="lg">Cifrado transposición</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}