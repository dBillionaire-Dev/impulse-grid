'use client'

export function StatsSection() {
  const stats = [
    {
      value: '100+',
      label: 'Projects Completed',
      icon: '🚀',
    },
    {
      value: '500+',
      label: 'Hours Saved for Clients',
      icon: '⏱️',
    },
    {
      value: '98%',
      label: 'Client Satisfaction',
      icon: '⭐',
    },
    {
      value: '5+',
      label: 'Years of Experience',
      icon: '📊',
    },
  ]

  return (
    <section className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="text-sm text-purple-400 uppercase tracking-widest">RESULTS THAT MATTER</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Helping Businesses Grow & Save Time
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="group relative text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <div className="text-5xl">{stat.icon}</div>
              <div>
                <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
