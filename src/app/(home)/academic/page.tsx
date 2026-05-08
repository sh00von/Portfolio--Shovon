import { HomePage } from "@/components/HomePage";
import { getHomeMetadata } from "@/lib/homeVariants";

export const metadata = getHomeMetadata("academic", "/academic");

export default function AcademicPage() {
  return <HomePage variant="academic" homePath="/academic" />;
}
