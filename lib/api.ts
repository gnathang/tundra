// checking the environment variables
console.log('🔍 Environment Variables:');
console.log('NEXT_PUBLIC_STRAPI_API_URL:', process.env.NEXT_PUBLIC_STRAPI_API_URL);
console.log('STRAPI_API_TOKEN:', process.env.STRAPI_API_TOKEN);
console.log('NEXT_PUBLIC_STRAPI_BASE_URL:', process.env.NEXT_PUBLIC_STRAPI_BASE_URL);

// define the URL
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// header variables - Try without auth first to test
const HEADERS = {
  Authorization: "Bearer " + process.env.STRAPI_API_TOKEN,
  "Content-Type": "application/json",
}

// helper function to handle API calls with error handling
async function apiCall(endpoint: string) {
  try {
    const res = await fetch(API_URL + endpoint, {
      headers: HEADERS
    });
    
    if (!res.ok) {
      console.warn(`API call failed for ${endpoint}: ${res.status}`);
      return null;
    }
    
    const json = await res.json();
    return json;
  } catch (error) {
    console.warn(`API call error for ${endpoint}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
}

// grab our hero text
export async function getHeroText() { 
  return await apiCall("/hero?populate=SEO");
}

// grab our folio intro text
export async function getFolioIntro() { 
  return await apiCall("/folio-intro?populate=DownloadCVPath");
}

export async function getFolioWorks() {
  return await apiCall("/Folios?sort=Ranking:asc&populate=TechName&populate=Thumbnail&populate=Logo");
}