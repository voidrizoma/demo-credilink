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
