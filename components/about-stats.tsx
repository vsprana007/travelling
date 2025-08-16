const stats = [
  { number: "50,000+", label: "Happy Travelers" },
  { number: "500+", label: "Destinations Covered" },
  { number: "10+", label: "Years of Experience" },
  { number: "98%", label: "Customer Satisfaction" },
]

export function AboutStats() {
  return (
    <section className="py-16 bg-cyan-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Our Journey in Numbers</h2>
          <p className="text-cyan-100 max-w-2xl mx-auto">
            These numbers represent the trust and love our customers have shown us over the years
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-cyan-100 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
