export const parseDateToHour = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  }).format(date * 1000);
};

export const parseDateToDay = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date * 1000);
};

export const parseToIcon = (name) => {
  return `/assets/WeatherIcon/${name}.svg`;
};
