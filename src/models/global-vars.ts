export interface EnvVars {
    apiUrl: string
}

// const apiExt= globalVars.apiUrl;
// const apiLocal = import.meta.env.VITE_API || "https://flux-api-six.vercel.app/";
const apiLocal = import.meta.env.VITE_API;
const apiFlux = import.meta.env.VITE_API_FLUX;
const tokenFlux = import.meta.env.VITE_TOKEN;

export const envVars = {
    apiUrl: apiLocal,
    apiUrlFlux: apiFlux,
    tokenFlux
}

