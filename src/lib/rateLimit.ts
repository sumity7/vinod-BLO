/** A small in-memory limiter per IP address. Enough to stop a form being flooded from one place. */
export function makeLimiter(windowMs: number, max: number) {
  const hits = new Map<string, number[]>();
  return (request: Request) => {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > max;
  };
}
