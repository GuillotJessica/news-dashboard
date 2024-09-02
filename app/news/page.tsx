import { Metadata } from 'next';
import { ArticlesList } from './_components/ArticlesList';
import { Article } from './_types/article';
const { NEWS_API_URL, NEWS_API_KEY } = process.env;
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'News dashboard - All the news',
};

export default async function Page() {
  const res = await fetch(`${NEWS_API_URL}?country=us&apiKey=${NEWS_API_KEY}`);
  const data: { articles: Article[] } = await res.json();
  return (
    <div>
      <ArticlesList articles={data.articles} />
    </div>
  );
}
