export function AboutStory() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2010 with a simple dream - to make travel accessible, memorable, and transformative for
                everyone. What started as a small family business has grown into one of India's most trusted travel
                companies.
              </p>
              <p>
                We believe that travel is not just about visiting places; it's about creating connections, discovering
                cultures, and making memories that last a lifetime. Our team of passionate travel experts works
                tirelessly to craft experiences that go beyond the ordinary.
              </p>
              <p>
                From the snow-capped peaks of the Himalayas to the pristine beaches of Goa, from the bustling streets of
                Delhi to the serene backwaters of Kerala - we've helped thousands of travelers discover the incredible
                diversity of our beautiful country and beyond.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src="/about-story.png"
              alt="Our travel story"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
