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
    title: seo.metaTitle || "Tundra | Freelance Web Development in Bristol, Cardiff and the South West",
    description: seo.metaDescription || "Web Development and Design in Bristol, Cardiff and the South West. For small businesses, startups and agencies.",
    keywords: seo.keywords ? seo.keywords.split(",").map((k: string) => k.trim()) : undefined,
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

  // Fail-safe: if heroText or heroText.data is missing, use empty defaults
  const content = heroText?.data?.Content ?? "";
  const introText = heroText?.data?.IntroText ?? "";
  const linkUrl = heroText?.data?.link_url ?? "#";
  const linkText = heroText?.data?.link_text ?? "";

  return (
    <>
      <Header />
      <DarkModeSetter />
      <main className="py-24">
        <div className="container-large m-auto mt-12">
          <FadeInOnScroll>
            <h1 className="text-5xl md:text-7xl body-font">{content}</h1>
            {introText && <p className="text-sm mt-5 max-w-xs">{introText}</p>}
            {linkText && (
              <Link href={linkUrl} className="text-xs button-pill mt-8 flex items-center">
                {linkText}
              </Link>
            )}
          </FadeInOnScroll>
        </div>
      </main>
      <Footer />
    </>
  );
}


