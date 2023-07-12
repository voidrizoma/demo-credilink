export interface EnvVars {
    apiUrl: string
}

// const apiExt= globalVars.apiUrl;
// const apiLocal = import.meta.env.VITE_API || "https://flux-api-six.vercel.app/";
const apiLocal = import.meta.env.VITE_API || "http://localhost:3000/";
const apiFlux = import.meta.env.VITE_API_FLUX || "https://sandbox.fluxqr.com/v3";

export const envVars = {
    apiUrl: apiLocal,
    apiUrlFlux: apiFlux
}

