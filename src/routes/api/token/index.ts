// src/routes/api/token/index.ts
import { RequestHandler } from '@builder.io/qwik-city';
import { envVars } from '~/models/global-vars';

export const onPost: RequestHandler = async (event) => {
    try {
      const body = {
        refreshToken: envVars.refreshToken,
      };
  
      console.log('Sending body:', body);
  
      const res = await fetch('https://auth.fluxqr.com/v1/commerces/tokens/refreshToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'curl/8.0'
        },
        body: JSON.stringify(body),
      });
  
      const text = await res.text();
      console.log('Status:', res.status);
      console.log('Response text:', text);
  
      try {
        const data = JSON.parse(text);
        event.json(200, data);
      } catch {
        event.json(res.status, { error: 'Invalid JSON', raw: text });
      }
    } catch (err) {
      console.error('Error:', err);
      event.json(500, { error: 'Error sending request' });
    }
  };
  