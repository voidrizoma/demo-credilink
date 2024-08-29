export const getFuturePaymentDate = (days: number) => {
  const futureDate = Date.now() + 86400000 * days;
  const newDate = new Date(futureDate);
  const yyyy = newDate.getFullYear();
  let mm = (newDate.getMonth() + 1).toString(); // Months start at 0!
  let dd = newDate.getDate().toString();

  if (parseInt(dd) < 10) dd = "0" + dd;
  if (parseInt(mm) < 10) mm = "0" + mm;

  const formattedFuture = dd + "/" + mm + "/" + yyyy;

  return formattedFuture;
};

export const getExpDate = () => {
  const today = new Date(); // Get current date
  const addedDays = today.getDate() + 30; // Add 30 days to the current date

  today.setDate(addedDays); // Set the new date with added dayFs

  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = today.getDate();

  // Pad with leading zeros if necessary
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};


export const getTodaysDateInSpanish = () => {
  const today = new Date();
  // const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // const dayOfWeek = daysOfWeek[today.getDay()];
  const dayOfMonth = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${dayOfMonth} de ${month} de ${year}`;
}

export const getFutureDateInSpanish = (daysToAdd: number) => {
  const today = new Date();
  // const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // Add days to the current date
  today.setDate(today.getDate() + daysToAdd);

  // const dayOfWeek = daysOfWeek[today.getDay()];
  const dayOfMonth = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${dayOfMonth} de ${month} de ${year}`;
}
