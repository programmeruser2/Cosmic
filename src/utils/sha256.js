export const sha256 = async (s) => {
  const b = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest('SHA-256', b);
  const arr = Array.from(buf);
  const hex = arr.map(x => x.toString(16).padStart(2, '0')).join('');
  return hex;
};
