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

export const dateNowEUA = (day: number) => {
  var dNow = new Date();
  var localdate =
    dNow.getMonth() +
    "-" +
    (dNow.getDate() - 2 + day) +
    "-" +
    dNow.getFullYear();

  return localdate;
};
