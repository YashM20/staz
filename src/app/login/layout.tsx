import { Suspense } from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div>
    <Suspense fallback={<div>Loading...</div>}>
    {children}
    </Suspense>
    </div>
}