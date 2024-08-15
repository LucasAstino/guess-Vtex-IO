export {}

declare global {
  interface Window {
    google: Google
  }

  type Google = {
    maps: any
  }
}
