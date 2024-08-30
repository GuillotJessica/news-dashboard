import { auth, signOut } from 'app/auth';
import Image from 'next/image';
import Link from 'next/link';

export type Article = {
  source: {
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
export function makeUrlFriendly(urlToBe: string, maxLength = 50) {
  // Remove the last '/' if it exists
  if (urlToBe.endsWith('/')) {
    urlToBe = urlToBe.slice(0, -1);
  }

  // Extract the part after the last '/'
  let lastPart = urlToBe.substring(urlToBe.lastIndexOf('/') + 1);

  // Replace spaces with hyphens
  lastPart = lastPart.replace(/\s+/g, '-');

  // Remove any non-alphanumeric characters except hyphens
  lastPart = lastPart.replace(/[^a-z0-9\-]/gi, '');

  // Limit the length of the URL-friendly string
  if (lastPart.length > maxLength) {
    lastPart = lastPart.substring(0, maxLength);

    // Remove trailing hyphen if truncation results in one
    if (lastPart.endsWith('-')) {
      lastPart = lastPart.slice(0, -1);
    }
  }

  return lastPart.toLocaleLowerCase();
}
export const getMonth = (parseDate: Date) => {
  const monthNumber = parseDate.getMonth();
  const monthName = [
    'January',
    'February',
    'Mars',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthName[monthNumber];
};
const ArticleCard = ({
  article: { title, publishedAt, urlToImage, source },
}: {
  article: Article;
}) => {
  const parseDate = new Date(publishedAt);

  return (
    <div
      className="relative flex w-full items-end justify-start bg-cover bg-center text-left"
      style={{ height: '450px', backgroundImage: 'url(' + urlToImage + ')' }}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 mt-20 bg-gradient-to-b from-transparent to-gray-900"></div>
      <div className="absolute left-0 right-0 top-0 mx-5 mt-2 flex items-center justify-between">
        <p className="bg-indigo-600 px-5 py-2 text-xs uppercase text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600">
          {source.name}
        </p>
        <div className="font-regular flex flex-col justify-start text-white">
          <span className="leading-0 text-3xl font-semibold">{parseDate.getDate()}</span>
          <span className="-mt-3">{getMonth(parseDate)}</span>
        </div>
      </div>
      <main className="z-10 p-5">
        <Link
          href={`/news/${makeUrlFriendly(title)}`}
          className="text-md font-regular font-medium leading-7 tracking-tight text-white hover:underline"
        >
          {title}
        </Link>
      </main>
    </div>
  );
};

export default async function NewsDashboard() {
  const news = await fetch(
    'https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=' +
      process.env.NEWS_API_KEY,
  );
  const res = await news.json();
  return (
    <div className="mx-auto max-w-screen-xl p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {res.articles.map((article: Article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
}
