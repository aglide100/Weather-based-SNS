export type WeatherProps = {
  address: string;
  humidity: number;
  kind: "rainy" | "cloudy" | "sunny" | "snow";
  temp: number;
};

export const TodayWeatherData: WeatherProps = {
  humidity: 37,
  temp: 7,
  address: "부산광역시 사상구",
  kind: "rainy",
};
