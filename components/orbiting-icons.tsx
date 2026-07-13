'use client'

export function OrbitingIcons() {
  // Using real brand logos from theSVG CDN
  const technologies = [
    {
      name: 'n8n',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/n8n/default.svg',
      borderColor: '#ef4444',
      bgColor: '#ef4444',
      delay: 0,
    },
    {
      name: 'OpenAI',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/openai/dark.svg',
      borderColor: '#10a37f',
      bgColor: '#10a37f',
      delay: 1,
    },
    {
      name: 'Slack',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/slack/default.svg',
      borderColor: '#3ecf8e',
      bgColor: '#3ecf8e',
      delay: 2,
    },
    {
      name: 'Notion',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/notion/default.svg',
      borderColor: '#ffffff',
      bgColor: '#ffffff',
      delay: 3,
    },
    {
      name: 'Figma',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/figma/default.svg',
      borderColor: '#a259ff',
      bgColor: '#a259ff',
      delay: 4,
    },
    {
      name: 'Photoshop',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/photoshop/default.svg',
      borderColor: '#1d9aff',
      bgColor: '#001e36',
      delay: 5,
    },
    {
      name: 'Make',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/make/default.svg',
      borderColor: '#ff6b6b',
      bgColor: '#ff6b6b',
      delay: 6,
    },
    {
      name: 'Zapier',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/zapier/default.svg',
      borderColor: '#ff9500',
      bgColor: '#ff9500',
      delay: 7,
    },
    {
      name: 'Airtable',
      logoUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/airtable/default.svg',
      borderColor: '#18a4ff',
      bgColor: '#18a4ff',
      delay: 8,
    },
    {
      name: "PixelLab",
      logoUrl: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/discord/default.svg",
      borderColor: "#3b82f6",
      bgColor: "#0f172a",
      delay: 9,
    },
        {
      name: "Canva",
      logoUrl: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/canva/default.svg",
      borderColor: "#0f172a",
      bgColor: "#3b82f6",
      delay: 10,
    },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        
        .orbit-icon {
          animation: orbit 11s linear infinite;
        }

        @keyframes ring-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.65; }
        }

        .orbit-ring {
          animation: ring-pulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* Orbit ring guides — radar-style concentric circles matching the
          icons' orbit path */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="orbit-ring absolute rounded-full border border-purple-400/40"
          style={{ width: '180px', height: '180px', animationDelay: '0s' }}
        />
        <div
          className="orbit-ring absolute rounded-full border border-pink-400/35"
          style={{ width: '260px', height: '260px', animationDelay: '0.6s' }}
        />
        <div
          className="orbit-ring absolute rounded-full border border-purple-400/30"
          style={{ width: '320px', height: '320px', animationDelay: '1.2s' }}
        />
        <div
          className="orbit-ring absolute rounded-full border border-pink-400/25"
          style={{ width: '380px', height: '380px', animationDelay: '1.8s' }}
        />
        {/* Faint crosshair lines for the radar look */}
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/15 to-transparent" />
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400/15 to-transparent" />
      </div>

      {/* Orbiting tech icons */}
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="orbit-icon absolute w-80 h-80 left-1/2 top-1/2"
          style={{
            marginLeft: '-160px',
            marginTop: '-160px',
            animationDelay: `${tech.delay}s`,
          }}
        >
          <div
            className="absolute w-14 h-14 left-0 top-1/2 transform -translate-y-1/2 rounded-lg backdrop-blur-sm flex items-center justify-center overflow-hidden"
            style={{
              borderColor: `${tech.borderColor}40`,
              backgroundColor: `${tech.bgColor}15`,
              border: `2px solid ${tech.borderColor}40`,
            }}
          >
            <img
              src={tech.logoUrl}
              alt={tech.name}
              className="w-8 h-8 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
