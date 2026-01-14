import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: '1.5rem',
        background: 'linear-gradient(to right, #fff, #888)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Process multilingual text
        <br />
        with GLOST
      </h1>

      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
        color: '#888',
        maxWidth: '600px',
        marginBottom: '2rem',
        lineHeight: 1.6
      }}>
        A framework for processing multilingual text with language learning annotations
        using a unified/remark-style plugin system.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/docs"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#000',
            backgroundColor: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'opacity 0.2s'
          }}
        >
          Get Started <span aria-hidden="true">→</span>
        </Link>

        <Link
          href="https://github.com/fustilio/glost"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#fff',
            backgroundColor: 'transparent',
            border: '1px solid #333',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'border-color 0.2s'
          }}
        >
          GitHub
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '900px',
        marginTop: '4rem',
        width: '100%'
      }}>
        <FeatureCard
          title="Unified Pipeline"
          description="Process text through a fluent .use() API with composable extensions"
        />
        <FeatureCard
          title="Multi-Language"
          description="Built-in support for Japanese, Thai, Korean, and more"
        />
        <FeatureCard
          title="Extensible"
          description="Add transcription, translation, difficulty scoring, and custom metadata"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div style={{
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #222',
      backgroundColor: '#111',
      textAlign: 'left'
    }}>
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 600,
        marginBottom: '0.5rem',
        color: '#fff'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.9rem',
        color: '#888',
        lineHeight: 1.5,
        margin: 0
      }}>
        {description}
      </p>
    </div>
  )
}
