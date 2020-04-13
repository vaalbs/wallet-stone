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

export const monthLabels: { [key: number]: string } = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

export const daysWithoutWekeend = (month: number, year: number) => {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    // Exclude weekends
    var tmpDate = new Date(date);
    var weekDay = tmpDate.getDay(); // week day
    var day = tmpDate.getDate(); // day

    if (weekDay % 6) {
      // exclude 0=Sunday and 6=Saturday
      days.push(day);
    }

    date.setDate(date.getDate() + 1);
  }
  return days;
};
