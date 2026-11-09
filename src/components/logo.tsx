export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-icon.svg" alt="OMNIGON" className={className} width={40} height={40} />
  );
}

export function LogoWordmark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-wordmark.svg" alt="OMNIGON" className={className} width={120} height={22} />
  );
}

export function LogoLockup() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-9 w-9" />
      <LogoWordmark className="h-4 w-auto" />
    </span>
  );
}
