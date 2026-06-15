import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// `staticGET` emits a prebuilt search index as a static file so search works on
// fully static hosts (GitHub Pages). The client (RootProvider) is configured with
// `type: 'static'` to download and query this index in the browser.
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});
