export function getBaseUrl(): string {
  return window.location.hostname === "localhost"
    ? "http://localhost:5173/"
    : `${window.location.protocol}//${window.location.hostname}`;
}
