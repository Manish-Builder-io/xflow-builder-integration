import { RenderBuilderContent } from '@components/Builderio/RenderBuilderContent';
import { builderFetch } from '@utils/builderRequestWrapper';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page(props: Props) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const slug = params.slug;
  const urlPath = '/' + (slug?.join('/') || '');

  // In editing mode the Builder editor pushes the live draft via postMessage.
  // A server-side fetch would produce a snapshot that conflicts with the SDK's
  // own override fetch, causing a structural hydration mismatch (different block
  // counts) that forces a full client re-render — exactly when the editor sends
  // its initial handshake, dropping it on the now-unmounted component.
  const isEditing = searchParams['__builder_editing__'] === 'true';

  const content = isEditing
    ? null
    : await builderFetch('tools', { userAttributes: { urlPath } });

  const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';
  if (!content && !isPreview) {
    return notFound();
  }

  return <RenderBuilderContent content={content ?? null} model="tools" />;
}
