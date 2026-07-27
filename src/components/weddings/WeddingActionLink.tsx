import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

type WeddingActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
};

export default function WeddingActionLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: WeddingActionLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const classes = clsx("wedding-action", `wedding-action--${variant}`, className);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
