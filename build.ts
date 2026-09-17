/**
 * Build dist/: one self-contained index.html with the compiled Tailwind CSS
 * and the bundled, minified app inlined, plus the favicons. A single
 * request is the fastest possible load for a page this small.
 */
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config";

const outdir = "dist";
await Bun.$`rm -rf ${outdir}`;

const bundle = await Bun.build({
  entrypoints: ["src/main.ts"],
  target: "browser",
  format: "esm",
  minify: true,
});
if (!bundle.success) {
  for (const log of bundle.logs) console.error(log);
  process.exit(1);
}
const [artifact] = bundle.outputs;
if (!artifact) throw new Error("Bun.build produced no output");
const js = await artifact.text();

const css = await postcss([tailwindcss(tailwindConfig)]).process(
  await Bun.file("src/styles.css").text(),
  { from: "src/styles.css" },
);

const html = (await Bun.file("src/index.html").text())
  .replace("/* __CSS__ */", () => css.css.replace(/\s*\n\s*/g, ""))
  .replace("/* __JS__ */", () => js.trim());

await Bun.write(`${outdir}/index.html`, html);
for (const icon of ["favicon.svg", "favicon.ico"]) {
  await Bun.write(`${outdir}/${icon}`, Bun.file(icon));
}

const size = Bun.file(`${outdir}/index.html`).size;
const gzipped = Bun.gzipSync(html).byteLength;
console.log(`${outdir}/index.html  ${(size / 1024).toFixed(1)} KB  (${(gzipped / 1024).toFixed(1)} KB gzipped)`);
