"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function ComparacionCifrados() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Cifrado César */}
            <Card>
                <CardHeader>
                    <CardTitle>Cifrado César</CardTitle>
                    <CardDescription>
                        Cifrado basado en desplazamiento de caracteres.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        El cifrado César es una técnica de cifrado por sustitución en la cual cada letra del texto
                        se reemplaza por otra que se encuentra un número fijo de posiciones más adelante en el alfabeto.
                    </p>
                    <ul className="mt-4 list-disc pl-4">
                        <li>Tipo de cifrado: Sustitución simple</li>
                        <li>Clave: Desplazamiento fijo (e.g., 3 posiciones)</li>
                        <li>Fácil de implementar y de romper.</li>
                        <li>Aplica el mismo desplazamiento a todo el mensaje.</li>
                    </ul>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                    <Link href="/cifrado/cesar">
                        <Button>Saber más</Button>
                    </Link>
                    <Link href="/cifrado/cesar/#encoder">
                        <Button>Probar cifrado César</Button>
                    </Link>
                </CardFooter>
            </Card>

            {/* Cifrado Escítala */}
            <Card>
                <CardHeader>
                    <CardTitle>Cifrado Escítala</CardTitle>
                    <CardDescription>
                        Cifrado basado en transposición de caracteres.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        El cifrado Escítala es una técnica utilizada en la antigua Grecia, en la que se enrolla una tira
                        de cuero o pergamino alrededor de un cilindro (escítala). El mensaje se escribe a lo largo de la vara, y al desenrollarse,
                        parece desordenado. Solo puede ser leído correctamente cuando se usa una vara del mismo diámetro.
                    </p>
                    <ul className="mt-4 list-disc pl-4">
                        <li>Tipo de cifrado: Transposición</li>
                        <li>Clave: Número de columnas (grosor de la vara)</li>
                        <li>Reorganiza las letras del mensaje.</li>
                        <li>Genera un texto cifrado desordenado si no se usa la vara adecuada.</li>
                        <li>Más difícil de romper que el César debido al reordenamiento de caracteres.</li>
                    </ul>
                </CardContent>
                <CardFooter className="flex justify-center  space-x-4">
                    <Link href="/cifrado/transposicion">
                        <Button>Saber más</Button>
                    </Link>
                    <Link href="/cifrado/transposicion/#encoder">
                        <Button>Probar cifrado Escítala</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
