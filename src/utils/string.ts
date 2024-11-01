export function fromCharCode(str: string) {
  if (str) {
    return str.replace(/&#(\d+);/g, (m, d) => String.fromCharCode(d));
  }
  return str;
}
