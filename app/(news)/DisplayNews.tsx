import { ArticlesList } from '../_components/ArticlesList';
import { getNews } from './getNews';

export const revalidate = 60;

export default async function ShowNews({ category }: { category?: string }) {
  const data = await getNews(category);
  if (data.error)
    return (
      <p className="my-5 whitespace-pre-line text-center text-lg">
        Something went wrong, try agoain later
      </p>
    );
  if (!data.articles.length)
    return (
      <h2 className="my-5 whitespace-pre-line text-center text-lg">
        There is no articles for this category,
        <br /> pick a new category in the navbar
      </h2>
    );
  return <ArticlesList articles={data.articles} />;
}
