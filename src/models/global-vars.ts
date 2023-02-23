export interface EnvVars {
    apiUrl: string
}

// const apiExt= globalVars.apiUrl;
const apiLocal = import.meta.env.VITE_API || "https://flux-api-six.vercel.app/";
// const apiLocal = import.meta.env.VITE_API || "http://localhost:3000/";

export const envVars = {
    apiUrl: apiLocal
}

