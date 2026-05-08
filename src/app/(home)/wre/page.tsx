import { HomePage } from "@/components/HomePage";
import { getHomeMetadata } from "@/lib/homeVariants";

export const metadata = getHomeMetadata("wre", "/wre");

export default function WrePage() {
  return <HomePage variant="wre" homePath="/wre" />;
}
