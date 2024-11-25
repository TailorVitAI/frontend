// @ts-nocheck
export function chopString(str) {
  if (!str) {
    return '-';
  }
  if (str.length < 12) {
    return str;
  }
  return str.slice(0, 5) + "..." + str.slice(-5);
}

export function convertDateFormat(dateString) {
  const dateObj = new Date(dateString);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const year = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth();
  const day = ("0" + dateObj.getDate()).slice(-2);
  const hours = ("0" + dateObj.getHours()).slice(-2);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);
  const seconds = ("0" + dateObj.getSeconds()).slice(-2);

  const formattedDate = `${monthNames[monthIndex]} ${day}, ${year} - ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}