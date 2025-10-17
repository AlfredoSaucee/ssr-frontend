// app/signin/page.tsx
import { LoginForm } from "@/components/login-form";

export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const callbackUrl =
    (searchParams?.callbackUrl as string | undefined) ?? "/";

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
