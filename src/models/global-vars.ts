export interface EnvVars {
    apiUrl: string
    refreshToken: string
}

// const apiExt= globalVars.apiUrl;
// const apiLocal = import.meta.env.VITE_API || "https://flux-api-six.vercel.app/";
const apiFlux = import.meta.env.VITE_API_FLUX;
const fixedEmail = import.meta.env.VITE_FIXED_EMAIL;
const refreshToken = import.meta.env.VITE_REFRESH_TOKEN;
const urlZapier = 'https://hooks.zapier.com/hooks/catch/5474575/398esh3/';


console.log(apiFlux)

export const envVars = {
    apiUrlFlux: apiFlux,
    // tokenFlux,
    fixedEmail,
    urlZapier,
    refreshToken
}

