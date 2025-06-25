export interface EnvVars {
    apiUrl: string;
    refreshToken: string;
  }
  
  const apiFlux = import.meta.env.VITE_API_FLUX;
  const fixedEmail = import.meta.env.VITE_FIXED_EMAIL;
  const refreshToken = import.meta.env.VITE_REFRESH_TOKEN;
  const urlZapier = 'https://hooks.zapier.com/hooks/catch/5474575/398esh3/';
  
  // Validación para evitar errores silenciosos en producción
  if (!apiFlux) {
    console.warn("⚠️ VITE_API_FLUX is not defined. Check your environment variables.");
  }
  
  export const envVars = {
    apiUrlFlux: apiFlux || "https://api.fluxqr.dev/v4", // fallback si estás en desarrollo
    fixedEmail,
    urlZapier,
    refreshToken
  };
  