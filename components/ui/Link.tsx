"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { type AnchorHTMLAttributes, type ReactNode, forwardRef } from "react";

// Project-wide replacement for next/link that disables RSC prefetch by
// default. Required because output: 'export' generates RSC payload files
// at paths the Next 16 client requests with the wrong URL shape, causing
// console 404s on every Link in the viewport.
//
// Spec: every page must import this Link instead of next/link.
//
// Override the default by passing prefetch={true} on a specific Link
// instance (rarely necessary on a static-export site).

type LinkProps = NextLinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
    children: ReactNode;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ prefetch = false, ...rest }, ref) {
    return <NextLink ref={ref} prefetch={prefetch} {...rest} />;
  },
);
