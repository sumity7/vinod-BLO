/** Ticket numbers registered from this browser, so the track page can list them. Best effort only. */
const KEY = "hrh-my-tickets";

export type MyTicket = { ticket: string; last4: string; subject: string; at: string };

export function readTickets(): MyTicket[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.slice(0, 10) : [];
  } catch {
    return [];
  }
}

export function saveTicket(t: MyTicket) {
  try {
    const list = [t, ...readTickets().filter((x) => x.ticket !== t.ticket)].slice(0, 10);
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* Private mode or storage blocked: the visitor still has the number on screen. */
  }
}
