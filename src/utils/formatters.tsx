export const dateNow = () => {
  var dNow = new Date();
  var localdate =
    dNow.getDate() +
    "/" +
    (dNow.getMonth() + 1) +
    "/" +
    dNow.getFullYear() +
    " " +
    dNow.getHours() +
    ":" +
    dNow.getMinutes();

  return localdate;
};

export const dateBrita = (day: number) => {
  var dNow = new Date();
  var localdate =
    dNow.getMonth() +
    "-" +
    (dNow.getDate() - 2 + day) +
    "-" +
    dNow.getFullYear();

  return localdate;
};

export const dateBitcoin = () => {
  var dNow = new Date();
  var localdate =
    dNow.getFullYear() +
    "" +
    dNow.getMonth().toString().padStart(2, "0") +
    "" +
    dNow.getDate().toString().padStart(2, "0");

  return localdate;
};
