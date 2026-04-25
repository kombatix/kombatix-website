"use client";

import { type ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent, type GA4Event } from "@/lib/analytics";

type Variant = ComponentProps<typeof Button>["variant"];
type Size = ComponentProps<typeof Button>["size"];

interface SignupButtonProps {
  event: Extract<
    GA4Event,
    "signup_click_defense" | "signup_click_preauth" | "signup_click_web_portal"
  >;
  href?: string; // default https://app.kombatix.ai/signup
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const DEFAULT_SIGNUP_URL = "https://app.kombatix.ai/signup";

// Client-side wrapper around <Button href=...> that fires a GA4 conversion
// event before the navigation proceeds. Use on primary-CTA signup buttons
// on /, /defense, /preauth.
//
// Because clicking an <a href> with an external URL causes immediate
// navigation, we fire trackEvent synchronously — gtag queues it into
// dataLayer before the network request.
export function SignupButton({
  event,
  href = DEFAULT_SIGNUP_URL,
  variant = "primary",
  size = "lg",
  className,
  children,
}: SignupButtonProps) {
  function handleClick() {
    trackEvent(event);
  }

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
