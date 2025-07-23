import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
import { getHeroText } from "@/lib/api";
import { DarkModeSetter } from "@/components/themeSetter";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import type { Metadata } from "next";

// lets make our seo component, this will be used in the <head> of our site
// we get this from our hero text single type in Strapi, which uses the reusable SEO component
export async function generateMetadata(): Promise<Metadata> {
  const heroText = await getHeroText();
  const seo = heroText.data.SEO || {}; // adjust if seo is nested differently

  console.log("SEO Data:", seo);

  return {
    title: seo.metaTitle || "Default site title",
    description: seo.metaDescription || "Default description for your site",
    keywords: seo.keywords ? seo.keywords.split(",").map(k => k.trim()) : undefined,
    robots: seo.metaRobots || "index, follow",
    // canonical: seo.canonical || "https://your-site-url.com",
    viewport: "width=device-width, initial-scale=1",
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.canonical || "https://tundra.org.uk",
      images: seo.shareImage?.data?.attributes?.url
        ? [{ url: seo.shareImage.data.attributes.url }]
        : undefined,
    },
  };
}

export default async function Home() {
  const heroText = await getHeroText();  
  
  return <>
    <Header />
    <DarkModeSetter />
    <main className="py-24">
      <div className="container-large m-auto mt-12">
        <FadeInOnScroll>
          {/* <p className="text-xs mb-4 body-font uppercase">{ heroText.data.Title }</p> */}
          <h1 className="text-5xl md:text-7xl body-font">{heroText.data.Content}</h1>
          { heroText.data.IntroText ? <p className="text-xs md:text-sm mt-5 max-w-xs"> {heroText.data.IntroText }</p> : ''}
          <Link href={heroText.data.link_url} className="text-xs button-pill mt-8 flex items-center">{heroText.data.link_text}</Link>
        </FadeInOnScroll>
      </div>
    </main>
    <Footer />
  </>
}

