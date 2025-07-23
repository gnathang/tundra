// define the URL
const API_URL = process.env.STRAPI_API_URL;

// header variables
const HEADERS = {
  Authorization: "bearer " + process.env.STRAPI_API_TOKEN,
  "Content-Type": "application/json",
}

// grab our hero text
// we are using the SEO component from the hero. we will import it into our <head>
export async function getHeroText() { 
  const res = await fetch(API_URL + "/hero?populate=SEO", {
    headers: HEADERS
  });
  const json = await res.json();
  return json;
}

// grab our folio intro text
export async function getFolioIntro() { 
  const res = await fetch(API_URL + "/folio-intro", {
    headers: HEADERS
  });
  const json = await res.json();
  return json;
}

export async function getFolioWorks() {
  // note we need to use the PLURAL API name here, because we are getting repeated data
  // we can sort by ID also
  const res = await fetch(API_URL + "/Folios?sort=Ranking:asc&populate=TechName&populate=Thumbnail&populate=Logo", {
    headers: HEADERS
  })
  const json = await res.json();
  return json;
}