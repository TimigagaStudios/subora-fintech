const KEY = "subora_authed";

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}

export function setAuthed(value: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, value ? "1" : "0");
}

export function clearAuthed() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}