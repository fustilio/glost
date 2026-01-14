import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    template: '%s – GloST',
    default: 'GloST Documentation'
  },
  description: 'GloST (Glossed Syntax Tree) - A framework for processing multilingual text with language learning annotations',
}

const navbar = (
  <Navbar
    logo={<span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>GloST</span>}
    projectLink="https://github.com/fustilio/glost"
  >
    <ThemeSwitch />
  </Navbar>
)

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © GloST
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/fustilio/glost/tree/main/docs/content"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
