import type { ReactNode } from "react";
import { VersionSwitcher } from "@/components/VersionSwitcher";

export default function HomeVariantLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center px-4">
        <div className="pointer-events-auto">
          <VersionSwitcher />
        </div>
      </div>
    </>
  );
}
