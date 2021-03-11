export const parseDateToHour = (date) => {
  const parse = new Date(date * 1000);
  const parseDate = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  }).format(parse);

  return parseDate;
};

export const parseDateToDay = (date) => {
  const parse = new Date(date * 1000);
  const parseDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(parse);

  return parseDate;
};

export const parseToIcon = (name) => {
  return `/assets/WeatherIcon/${name}.svg`;
};
