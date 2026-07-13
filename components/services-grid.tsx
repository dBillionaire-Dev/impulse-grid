interface Service {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

interface ServicesGridProps {
  services: Service[]
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (services.length === 0) return null

  return (
    <section id="services" className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="text-sm text-purple-400 uppercase tracking-widest">► WHAT I DO</p>
        <h2 className="text-5xl md:text-6xl font-bold">
          <span className="text-white">Automation That </span>
          <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text">Works.</span>
          <br />
          <span className="text-white">Design That </span>
          <span className="text-orange-400">Stands Out.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service.id} className="group relative">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl blur transition-opacity duration-300"
              style={{ backgroundColor: service.color }}
            />
            <div
              className="relative border rounded-2xl p-8 backdrop-blur-sm hover:bg-card/30 transition-all duration-300 h-full flex flex-col space-y-4"
              style={{ borderColor: `${service.color}4d`, backgroundColor: `${service.color}1a` }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${service.color}33` }}
              >
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{service.description}</p>
              <div className="h-0.5 w-6 rounded-full" style={{ backgroundColor: service.color }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
