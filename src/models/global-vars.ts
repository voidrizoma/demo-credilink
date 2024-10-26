export interface EnvVars {
    apiUrl: string
}

// const apiExt= globalVars.apiUrl;
// const apiLocal = import.meta.env.VITE_API || "https://flux-api-six.vercel.app/";
const apiLocal = import.meta.env.VITE_API;
const apiFlux = import.meta.env.VITE_API_FLUX;
// const tokenFlux = import.meta.env.VITE_TOKEN;
const fixedEmail = import.meta.env.VITE_FIXED_EMAIL;
const urlZapier = 'https://hooks.zapier.com/hooks/catch/5474575/398esh3/';

export const envVars = {
    apiUrl: apiLocal,
    apiUrlFlux: apiFlux,
    // tokenFlux,
    fixedEmail,
    urlZapier
}

