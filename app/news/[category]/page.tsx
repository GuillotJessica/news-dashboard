// Next.js will invalidate the cache when a

import { Metadata } from 'next';
import { Article } from '../_types/article';
import { ArticlesList } from '../../_components/ArticlesList';
const { NEWS_API_URL, NEWS_API_KEY } = process.env;

export const dynamicParams = true;

export const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

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
  const response = await fetch(`${NEWS_API_URL}?category=${category}&apiKey=${NEWS_API_KEY}`);
  const data: { articles: Article[] } = await response.json();
  return (
    <div>
      <ArticlesList articles={data.articles} />
    </div>
  );
}
