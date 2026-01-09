"use client";

import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { DonutChart } from "./chart";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "@/components/redux/hooks";
import { useSearchParams } from "next/navigation";
import { fetchDeviceUsage } from "@/components/redux/action/dashboard/dashboardAction";

type PropsType = {
  timeFrame?: string;
  className?: string;
  data?: {
    name: string;
    percentage: number;
    amount: number;
  }[] | null;
  loading?: boolean;
};

export function UsedDevices({
  timeFrame = "monthly",
  className,
  data,
  loading = false,
}: PropsType) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  // Extract timeFrame from URL params for this specific section
  const extractedTimeFrame = useMemo(() => {
    const selectedTimeFrame = searchParams.get("selected_time_frame");
    if (selectedTimeFrame) {
      const parts = selectedTimeFrame.split(",");
      const usedDevicesPart = parts.find((p) => p.includes("used_devices:"));
      if (usedDevicesPart) {
        return usedDevicesPart.split(":")[1];
      }
    }
    return timeFrame;
  }, [searchParams, timeFrame]);

  // Fetch device usage when timeFrame changes
  useEffect(() => {
    dispatch(fetchDeviceUsage(extractedTimeFrame));
  }, [dispatch, extractedTimeFrame]);

  // Use provided data or fallback to empty data
  const chartData = data || [];

  return (
    <div
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Used Devices
        </h2>

        <PeriodPicker 
          items={["monthly", "yearly"]}
          defaultValue={extractedTimeFrame} 
          sectionKey="used_devices" 
        />
      </div>

      <div className="grid place-items-center">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : chartData.length > 0 ? (
          <DonutChart data={chartData} />
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            No device usage data available
          </div>
        )}
      </div>
    </div>
  );
}
