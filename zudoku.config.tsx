import type { ZudokuConfig } from "zudoku";
import { customCss } from "./src/custom";

const myBase = "/duitku-documentation-zudoku";

const config: ZudokuConfig = {
  basePath: myBase,
  metadata: {
    title: "Duitku Disbursement Docs",
    favicon: `${myBase}/logos/logo-duitku.png`,
    // favicon: "/logos/logo-duitku.png",
  },
  search: {
    type: "pagefind",
    maxSubResults: 3, 
  },
  
  site: {
    logo: {
      src: { 
        light: "/logos/logo-duitku.png", 
        dark: "/logos/logo-duitku.png" 
      },
      alt: "Duitku",
      width: "70px",
    },
    footer: {
      position: "center",
      copyright: `© ${new Date().getFullYear()} PT Duitku. All rights reserved.`,
      social: [
        {
          icon: "github",
          href: "https://github.com/duitku", 
        },
        {
          icon: "x",
          href: "https://twitter.com/duitku",
        },
        {
          icon: "instagram", 
          href: "https://duitku.com", 
        }
      ]
    }
  },

  
  theme: {
    light: {
      foreground: "#2D3748", 
      background: "#ffffff",
      card: "#ffffff",
      cardForeground: "#2e3852",
      popover: "#ffffff",
      popoverForeground: "#020817",
      primary: "#1a468d", 
      primaryForeground: "#ffffff",
      secondary: "#f1f5f9",
      secondaryForeground: "#020817",
      muted: "#f7fafc",
      mutedForeground: "#4a5568",
      accent: "#f1f5f9",
      accentForeground: "#020817",
      destructive: "#ef4444",
      destructiveForeground: "#ffffff",
      border: "#e2e8f0",
      input: "#edf2f7",
      ring: "#0284c7",
      radius: "0.3rem",
    },
    dark: {
      background: "#020817",
      foreground: "#f8fafc",
      card: "#020817",
      cardForeground: "#f8fafc",
      popover: "#020817",
      popoverForeground: "#f8fafc",
      primary: "#0ea5e9",
      primaryForeground: "#f8fafc",
      secondary: "#1e293b",
      secondaryForeground: "#f8fafc",
      muted: "#1e293b",
      mutedForeground: "#94a3b8",
      accent: "#1e293b",
      accentForeground: "#f8fafc",
      destructive: "#ef4444",
      destructiveForeground: "#f8fafc",
      border: "#1e293b",
      input: "#1e293b",
      ring: "#0ea5e9",
      radius: "0.5rem",
    },
    customCss: customCss, 
  },

  navigation: [
    {
      type: "category",
      label: "Getting Started",
      icon: "sparkles",
      items: [
        "/introduction",
        "/why-duitku-v2",
        {
          type: "category",
          label: "SNAP Registration & Auth",
          link: "/authentication",
          items: [
            { type: "link", label: "Public and Private Key", to: "/authentication#public-key-and-private-key" },
            { type: "link", label: "Signature", to: "/authentication#signature" },
          ],
        },
        {
          type: "category",
          label: "Transfer Online",
          link: "/transferonline",
          items: [
            { type: "link", label: "Transfer Online Transaction Flow", to: "/transferonline#transaction-flow" },
            { type: "link", label: "Step 1: Inquiry", to: "/transferonline#step-1-validate-account-inquiry" },
            { type: "link", label: "Step 2: Transfer", to: "/transferonline#step-2-execute-transfer" },
          ],
        },
        "/checkstatus", 
        "/checkbalance", 
        "/callback", 
        {
          type: "category",
          label: "Response Code",
          link: { type: "doc", file: "/responsecode" },
          items:[
            { type: "link", label: "Callback Status Code", to: "/responsecode#callback-status-code" },
          ],
        },
        "/sandboxtesting", 
        "/listbank", 
      ],
    },
    {
      type: "link",
      to: "/api-reference",
      label: "API Reference",
      badge: { label: "New", color: "purple" },
    },
  ],

  redirects: [
    { from: "/", to: "/introduction" },
    { from: "/en/introduction", to: "/introduction" }, 
    { from: "/id/introduction", to: "/introduction" } 
  ],
  
  apis: [
    {
      type: "file",
      input: "./apis/disbursement-api.yaml", 
      path: "/api-reference", 
    }
  ],
};

export default config;