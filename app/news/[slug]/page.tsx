// Next.js will invalidate the cache when a

import { Article, getMonth, makeUrlFriendly } from '@/app/news/page';

// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  let news: { articles: Article[] } = await fetch(
    'https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=' +
      process.env.NEWS_API_KEY,
  ).then((res) => res.json());

  return news.articles.map((article) => {
    const slug = makeUrlFriendly(article.title);
    return {
      slug,
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  console.log({ params });
  const news = await fetch(
    'https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=' +
      process.env.NEWS_API_KEY,
  );
  const res = await news.json();
  const article: Article = res.articles.find(
    (art: Article) => makeUrlFriendly(art.title) === params.slug,
  );
  const readableDate = new Date(article.publishedAt);
  const publishedAt =
    readableDate.getDay() + ' ' + getMonth(readableDate) + ' ' + readableDate.getFullYear();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="py-8">
          <h1 className="mb-2 text-3xl font-bold">{article.title}</h1>
          <p className="text-sm text-gray-700">Written by {article.author}</p>
          <p className="text-sm text-gray-500">
            Published on <time dateTime={article.publishedAt}>{publishedAt}</time>
          </p>
        </div>

        <img src={article.urlToImage} alt="Featured image" className="mb-8 h-auto w-full" />

        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto mb-2">
          {article.content}
        </div>

        <a
          className="my-1 rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-800"
          href={article.url}
        >
          Read more...
        </a>
      </div>
    </div>
  );
}
