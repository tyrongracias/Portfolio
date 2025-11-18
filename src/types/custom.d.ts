// Custom ambient types to help TypeScript find browser/node and tooling types
declare global {
  interface ImportMeta {
    url: string;
  }
}

declare module '@vitejs/plugin-react';
declare module 'tailwindcss';
declare module '*.css';
declare module './index.css';

export {};
