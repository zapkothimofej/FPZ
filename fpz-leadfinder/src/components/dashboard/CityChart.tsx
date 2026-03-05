"use client";

import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CityChartProps {
  data: Array<{ city: string; count: number }>;
}

export function CityChart({ data }: CityChartProps) {
  const router = useRouter();

  return (
    <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <XAxis type="number" stroke="#71717a" fontSize={12} />
        <YAxis
          type="category"
          dataKey="city"
          stroke="#71717a"
          fontSize={12}
          width={75}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#27272a",
            border: "1px solid #3f3f46",
            borderRadius: "8px",
            color: "#fafafa",
          }}
          formatter={(value: number | undefined) => [
            `${value ?? 0} Leads`,
            "Anzahl",
          ]}
        />
        <Bar
          dataKey="count"
          radius={[0, 4, 4, 0]}
          fill="#3b82f6"
          cursor="pointer"
          onClick={(barData: unknown) => {
            if (
              barData &&
              typeof barData === "object" &&
              "city" in barData &&
              typeof (barData as { city: unknown }).city === "string"
            ) {
              router.push(
                `/leads?city=${(barData as { city: string }).city}`
              );
            }
          }}
        />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
