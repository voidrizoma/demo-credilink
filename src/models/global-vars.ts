export interface EnvVars {
    apiUrl: string
}

// const apiExt= globalVars.apiUrl;
const apiLocal = import.meta.env.VITE_API || "https://flux-api-six.vercel.app/";

export const envVars = {
    apiUrl: apiLocal
}

