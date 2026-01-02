import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import DashboardClient from "./DashboardClient";
import ApiTest from "@/components/ApiTest";
import BackendStatus from "@/components/BackendStatus";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BackendStatus />
        <ApiTest />
      </div>
      <DashboardClient selectedTimeFrame={selected_time_frame} />
    </div>
  );
}
