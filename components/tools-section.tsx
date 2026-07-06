interface Tool {
  id: string
  name: string
  icon: string
  category: string
}

interface ToolsSectionProps {
  tools: Tool[]
}

export function ToolsSection({ tools }: ToolsSectionProps) {
  if (tools.length === 0) return null

  return (
    <section className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="text-sm text-purple-400 uppercase tracking-widest">TOOLS & EXPERTISE</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Powering Automation & Creativity
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-xl blur transition-opacity duration-300" />
            <div className="relative border border-border/50 group-hover:border-purple-500/50 rounded-xl p-6 bg-card/30 backdrop-blur-sm group-hover:bg-card/60 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer h-full">
              <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {tool.icon.startsWith('http') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-3xl">{tool.icon}</span>
                )}
              </div>
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {tool.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
