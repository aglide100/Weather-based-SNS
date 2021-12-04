import { join } from "path";
import React from "react";

export type WeatherIconprops = {
  icon: string | WeahterKind;
};

type WeahterKind = "sunny" | "rainy" | "cloudy" | "snow";

const sunny = <img className="w-full h-full object-fill" src={"/sunny.png"} />;
const rainy = <img className="w-full h-full object-fill" src={"/rainy.png"} />;
const cloudy = (
  <img className="w-full h-full object-fill" src={"/cloudy.png"} />
);
const snow = <img className="w-full h-full object-fill" src={"/snow.png"} />;

const weatherIconData = {
  sunny: sunny,
  rainy: rainy,
  cloudy: cloudy,
  snow: snow,
};

export const WeatherIcon: React.FC<WeatherIconprops> = (
  props: WeatherIconprops
) => {
  console.log(props.icon);
  return <>{weatherIconData[props.icon]}</>;
};

export default WeatherIcon;
