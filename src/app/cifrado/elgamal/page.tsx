"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaRegCopy } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import { HelpCircle, Dices } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Breadcrumbs from "@/components/pagina/breadcrums"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// logica del cifrado ElGamal 
const ElGamal = {
  isPrime: (n: number) => {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false
    }
    return n > 1
  },
  powmod: (base: number, exp: number, modulus: number) => {
    let result = 1
    base = base % modulus
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % modulus
      exp = Math.floor(exp / 2)
      base = (base * base) % modulus
    }
    return result
  },
  getPublicKey: (p: number, g: number, x: number) => {
    return { p, g, h: ElGamal.powmod(g, x, p) }
  },
  encrypt: (m: number, y: number, publicKey: { p: number, g: number, h: number }) => {
    const { p, g, h } = publicKey
    const c1 = ElGamal.powmod(g, y, p)
    const c2 = (m * ElGamal.powmod(h, y, p)) % p
    return { c1, c2 }
  },
  decrypt: (c1: number, c2: number, x: number, p: number) => {
    const s = ElGamal.powmod(c1, x, p)
    const sInverse = ElGamal.powmod(s, p - 2, p)
    return (c2 * sInverse) % p
  },
  generateRandomPrime: () => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
    return primes[Math.floor(Math.random() * primes.length)]
  },
  generateRandomNumber: (max: number) => {
    return Math.floor(Math.random() * (max - 2)) + 2
  }
}
//definiciones de tipos
type PublicKey = { p: number; g: number; h: number };

interface AliceState {
  p: number;
  g: number;
  x: number;
  publicKey: PublicKey | null;
}

