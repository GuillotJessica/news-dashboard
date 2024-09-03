import { Article } from '../news/_types/article';
import { ArticleCard } from './ArticleCard';

export async function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <div className="mx-auto grid max-w-screen-2xl grid-cols-12 py-16 lg:py-32">
      <div className="col-span-10 col-start-2 grid grid-cols-12 gap-6 sm:gap-8 lg:gap-16">
        {articles.map((article: Article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
}
