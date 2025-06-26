import { server$ } from '@builder.io/qwik-city';

// NOTA IMPORTANTE:
// Las variables de entorno de servidor (como FLUX_REFRESH_TOKEN, FLUX_API_URL, AUTH_API_URL)
// deben estar configuradas en tu entorno de despliegue (Netlify, Vercel, Cloudflare, etc.).
// Accedes a ellas usando process.env.NOMBRE_DE_LA_VARIABLE, NO import.meta.env.
// Estas variables NO estarán disponibles en el cliente.

/**
 * Función server$ que refresca el token de acceso usando el refresh token del servidor.
 * Este accessToken se devuelve al cliente para ser usado en llamadas posteriores.
 *
 * @returns {Promise<string>} El nuevo token de acceso (accessToken).
 * @throws {Error} Si hay un fallo en la configuración del servidor o al refrescar el token.
 */
export const getAccessTokenServer$ = server$(async function(): Promise<string> {
  // Asegúrate de que estas variables de entorno estén definidas en tu servidor
  const FLUX_AUTH_URL = process.env.AUTH_FLUX_API_URL || 'https://auth.fluxqr.dev'; // URL para la API de Auth
  const FLUX_REFRESH_TOKEN = process.env.VITE_TOKEN; // ¡Este es tu refreshToken sensible!

  if (!FLUX_REFRESH_TOKEN) {
    console.error('SERVER ERROR: FLUX_REFRESH_TOKEN no está configurado en las variables de entorno del servidor.');
    throw new Error('Server configuration error: Refresh token missing.');
  }

  let accessToken: string;

  try {
    // 1. Refrescar el Access Token usando el Refresh Token
    console.log('SERVER: Refrescando token de acceso...');
    const refreshRes = await fetch(`${FLUX_AUTH_URL}/v1/commerces/tokens/refreshToken`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ refreshToken: FLUX_REFRESH_TOKEN }),
    });

    if (!refreshRes.ok) {
      const errorBody = await refreshRes.json();
      console.error('SERVER ERROR: Fallo al refrescar el token:', refreshRes.status, errorBody);
      throw new Error(`Failed to refresh token: ${errorBody.message || 'Unknown error'}`);
    }

    const refreshData = await refreshRes.json();
    accessToken = refreshData.token; // Asumiendo que la respuesta tiene una propiedad 'token'
    console.log('SERVER: Token de acceso refrescado exitosamente.');
    
    return accessToken; // SOLO devuelve el accessToken
    
  } catch (refreshErr) {
    console.error('SERVER ERROR: Excepción al refrescar el token:', refreshErr);
    throw new Error(`Authentication error: ${refreshErr instanceof Error ? refreshErr.message : String(refreshErr)}`);
  }
});

// Nota: La función refreshAndCallGiftcardsServer$ original ha sido eliminada.
// Solo la función getAccessTokenServer$ está disponible en el servidor.
