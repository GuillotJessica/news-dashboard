import { ArticlesList } from '@/app/_components/ArticlesList';
import { Article } from '@/app/_types/article';
import { Metadata } from 'next';
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
    <main>
      {/* <CategoryPicker /> */}
      <ArticlesList articles={data.articles} />
    </main>
  );
}
