"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import moment from "moment";

type UserNote = {
  day: string;
  notes: number;
};

interface UsersNoteChartProps {
  userNotesByDay: UserNote[];
}

const chartConfig = {
  notes: {
    label: "Notas",
  },
} satisfies ChartConfig;

function UsersNoteChart({ userNotesByDay }: UsersNoteChartProps) {
  const formatUserNotesByDay = (userNotesByDay: UserNote[]) => {
    return userNotesByDay.map((note) => ({
      ...note,
      day: moment(note.day).format("DD/MM/YYYY"),
    }));
  };

  const formatDay = (date: string) => {
    return moment(date, "DD/MM/YYYY").format("DD");
  };

  const chartData = formatUserNotesByDay(userNotesByDay);

  return (
    <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min max-h-full">
      <div className="flex flex-col h-full w-full p-4">
        <h2 className="text-center mb-6 text-lg">Suas anotações do mês</h2>
        <div className="h-full w-full">
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] flex-1 h-full w-full aspect-auto"
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={formatDay}
              />
              <YAxis
                domain={[
                  0,
                  Math.ceil(
                    Math.max(...chartData.map((data) => data.notes)) * 1.1
                  ),
                ]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="notes" fill="var(--color-desktop)" radius={2} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default UsersNoteChart;
