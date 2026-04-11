import NextLink from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  trailingIcon?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base = [
  "inline-flex items-center justify-center gap-2",
  "font-mono label-mono",
  "transition-[background-color,color,border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-precision)]",
  "border",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
  "disabled:opacity-40 disabled:pointer-events-none",
  "active:translate-y-px",
].join(" ");

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-[11px]",
  lg: "h-14 px-8 text-xs",
};

const variants: Record<Variant, string> = {
  primary: [
    "bg-[var(--color-navy-500)] text-white border-[var(--color-navy-500)]",
    "hover:bg-[var(--color-navy-600)] hover:border-[var(--color-navy-600)]",
  ].join(" "),
  secondary: [
    "bg-transparent text-[var(--color-navy-500)] border-[var(--color-navy-500)]",
    "hover:bg-[var(--color-navy-500)] hover:text-white",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--color-navy-500)] border-transparent",
    "hover:bg-[var(--color-navy-500)]/5",
  ].join(" "),
  ink: [
    "bg-[var(--color-accent-500)] text-[var(--color-navy-500)] border-[var(--color-accent-500)]",
    "hover:bg-[var(--color-accent-400)] hover:border-[var(--color-accent-400)]",
  ].join(" "),
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      trailingIcon = false,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const classes = cn(base, sizes[size], variants[variant], className);

    const content = (
      <>
        <span className="tracking-[0.12em] uppercase">{children}</span>
        {trailingIcon && <Icon icon={ArrowUpRight} size="sm" />}
      </>
    );

    if ("href" in props && props.href) {
      const { href, ...rest } = props;
      return (
        <NextLink
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(rest as Record<string, unknown>)}
        >
          {content}
        </NextLink>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);
