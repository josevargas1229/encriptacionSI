import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
                    recursos educativos que hagan que el aprendizaje de técnicas de cifrado clásicas sea accesible y
                    divertido.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Historia del Cifrado</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">Cifrado César</h3>
                  <p className="mb-4">
                    Nombrado en honor a Julio César, quien lo usó para comunicarse con sus generales, este método
                    simple pero efectivo ha sido la base de muchos sistemas de cifrado más complejos a lo largo de la
                    historia.
                  </p>
                  <h3 className="text-lg font-semibold mb-2">Cifrado Escítala</h3>
                  <p>
                    Utilizado por los espartanos ya en el siglo V a.C., la escítala es uno de los primeros ejemplos
                    conocidos de cifrado por transposición, demostrando que la criptografía tiene raíces muy antiguas
                    en la historia humana.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Características Clave
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start justify-center">
              <Card>
                <CardHeader>
                  <CardTitle>Herramientas Interactivas</CardTitle>
                </CardHeader>
                <CardContent>
                  Experimenta con cifrados César y Escítala en tiempo real, viendo cómo tus mensajes se transforman
                  con cada ajuste.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Diseño Responsivo</CardTitle>
                </CardHeader>
                <CardContent>
                  Accede a CifradoEdu desde cualquier dispositivo. Nuestra plataforma se adapta perfectamente a
                  pantallas de todos los tamaños.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recursos Educativos</CardTitle>
                </CardHeader>
                <CardContent>
                  Además de las herramientas prácticas, ofrecemos información detallada sobre la historia y los
                  principios detrás de cada método de cifrado.
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
                  Comienza tu Viaje en Criptografía
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explora nuestras herramientas y descubre la fascinante historia detrás de los métodos de cifrado clásicos.
                </p>
              </div>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex sm:flex-row flex-col">
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
