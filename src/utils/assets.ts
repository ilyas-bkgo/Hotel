export function assetUrl(path: string): string {
  const config = (window as Window & { isniData?: { themeUri?: string } }).isniData;
  return config?.themeUri ? `${config.themeUri}${path}` : path;
}
