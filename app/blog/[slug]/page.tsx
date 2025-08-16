import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPost } from "@/components/blog-post"
import { BlogSidebar } from "@/components/blog-sidebar"

// Mock data - in real app this would come from API/database
const getBlogPost = (slug: string) => {
  const posts = {
    "ultimate-goa-travel-guide": {
      id: "1",
      title: "The Ultimate Goa Travel Guide: Beaches, Culture, and Hidden Gems",
      slug: "ultimate-goa-travel-guide",
      excerpt:
        "Discover the best of Goa with our comprehensive guide covering pristine beaches, vibrant culture, and secret spots only locals know.",
      content: `
        <p>Goa, India's smallest state, packs a punch when it comes to natural beauty, rich culture, and unforgettable experiences. Whether you're seeking pristine beaches, vibrant nightlife, or cultural immersion, Goa has something for every traveler.</p>
        
        <h2>Best Beaches in Goa</h2>
        <p>Goa's coastline stretches for over 100 kilometers, offering a diverse range of beach experiences:</p>
        
        <h3>North Goa Beaches</h3>
        <ul>
          <li><strong>Baga Beach:</strong> Perfect for water sports and beach parties</li>
          <li><strong>Calangute Beach:</strong> The "Queen of Beaches" with golden sands</li>
          <li><strong>Anjuna Beach:</strong> Famous for its Wednesday flea market</li>
        </ul>
        
        <h3>South Goa Beaches</h3>
        <ul>
          <li><strong>Palolem Beach:</strong> Crescent-shaped paradise for relaxation</li>
          <li><strong>Agonda Beach:</strong> Pristine and less crowded</li>
          <li><strong>Colva Beach:</strong> Longest beach with white sands</li>
        </ul>
        
        <h2>Cultural Experiences</h2>
        <p>Beyond the beaches, Goa offers rich Portuguese heritage and local traditions:</p>
        
        <h3>Historic Churches</h3>
        <p>Visit the UNESCO World Heritage sites in Old Goa, including the Basilica of Bom Jesus and Se Cathedral.</p>
        
        <h3>Spice Plantations</h3>
        <p>Take a guided tour through aromatic spice gardens and enjoy traditional Goan lunch.</p>
        
        <h2>Local Cuisine</h2>
        <p>Goan cuisine is a delightful fusion of Indian and Portuguese flavors. Must-try dishes include:</p>
        <ul>
          <li>Fish Curry Rice - The staple Goan meal</li>
          <li>Bebinca - Traditional Goan dessert</li>
          <li>Vindaloo - Spicy curry with Portuguese origins</li>
          <li>Feni - Local cashew or palm liquor</li>
        </ul>
        
        <h2>Best Time to Visit</h2>
        <p>The ideal time to visit Goa is from November to March when the weather is pleasant and perfect for beach activities. Avoid the monsoon season (June to September) unless you enjoy the lush green landscapes and don't mind the rain.</p>
        
        <h2>Travel Tips</h2>
        <ul>
          <li>Rent a scooter for easy transportation</li>
          <li>Try local beach shacks for authentic food</li>
          <li>Respect local customs and dress modestly when visiting churches</li>
          <li>Book accommodations in advance during peak season</li>
        </ul>
      `,
      author: "Priya Sharma",
      authorImage: "/author-priya.png",
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      category: "Destination Guide",
      tags: ["Goa", "Beaches", "Culture", "Food"],
      image: "/blog-goa-guide.png",
    },
  }

  return posts[slug as keyof typeof posts] || null
}

interface BlogPostPageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogPost post={post} />
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
