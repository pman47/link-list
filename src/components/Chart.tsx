"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FC } from "react";

interface ChartProps {
  data: { [key: string]: any }[];
  xAxisKey: string;
  xAxisLinesKeys: string[];
}

const Chart: FC<ChartProps> = ({ data, xAxisKey, xAxisLinesKeys }) => {
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={200}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            horizontal={false}
            strokeWidth={"1"}
            stroke="#f5f5f5"
          />
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#aaa" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#aaa" }}
          />
          <Tooltip />
          {xAxisLinesKeys.map((xAxisLinesKey) => (
            <Line
              key={xAxisLinesKey}
              type="monotone"
              dataKey={xAxisLinesKey}
              stroke="#09f"
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
