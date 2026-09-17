/** Return the numeronym of `word` (kubernetes -> k8s).
 *
 * Words shorter than three characters have nothing to abbreviate and are
 * returned unchanged; an empty string yields an empty string.
 */
export function numeronym(word: string): string {
  word = word.trim();
  if (word.length < 3) return word;
  return `${word.charAt(0)}${word.length - 2}${word.charAt(word.length - 1)}`;
}

/** Split `word` into the letters a numeronym keeps and counts.
 *
 * `kubernetes` -> `["k", "ubernete", "s"]`; the middle is what the digit
 * stands for. Words too short to abbreviate come back whole with nothing
 * counted.
 */
export function parts(word: string): [string, string, string] {
  word = word.trim();
  if (word.length < 3) return [word, "", ""];
  return [word.charAt(0), word.slice(1, -1), word.charAt(word.length - 1)];
}

/** Return the word encoded in a URL path (`/kubernetes` -> `kubernetes`).
 *
 * Lets `numeronym.me/kubernetes` pre-fill the generator. The root path
 * carries no word and yields an empty string; a path that isn't valid
 * percent-encoding is used as typed.
 */
export function wordFromPath(pathname: string): string {
  const raw = pathname.replace(/^\/+|\/+$/g, "");
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}
