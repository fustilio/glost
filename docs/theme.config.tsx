const config = {
  logo: <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>📖 GLOST</span>,
  project: {
    link: 'https://github.com/fustilio/glost',
  },
  docsRepositoryBase: 'https://github.com/fustilio/glost/tree/main/docs',
  footer: {
    content: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/fustilio/glost" target="_blank" rel="noopener noreferrer">
          GLOST
        </a>
      </span>
    ),
  },
  head: () => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="GLOST Documentation" />
      <meta property="og:description" content="GLOST (Glossed Syntax Tree) - A framework for processing multilingual text with language learning annotations" />
    </>
  ),
  primaryHue: 200,
  darkMode: true,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    content: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
}

export default config
