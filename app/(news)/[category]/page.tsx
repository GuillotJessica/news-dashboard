import { categories } from '@/app/_types/article';
import { Metadata } from 'next';
import ShowNews from '../DisplayNews';

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  return {
    title: 'News dashboard - ' + params.category,
  };
}

export async function generateStaticParams() {
  return categories.map((category: string) => {
    return {
      category,
    };
  });
}

export default async function Page({ params: { category } }: { params: { category: string } }) {
  return <ShowNews category={category} />;
}
