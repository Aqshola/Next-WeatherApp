export const parseDateToHour = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  }).format(date);
};

export const parseDateToDay = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
};

export const parseToIcon = (name) => {
  return `/assets/WeatherIcon/${name}.svg`;
};
