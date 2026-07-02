'use client'

export function ProcessSection() {
  const steps = [
    {
      number: 1,
      title: 'Discover',
      description: 'I learn about your business, goals, and challenges to understand the full picture.',
    },
    {
      number: 2,
      title: 'Plan',
      description: 'Design the automation solution that fits your specific needs & budget.',
    },
    {
      number: 3,
      title: 'Build',
      description: 'Create, automate, and design with precision and attention to every detail.',
    },
    {
      number: 4,
      title: 'Test',
      description: 'Ensure everything runs smoothly, testing every aspect of the workflow.',
    },
    {
      number: 5,
      title: 'Deliver',
      description: 'Launch the solution and ensure you&apos;re equipped to run it independently.',
    },
  ]

  return (
    <section id="process" className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="text-sm text-purple-400 uppercase tracking-widest">MY PROCESS</p>
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          Simple Process. Powerful Results.
        </h2>
      </div>

      <div className="grid md:grid-cols-5 gap-4 md:gap-2 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 z-0" />

        {steps.map((step, i) => (
          <div key={i} className="relative z-10">
            <div className="flex flex-col items-center">
              {/* Step number circle */}
              <div className="mb-6 relative">
                <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-bold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  i === 0
                    ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                    : i < 4
                    ? 'border-purple-500/30 bg-card/50 text-muted-foreground'
                    : 'border-orange-500 bg-orange-500/20 text-orange-300'
                }`}>
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
