/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CURRENCY_CONVERTER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
