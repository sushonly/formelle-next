"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = "1443147871111165";

// Button labels to watch (lowercase). Edit these if your button text differs.
const ADD_TO_CART_LABELS = ["add to bag", "add to cart"];
const CHECKOUT_LABELS = ["whatsapp"]; // the button that sends the order to WhatsApp

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

function productName() {
  // Uses the product's main heading, falling back to the page title
  const h1 = document.querySelector("h1")?.textContent?.trim();
  return h1 || document.title.split("|")[0].trim();
}

export default function MetaPixel() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  // PageView on every page change + ViewContent on product pages
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      track("PageView");
    }
    if (pathname?.startsWith("/product/")) {
      // small delay so the product heading has rendered
      const t = setTimeout(() => {
        track("ViewContent", {
          content_name: productName(),
          content_type: "product",
          currency: "INR",
        });
      }, 800);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  // AddToCart + InitiateCheckout from button clicks anywhere on the site
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("button, a");
      if (!el) return;
      const text = (el.textContent || "").toLowerCase();
      const href = (el.getAttribute("href") || "").toLowerCase();

      if (ADD_TO_CART_LABELS.some((l) => text.includes(l))) {
        track("AddToCart", {
          content_name: pathname?.startsWith("/product/") ? productName() : undefined,
          currency: "INR",
        });
        return;
      }

      const isWhatsApp =
        CHECKOUT_LABELS.some((l) => text.includes(l)) ||
        href.includes("wa.me") ||
        href.includes("api.whatsapp.com");
      if (isWhatsApp) {
        track("InitiateCheckout", { currency: "INR" });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