interface BobState {
  y: number;
  m: number;
  encryptedMsg: { c1: number; c2: number } | null;
}
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
export default function ElGamalCipher() {
  const [aliceState, setAliceState] = useState<AliceState>({ p: 0, g: 0, x: 0, publicKey: null })
  const [bobState, setBobState] = useState<BobState>({ y: 0, m: 0, encryptedMsg: null })
  const [decryptedMsg, setDecryptedMsg] = useState<number | null>(null)

  const handleAliceInputChange = (field: string, value: string) => {
    setAliceState(prev => ({ ...prev, [field]: parseInt(value) || 0 }))
  }

  const handleBobInputChange = (field: string, value: string) => {
    setBobState(prev => ({ ...prev, [field]: parseInt(value) || 0 }))
  }

  const generatePublicKey = () => {
    if (ElGamal.isPrime(aliceState.p)) {
      const publicKey = ElGamal.getPublicKey(aliceState.p, aliceState.g, aliceState.x)
      setAliceState(prev => ({ ...prev, publicKey }))
    } else {
      alert('Please enter a valid prime number for p')
    }
  }

  const encryptMessage = () => {
    if (aliceState.publicKey) {
      const encryptedMsg = ElGamal.encrypt(bobState.m, bobState.y, aliceState.publicKey)
      setBobState(prev => ({ ...prev, encryptedMsg }))
    } else {
      alert('Alice needs to generate a public key first')
    }
  }

  const decryptMessage = () => {
    if (bobState.encryptedMsg) {
      const { c1, c2 } = bobState.encryptedMsg
      const decrypted = ElGamal.decrypt(c1, c2, aliceState.x, aliceState.p)
      setDecryptedMsg(decrypted)
    }
  }
  const generateRandomValue = (field: keyof AliceState | keyof BobState) => {
    if (field === 'p') {
      setAliceState(prev => ({ ...prev, p: ElGamal.generateRandomPrime() }))
    } else if (field === 'g' || field === 'x') {
      setAliceState(prev => ({ ...prev, [field]: ElGamal.generateRandomNumber(prev.p) }))
    } else if (field === 'y' || field === 'm') {
      if (aliceState.publicKey) {
        setBobState(prev => ({ ...prev, [field]: ElGamal.generateRandomNumber(aliceState.publicKey!.p) }))
      } else {
        alert('Alice needs to generate a public key first')
      }
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
                Algoritmo de Cifrado ElGamal
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                ElGamal es un sistema de cifrado de clave pública basado en el problema del logaritmo discreto. Proporciona tanto cifrado como firma digital, y es ampliamente utilizado en criptografía moderna.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué es ElGamal?</AccordionTrigger>
                <AccordionContent>
                  ElGamal es un algoritmo criptográfico asimétrico desarrollado por Taher Elgamal en 1985. Se basa en la dificultad computacional del problema del logaritmo discreto en grupos cíclicos finitos. ElGamal proporciona un esquema de cifrado y un esquema de firma digital, ambos utilizados en varios protocolos de seguridad.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo funciona ElGamal?</AccordionTrigger>
                <AccordionContent>
                  El funcionamiento de ElGamal se divide en tres fases principales:
                  <ol className="list-decimal pl-5 mt-2 text-left">
                    <li>Generación de claves: Se elige un grupo cíclico G de orden p con un generador g. El receptor elige una clave privada x y calcula la clave pública h = g^x mod p.</li>
                    <li>Cifrado: Para cifrar un mensaje m, el remitente elige un número aleatorio y y calcula c1 = g^y mod p y c2 = m * h^y mod p. El texto cifrado es el par (c1, c2).</li>
                    <li>Descifrado: El receptor calcula s = c1^x mod p y luego m = c2 * s^(-1) mod p para recuperar el mensaje original.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Aplicaciones de ElGamal</AccordionTrigger>
                <AccordionContent>
                  ElGamal se utiliza en diversas áreas de la criptografía y la seguridad informática:
                  <ul className="list-disc pl-5 mt-2 text-left">
                    <li>Cifrado de correos electrónicos y comunicaciones seguras.</li>
                    <li>Firmas digitales para autenticación y no repudio.</li>
                    <li>Protocolos de votación electrónica.</li>
                    <li>Sistemas de gestión de claves en infraestructuras de clave pública (PKI).</li>
                    <li>Implementaciones de criptografía de curva elíptica (variante de ElGamal).</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Seguridad de ElGamal</AccordionTrigger>
                <AccordionContent>
                  La seguridad de ElGamal se basa en varios factores:
                  <ul className="list-disc pl-5 mt-2 text-left">
                    <li>Problema del Logaritmo Discreto: La dificultad de calcular x dado g^x mod p es fundamental para la seguridad del sistema.</li>
                    <li>Tamaño de las claves: Se recomiendan claves de al menos 2048 bits para una seguridad adecuada.</li>
                    <li>Aleatoriedad: La generación de números aleatorios seguros es crucial para la robustez del cifrado.</li>
                    <li>Resistencia a ataques: ElGamal es resistente a varios tipos de ataques, pero puede ser vulnerable a ataques de texto claro elegido si no se implementa correctamente.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="space-x-4"></div>
          </div>
        </div>
      </section>
      <section id="encoder" className="py-3 md:py-6 lg:py-8"></section>
      <section>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-8">ElGamal Encryption Demo</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Máquina de Alice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prime">
                      Primo (p)
                      <HelpTooltip content="Un número primo usado como el módulo" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="prime"
                        type="number"
                        value={aliceState.p || ''}
                        onChange={(e) => handleAliceInputChange('p', e.target.value)}
                      />
                      <Button onClick={() => generateRandomValue('p')} className="ml-2">
                        <Dices className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="generator">
                      Generador (g)
                      <HelpTooltip content="Una raíz primitiva módulo p (mayor a 1 pero menor que p)" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="generator"
                        type="number"
                        value={aliceState.g || ''}
                        onChange={(e) => handleAliceInputChange('g', e.target.value)}
                      />
                      <Button onClick={() => generateRandomValue('g')} className="ml-2">
                        <Dices className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="privateKey">
                      Clave Privada (x)
                      <HelpTooltip content="La clave secreta de Alice mayor que 1 pero menor que p-1" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="privateKey"
                        type="number"
                        value={aliceState.x || ''}
                        onChange={(e) => handleAliceInputChange('x', e.target.value)}
                      />
                      <Button onClick={() => generateRandomValue('x')} className="ml-2">
                        <Dices className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button onClick={generatePublicKey}>Generar Llave Pública</Button>
                  {aliceState.publicKey && (
                    <div>
                      <p>Llave pública:</p>
                      <p>p: {aliceState.publicKey.p}, g: {aliceState.publicKey.g}, h: {aliceState.publicKey.h}</p>
                    </div>
                  )}
                  {bobState.encryptedMsg && (
                    <div>
                      <p>Mensaje encriptado recibido:</p>
                      <p>c1: {bobState.encryptedMsg.c1}, c2: {bobState.encryptedMsg.c2}</p>
                      <Button onClick={decryptMessage}>Desencriptar</Button>
                      {decryptedMsg !== null && <p>Mensaje desencriptado: {decryptedMsg}</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comunicación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aliceState.publicKey && (
                    <div>
                      <p>Llave pública de Alice:</p>
                      <p>p: {aliceState.publicKey.p}, g: {aliceState.publicKey.g}, h: {aliceState.publicKey.h}</p>
                    </div>
                  )}
                  {bobState.encryptedMsg && (
                    <div>
                      <p>Mensaje encriptado de Bob:</p>
                      <p>c1: {bobState.encryptedMsg.c1}, c2: {bobState.encryptedMsg.c2}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Máquina de Bob</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="encryptionKey">
                      Clave de Encriptación (y)
                      <HelpTooltip content="Un número aleatorio elegido por Bob para encriptar el mensaje" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="encryptionKey"
                        type="number"
                        value={bobState.y || ''}
                        onChange={(e) => handleBobInputChange('y', e.target.value)}
                      />
                      <Button onClick={() => generateRandomValue('y')} className="ml-2">
                        <Dices className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">
                      Mensaje (m)
                      <HelpTooltip content="El mensaje que Bob quiere enviar en formato numérico (menor que p)" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="message"
                        type="number"
                        value={bobState.m || ''}
                        onChange={(e) => handleBobInputChange('m', e.target.value)}
                      />
                      <Button onClick={() => generateRandomValue('m')} className="ml-2">
                        <Dices className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button onClick={encryptMessage}>Encriptar Mensaje</Button>
                  {bobState.encryptedMsg && (
                    <div>
                      <p>Mensaje Encriptado:</p>
                      <p>c1: {bobState.encryptedMsg.c1}, c2: {bobState.encryptedMsg.c2}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </section>
    </div>

  )
}