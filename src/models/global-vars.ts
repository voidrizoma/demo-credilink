export interface EnvVars {
    apiUrl: string
}

// const apiExt= globalVars.apiUrl;
// const apiLocal = import.meta.env.VITE_API || "https://flux-api-six.vercel.app/";
const apiFlux = import.meta.env.VITE_API_FLUX;
const fixedEmail = import.meta.env.VITE_FIXED_EMAIL;
const urlZapier = 'https://hooks.zapier.com/hooks/catch/5474575/398esh3/';


console.log(apiFlux)

export const envVars = {
    apiUrlFlux: apiFlux,
    // tokenFlux,
    fixedEmail,
    urlZapier
}

