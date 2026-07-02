'use client'

export function ServicesGrid() {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2" className="fill-green-500" />
          <circle cx="6" cy="12" r="2" className="fill-green-500" />
          <circle cx="18" cy="12" r="2" className="fill-green-500" />
          <path d="M8 12h8M6 12h12" className="stroke-green-500" />
        </svg>
      ),
      title: 'AI & Automation',
      description: 'Intelligent workflows that handle repetitive tasks, data processing, and decision logic without human intervention using n8n.',
      color: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      accentColor: 'from-green-500 to-green-600',
      iconBgColor: 'bg-green-500/20',
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 3L3 9m0 0l6 6m-6-6h18" className="stroke-purple-500" />
          <path d="M15 21l6-6m0 0l-6-6m6 6H3" className="stroke-purple-500" />
        </svg>
      ),
      title: 'No-Code Solutions',
      description: 'Build smart systems, dashboards, and tools without writing a single line of code using best-in-class SaaS platforms.',
      color: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      accentColor: 'from-purple-500 to-purple-600',
      iconBgColor: 'bg-purple-500/20',
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 18l2.5-7.5a2 2 0 0 1 1.9-1.3h10.2a2 2 0 0 1 1.9 1.3L21 18" className="stroke-pink-500" />
          <circle cx="7" cy="8" r="1.5" className="fill-pink-500" />
        </svg>
      ),
      title: 'Graphic Design',
      description: 'Visually stunning designs that communicate your brand message and drive engagement across all channels.',
      color: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      accentColor: 'from-pink-500 to-rose-600',
      iconBgColor: 'bg-pink-500/20',
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9L12 3l6 6v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9z" className="stroke-orange-500" />
          <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" className="stroke-orange-500" />
        </svg>
      ),
      title: 'Brand Design',
      description: 'Build a strong, consistent brand identity that sets you apart and builds trust with your audience.',
      color: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      accentColor: 'from-orange-400 to-orange-600',
      iconBgColor: 'bg-orange-500/20',
    },
  ]

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
        {services.map((service, i) => (
          <div key={i} className="group relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.accentColor} opacity-0 group-hover:opacity-5 rounded-2xl blur transition-opacity duration-300`} />
            <div className={`relative ${service.borderColor} border rounded-2xl p-8 ${service.color} backdrop-blur-sm hover:bg-card/30 transition-all duration-300 h-full flex flex-col space-y-4`}>
              <div className={`w-12 h-12 ${service.iconBgColor} rounded-lg flex items-center justify-center`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{service.description}</p>
              <div className={`h-0.5 w-6 bg-gradient-to-r ${service.accentColor} rounded-full`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
