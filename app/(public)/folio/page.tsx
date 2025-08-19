import LightModeSetter from "@/components/themeSetter";
import Image from "next/image"
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { getFolioIntro, getFolioWorks } from "@/lib/api";

// types
type Project = {
  id: string | number;
  Title: string;
  Description: string;
  URL?: string;
  Thumbnail: {
    formats: {
      large: {
        url: string;
      };
    };
  };
  Logo?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  Agency?: boolean;
  TechName?: { Name: string }[];
};

type FolioWorksResponse = {
  data: Project[];
};

type DownloadCV = {
  id: number;
  documentId: string;
  name: string;
  url: string;
  // Add other known properties here if needed, or remove the index signature
};

type FolioIntroResponse = {
  data: {
    Content: string;
    IntroText: string;
    DownloadCVPath: DownloadCV;
  };
};

export default async function Page() {
  const folio: FolioWorksResponse = await getFolioWorks();
  const folioIntro: FolioIntroResponse = await getFolioIntro();

  // Define responsive grid patterns
  const getGridClass = (index: number): string => {
    const patterns = [
      'md:col-span-5 md:row-span-3',
      'md:col-span-3 md:row-span-3', 
      'md:col-span-3 md:row-span-3',
      'md:col-span-5 md:row-span-3',
      'md:col-span-3 md:row-span-3',
      'md:col-span-5 md:row-span-3',
      'md:col-span-4 md:row-span-3',
      'md:col-span-5 md:row-span-3',
      'md:col-span-4 md:row-span-3',
      'md:col-span-4 md:row-span-4',
      'md:col-span-4 md:row-span-3',
      'md:col-span-4 md:row-span-3',
    ];
    return patterns[index % patterns.length];
  };
  
  console.log(folioIntro);

  return (
    <div className="m-auto relative py-12 ">
      <LightModeSetter />
      <FadeInOnScroll className="mt-12">
        <h1 className="text-5xl md:text-7xl body-font">{folioIntro?.data?.Content ?? ""}</h1> 
        <p className="text-xs md:text-sm mt-4 ml-1">{folioIntro?.data?.IntroText ?? ""}</p>
        <a download href={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${folioIntro?.data?.DownloadCVPath?.url ?? ""}`} className="text-xs button-pill navy mt-4 flex items-center">Download CV</a>
        {/* <Image src="arrow-down.svg" alt="arrow down" width={20} height={36} className="ml-1 mt-5"/> */}
      </FadeInOnScroll>

      <div className="grid md:grid-cols-8 gap-9 md:gap-12 mt-20">
        {folio?.data?.map((project, index) => {
          console.log(process.env.IMAGE_URL)
          console.log(process.env.NEXT_PUBLIC_STRAPI_API_URL)

          const thumbnailUrl = project?.Thumbnail?.formats?.large?.url
            ? process.env.NEXT_PUBLIC_STRAPI_BASE_URL + project.Thumbnail.formats.large.url
            : "/placeholder.png"; // fallback image

          const logoUrl = project?.Logo?.url
            ? process.env.NEXT_PUBLIC_STRAPI_BASE_URL + project.Logo.url
            : null;

          return (
            <a
              key={project.id}
              className={`${getGridClass(index)} project-wrap cursor-pointer block h-full overflow-hidden`}
              href={project.URL || "#"}
            >
              <FadeInOnScroll className="h-full flex flex-col relative">
                {thumbnailUrl && (
                  <Image
                    src={thumbnailUrl}
                    alt={project.Title || "Project Image"}
                    width={1000}
                    height={1000}
                    style={{ width: "100%", height: "100%" }}
                    className="project-image object-cover max-h-[80%]"
                  />
                )}

                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={project.Logo?.alternativeText || project.Title}
                    width={project.Logo?.width || 100}
                    height={project.Logo?.height || 50}
                    className="absolute top-2 left-2 w-30 object-contain"
                  />
                )}

                {project.Agency && (
                  <Image
                    src="/dd-logo-white.svg"
                    alt="Agency Logo"
                    width={100}
                    height={50}
                    className="absolute top-2 right-2 object-contain"
                  />
                )}

                <div className="flex justify-between gap-2 items-start mt-2">
                  <div className="project-text pb-3">
                    <p className="text-lg">{project.Title ?? ""}</p>
                    <p className="text-xs text-monospace mt-2">{project.Description ?? ""}</p>
                  </div>
                  <div className="flex gap-1 items-end mt-1">
                    {project.TechName?.map((item, idx) => (
                      <h6 key={idx} className="text-xs capsule">{item?.Name}</h6>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            </a>
          );
        })}
      </div>
    </div>
  );
}