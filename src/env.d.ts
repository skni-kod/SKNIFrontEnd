/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VUE_APP_BACK_URL: string;
  readonly VUE_APP_MEDIA_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'markdown-it-emoji' {
  import type { PluginSimple } from 'markdown-it';
  export const full: PluginSimple;
  export const light: PluginSimple;
  export const bare: PluginSimple;
}
