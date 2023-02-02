export interface EnvVars {
    apiUrl: string
}

// const apiExt= globalVars.apiUrl;
// const apiLocal = import.meta.env.VITE_API || "http://127.0.0.1:3000/";
const apiLocal = import.meta.env.VITE_API || "https://flux-api-six.vercel.app/";

export const envVars = {
    apiUrl: apiLocal
}

