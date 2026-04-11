/**
 * JSON-LD structured data injector. Renders a <script type="application/ld+json">
 * tag inline so each page can publish its own schema without touching the root layout.
 */

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
