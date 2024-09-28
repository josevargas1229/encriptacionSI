"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { LockIcon, ShuffleIcon, KeyIcon, ShieldIcon, HashIcon } from "lucide-react"
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts'

const cifrados = [
    {
        id: "cesar",
        nombre: "Cifrado César",
        descripcion: "Cifrado basado en desplazamiento de caracteres.",
        icon: LockIcon,
        color: "bg-blue-100 hover:bg-blue-200",
        tipo: "Sustitución simple",
        clave: "Desplazamiento fijo (e.g., 3 posiciones)",
        caracteristicas: [
            "Fácil de implementar y de romper.",
            "Aplica el mismo desplazamiento a todo el mensaje.",
        ],
        stats: { complejidad: 1, seguridad: 1, velocidad: 5, implementacion: 5 }
    },
    {
        id: "escitala",
        nombre: "Cifrado Escítala",
        descripcion: "Cifrado basado en transposición de caracteres.",
        icon: ShuffleIcon,
        color: "bg-green-100 hover:bg-green-200",
        tipo: "Transposición",
        clave: "Número de columnas (grosor de la vara)",
        caracteristicas: [
            "Reorganiza las letras del mensaje.",
            "Genera un texto cifrado desordenado si no se usa la vara adecuada.",
            "Más difícil de romper que el César debido al reordenamiento de caracteres.",
        ],
        stats: { complejidad: 2, seguridad: 2, velocidad: 4, implementacion: 4 }
    },
    {
        id: "blowfish",
        nombre: "Cifrado Blowfish",
        descripcion: "Cifrado simétrico de bloques.",
        icon: KeyIcon,
        color: "bg-purple-100 hover:bg-purple-200",
        tipo: "Simétrico de bloques",
        clave: "Variable, de 32 a 448 bits",
        caracteristicas: [
            "Tamaño de bloque: 64 bits",
            "Estructura de red de Feistel con 16 rondas",
            "Resistente a criptoanálisis conocidos",
        ],
        stats: { complejidad: 4, seguridad: 4, velocidad: 3, implementacion: 3 }
    },
    {
        id: "elgamal",
        nombre: "Cifrado ElGamal",
        descripcion: "Cifrado asimétrico basado en el problema del logaritmo discreto.",
        icon: ShieldIcon,
        color: "bg-yellow-100 hover:bg-yellow-200",
        tipo: "Asimétrico",
        clave: "Par de claves (pública y privada)",
        caracteristicas: [
            "Basado en el problema del logaritmo discreto",
            "Proporciona confidencialidad y no repudio",
            "Utilizado en protocolos como PGP y GNU Privacy Guard",
        ],
        stats: { complejidad: 5, seguridad: 5, velocidad: 2, implementacion: 2 }
    },
    {
        id: "sha3",
        nombre: "Función Hash SHA-3",
        descripcion: "Algoritmo de hash criptográfico.",
        icon: HashIcon,
        color: "bg-red-100 hover:bg-red-200",
        tipo: "Función hash criptográfica",
        clave: "No aplica (función unidireccional)",
        caracteristicas: [
            "Tamaños de salida: SHA3-224, SHA3-256, SHA3-384, SHA3-512",
            "Resistente a ataques de colisión y preimagen",
            "Utilizado en firmas digitales y verificación de integridad",
        ],
        stats: { complejidad: 5, seguridad: 5, velocidad: 4, implementacion: 3 }
    },
]

export default function ComparacionCifrados() {
    const [activeTab, setActiveTab] = useState("cesar")

    return (
        <div className="space-y-4 md:space-y-8 flex-1 h-full my-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 xl:mb-4 md:mb-9 mb-14">
                    {cifrados.map((cifrado) => (
                        <TabsTrigger key={cifrado.id} value={cifrado.id} className="text-xs sm:text-sm">
                            <cifrado.icon className="w-4 h-4 mr-1 sm:w-5 sm:h-5 sm:mr-2" />
                            <span className="truncate">{cifrado.nombre}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                {cifrados.map((cifrado) => (
                    <TabsContent key={cifrado.id} value={cifrado.id}>
                        <Card className={` transition-all duration-300 mt-3`}>
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg sm:text-xl">
                                    <cifrado.icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                                    {cifrado.nombre}
                                </CardTitle>
                                <CardDescription className="text-sm sm:text-base">{cifrado.descripcion}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="info">
                                        <AccordionTrigger className="text-sm sm:text-base">Información General</AccordionTrigger>
                                        <AccordionContent className="text-xs sm:text-sm">
                                            <p><strong>Tipo:</strong> {cifrado.tipo}</p>
                                            <p><strong>Clave:</strong> {cifrado.clave}</p>
                                            <ul className="mt-2 sm:mt-4 list-disc pl-4">
                                                {cifrado.caracteristicas.map((carac, index) => (
                                                    <li key={index}>{carac}</li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="chart">
                                        <AccordionTrigger className="text-sm sm:text-base">Gráfico Comparativo</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="h-48 sm:h-64 mt-2 sm:mt-4">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                                        { subject: 'Complejidad', A: cifrado.stats.complejidad },
                                                        { subject: 'Seguridad', A: cifrado.stats.seguridad },
                                                        { subject: 'Velocidad', A: cifrado.stats.velocidad },
                                                        { subject: 'Implementación', A: cifrado.stats.implementacion },
                                                    ]}>
                                                        <PolarGrid />
                                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#333', fontSize: 12 }} />
                                                        <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#333', fontSize: 12 }} />
                                                        <Radar name={cifrado.nombre} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                                    </RadarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                            <CardFooter className="flex flex-col sm:flex-row justify-start space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                                <Link href={`/cifrado/${cifrado.id}`} className="w-full sm:w-auto">
                                    <Button variant="outline" className="w-full sm:w-auto">Saber más</Button>
                                </Link>
                                <Link href={`/cifrado/${cifrado.id}/#encoder`} className="w-full sm:w-auto">
                                    <Button className="w-full sm:w-auto">Probar {cifrado.nombre}</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}