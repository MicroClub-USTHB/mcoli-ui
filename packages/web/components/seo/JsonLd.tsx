/**
 * Structured data for search engines, rendered as a plain script tag as the Next.js JSON-LD
 * guide recommends. `<` is escaped so page content can never close the script early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
