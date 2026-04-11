"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/atoms";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel?: string;
};

/**
 * Submit button wired to the parent <form>'s pending state via useFormStatus.
 * Falls back gracefully if JS is disabled — the underlying <button type=submit>
 * still submits the form natively.
 */
export function SubmitButton({
  children,
  pendingLabel = "Sending…",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      trailingIcon
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? pendingLabel : children}
    </Button>
  );
}
