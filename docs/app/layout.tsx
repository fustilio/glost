import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: {
    template: '%s – GLOST',
    default: 'GLOST Documentation'
  },
  description: 'GLOST (Glossed Syntax Tree) - A framework for processing multilingual text with language learning annotations',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
