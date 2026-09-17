import { numeronym, parts, wordFromPath } from "./n7m";

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const textInput = byId<HTMLInputElement>("text-input");
const result = byId<HTMLElement>("result");
const output = byId<HTMLOutputElement>("output-target");
const partFirst = byId<HTMLSpanElement>("part-first");
const partMiddle = byId<HTMLSpanElement>("part-middle");
const partLast = byId<HTMLSpanElement>("part-last");
const copyButton = byId<HTMLButtonElement>("copy-button");

/** Render the numeronym and the letters it came from; hide it all for empty input. */
function show(word: string): void {
  const abbreviated = numeronym(word);
  const [first, middle, last] = parts(word);
  output.textContent = abbreviated;
  partFirst.textContent = first;
  partMiddle.textContent = middle;
  partLast.textContent = last;
  result.classList.toggle("hidden", abbreviated === "");
  // Every result is a shareable link: numeronym.me/kubernetes.
  const trimmed = word.trim();
  history.replaceState(null, "", trimmed ? `/${encodeURIComponent(trimmed)}` : "/");
}

textInput.addEventListener("input", () => show(textInput.value));

byId<HTMLFormElement>("n7m-form").addEventListener("submit", (event) => {
  event.preventDefault();
  show(textInput.value);
});

for (const link of document.querySelectorAll<HTMLAnchorElement>("#examples a")) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const word = link.dataset.word ?? "";
    textInput.value = word;
    show(word);
  });
}

let copyReset: ReturnType<typeof setTimeout> | undefined;
copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(output.textContent ?? "");
  copyButton.textContent = "Copied";
  clearTimeout(copyReset);
  copyReset = setTimeout(() => (copyButton.textContent = "Copy"), 1500);
});

// numeronym.me/kubernetes pre-fills the input and shows k8s straight away.
const initial = wordFromPath(location.pathname);
if (initial) {
  textInput.value = initial;
  show(initial);
}
