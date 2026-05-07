import Link from "next/link";
import Logo from "./Logo";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthShell({ title, subtitle, children, footer }: Props) {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-gold opacity-50" />
        <div className="absolute -top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gold-400/10 blur-[120px]" />
      </div>

      <div className="container-prem flex flex-col items-center justify-center py-16">
        <div className="mb-8 text-center">
          <Logo size="md" />
        </div>

        <div className="card-prem w-full max-w-md p-7 sm:p-9">
          <div className="text-center">
            <h1 className="font-display text-3xl font-semibold gold-text">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm leading-6 text-gray-300">{subtitle}</p>
            )}
            <div className="divider-gold mt-4" />
          </div>

          <div className="mt-7">{children}</div>

          {footer && (
            <div className="mt-6 border-t border-gold-400/15 pt-5 text-center text-sm text-gray-300">
              {footer}
            </div>
          )}
        </div>

        <p className="mt-6 max-w-md text-center text-xs text-gray-500">
          באמצעות כניסה אתם מאשרים את{" "}
          <Link href="/terms" className="text-gold-300 hover:text-gold-100">
            תנאי השימוש
          </Link>{" "}
          ו
          <Link href="/privacy" className="text-gold-300 hover:text-gold-100">
            מדיניות הפרטיות
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
