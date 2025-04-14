import { getAllParkingRates } from "../services/parkingRateService";

export default async function loader() {
  const response = await getAllParkingRates({
    page: 0,
    limit: -1, // No limit
  });

  return {
    parkingRates: response.data.items.map((item) => ({
      id: item.id,
      hourly: item.hourly_rate,
      daily: item.daily_rate,
      monthly: item.monthly_rate,
    })),
  };
}
