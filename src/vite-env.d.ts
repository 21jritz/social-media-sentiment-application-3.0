/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TWITTER_API_KEY: string
  readonly VITE_FACEBOOK_API_KEY: string
  readonly VITE_INSTAGRAM_API_KEY: string
  readonly VITE_MASTODON_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}