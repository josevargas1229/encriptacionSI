import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function FrameworkComparison() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Justificación de la Elección de Next.js para Implementación de Cifrado</h1>

            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                <div className="prose max-w-none">
                    
                    <h2 className="text-2xl font-semibold mb-4">Comparación de Next.js y Angular</h2>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Criterio</TableHead>
                                <TableHead>Next.js</TableHead>
                                <TableHead>Angular</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Rendimiento</TableCell>
                                <TableCell>
                                    Excelente, gracias al renderizado del lado del servidor (SSR) y la generación estática.
                                    Ideal para aplicaciones que requieren cálculos criptográficos rápidos.
                                </TableCell>
                                <TableCell>
                                    Bueno, pero puede ser más pesado debido a su naturaleza de SPA completa.
                                    Puede requerir optimizaciones adicionales para operaciones criptográficas intensivas.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Facilidad de implementación</TableCell>
                                <TableCell>
                                    Alta. React y Next.js tienen una curva de aprendizaje más suave.
                                    Fácil integración con bibliotecas criptográficas de JavaScript.
                                </TableCell>
                                <TableCell>
                                    Moderada. Angular tiene una estructura más rígida y una curva de aprendizaje más pronunciada.
                                    La implementación de métodos de cifrado puede requerir más configuración.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Ecosistema y bibliotecas</TableCell>
                                <TableCell>
                                    Amplio ecosistema de React. Fácil acceso a bibliotecas como CryptoJS, Node-RSA, etc.
                                </TableCell>
                                <TableCell>
                                    Ecosistema robusto pero más limitado. Algunas bibliotecas criptográficas pueden requerir adaptación.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Seguridad</TableCell>
                                <TableCell>
                                    Buena. SSR reduce la exposición de lógica sensible al cliente.
                                    Fácil implementación de prácticas de seguridad modernas.
                                </TableCell>
                                <TableCell>
                                    Buena, pero requiere más atención en la protección de lógica del lado del cliente.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Separator className="my-4" />

                    <h2 className="text-2xl font-semibold mb-4">Justificación de la Elección de Next.js</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>
                            <strong>Rendimiento superior:</strong> Next.js ofrece un rendimiento excepcional gracias a su capacidad de SSR y generación estática.
                            Esto es crucial para aplicaciones que manejan operaciones criptográficas, ya que permite realizar cálculos pesados en el servidor,
                            reduciendo la carga en el cliente y mejorando los tiempos de respuesta.
                        </li>
                        <li>
                            <strong>Facilidad de implementación:</strong> La simplicidad de React y la estructura intuitiva de Next.js permiten una implementación
                            más rápida y sencilla de métodos de cifrado. La integración con bibliotecas criptográficas es directa y requiere menos configuración
                            en comparación con Angular.
                        </li>
                        <li>
                            <strong>Flexibilidad:</strong> Next.js ofrece mayor flexibilidad en la arquitectura de la aplicación, permitiendo una mejor adaptación
                            a los requisitos específicos de seguridad y cifrado del proyecto.
                        </li>
                        <li>
                            <strong>Ecosistema robusto:</strong> El amplio ecosistema de React y npm proporciona acceso a una gran variedad de bibliotecas y herramientas
                            criptográficas, facilitando la implementación de diversos algoritmos de cifrado.
                        </li>
                        <li>
                            <strong>Seguridad mejorada:</strong> La capacidad de SSR de Next.js permite manejar lógica sensible en el servidor, reduciendo la exposición
                            de algoritmos de cifrado críticos en el lado del cliente.
                        </li>
                    </ol>

                </div>
            </ScrollArea>
        </div>
    )
}