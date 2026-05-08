import { HomePage } from "@/components/HomePage";
import { getHomeMetadata } from "@/lib/homeVariants";

export const metadata = getHomeMetadata("dev", "/dev");

export default function DevPage() {
  return <HomePage variant="dev" homePath="/dev" />;
}
