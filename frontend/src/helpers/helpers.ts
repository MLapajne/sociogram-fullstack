export function getBaseUrl(): string {
  return window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : `${window.location.protocol}//${window.location.hostname}`;
}
