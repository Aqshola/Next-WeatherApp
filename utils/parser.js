export const parseDateToHour = (date) => {
  const parsing = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  }).format(parsing);
};

export const parseDateToDay = (date) => {
  const parsing = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(parsing);
};

export const parseToIcon = (name) => {
  return `/assets/WeatherIcon/${name}.svg`;
};
