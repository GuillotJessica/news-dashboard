import { Article } from '../news/_types/article';

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

export const ArticleCard = ({
  article: { title, publishedAt, source, url },
}: {
  article: Article;
}) => {
  const parseDate = new Date(publishedAt);
  return (
    <div className="md:md-0 col-span-12 mb-6 max-w-sm rounded-lg border p-4 shadow-lg sm:col-span-6 lg:col-span-4">
      <a href={url}>
        <div className="mb-3 flex items-center">
          <span className="font-display mr-2 inline-flex items-center rounded-full bg-red-500 px-3 py-0.5 text-xs font-bold capitalize leading-5 text-white">
            {source.name}
          </span>
          <p className="font-mono text-xs font-normal text-black opacity-75">
            {getMonth(parseDate) + '' + parseDate.getDate()}
          </p>
        </div>
        <p className="font-display max-w-sm text-2xl font-bold leading-tight">
          <span className="link-underline link-underline-black text-black">{title}</span>
        </p>
      </a>
    </div>
  );
};
