
import { getFolioIntro, getFolioWorks } from "@/lib/api"
import LightModeSetter from "@/components/themeSetter";
import Image from "next/image"
import FadeInOnScroll from "@/components/FadeInOnScroll";



export default async function Page() {
  
  const folio = await getFolioWorks();
  const folioIntro = await getFolioIntro();

  // Define responsive grid patterns
  const getGridClass = (index) => {
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

  return (
    <div className="m-auto relative py-12 ">
      <LightModeSetter />
      <FadeInOnScroll className="mt-12">
        <h1 className="text-5xl md:text-7xl body-font">{folioIntro.data.Content}</h1>
        <p className="text-xs md:text-sm mt-4 ml-1">{folioIntro.data.IntroText}</p>
        <a download href="/" className="text-xs button-pill navy mt-4 flex items-center">Download CV</a>
        {/* <Image src="arrow-down.svg" alt="arrow down" width={20} height={36} className="ml-1 mt-5"/> */}
      </FadeInOnScroll>
      <div className="grid md:grid-cols-8 gap-9 md:gap-12 mt-20">
        {folio.data.map((project, index) => (
          <a 
            key={project.id} 
            className={`${getGridClass(index)} project-wrap cursor-pointer block h-full overflow-hidden`}
            href={project.URL ? project.URL : ''}
          >
            <FadeInOnScroll className="h-full flex flex-col relative">
              <Image
                src={process.env.STRAPI_BASE_URL + project.Thumbnail.formats.large.url}
                alt={project.Title}
                width={1000}
                height={1000}
                style={{ width: '100%', height: '100%'}}
                className="project-image object-cover max-h-[80%]"
              />
              {project.Logo?.url && (
                <Image
                  src={process.env.STRAPI_BASE_URL + project.Logo.url}
                  alt={project.Logo.alternativeText || project.Title}
                  width={project.Logo.width}
                  height={project.Logo.height}
                  className="absolute top-2 left-2 w-30 object-contain"
                />
              )}
              <div className="flex justify-between gap-2 items-start mt-2">
                <div className="project-text pb-3">
                  <p className="text-lg">{project.Title}</p>
                  <p className="text-xs text-monospace">{project.Description}</p>
                </div>
                <div className="flex gap-1 items-end mt-1">
                  {project.TechName?.map((item: { Name: string }, idx: number) => (
                    <h6 key={idx} className="text-xs capsule">{item.Name}</h6>
                  ))}
                </div>
              </div>      
            </FadeInOnScroll>
          </a>
        ))}
      </div>
    </div>
  );
}