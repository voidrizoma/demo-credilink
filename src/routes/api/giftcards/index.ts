import { RequestHandler } from '@builder.io/qwik-city';
import { envVars } from '~/models/global-vars';

export const onPost: RequestHandler = async (event) => {
  try {
    const body = await event.request.json();

    const token = body?.token;
    const dataCoupon = body?.dataCoupon;

    if (!token || !dataCoupon) {
      console.warn('[API/giftcards] token o dataCoupon faltante');
      await event.json(400, { error: 'Faltan token o datos del cupón' });
      return;
    }

    const response = await fetch(`${envVars.apiUrlFlux}/giftcards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataCoupon),
    });

    const responseData = await response.json();
    await event.json(response.status, responseData);
  } catch (error: any) {
    console.error('Error en proxy /api/giftcards:', error);
    await event.json(500, { error: 'Error al crear el cupón', detail: error.message || error });
  }
};
