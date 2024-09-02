'use client';

import { categories } from '../[category]/page';
import { useParams, useRouter } from 'next/navigation';

export const CategoryPicker = () => {
  const params = useParams<{ category: string }>();
  const router = useRouter();

  return (
    <div className="content-centerm flex w-full flex-row justify-center">
      <select
        onChange={(e) => {
          if (e.target.value === 'all') router.push('/news');
          else router.push('/news/' + e.target.value);
        }}
        defaultValue={'all'}
        id="categories"
        className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base text-gray-600 focus:outline-none"
      >
        <option className="capitalize" value="all">
          All the news
        </option>
        {categories.map((cat) => (
          <option className="capitalize" key={cat} value={cat}>
            {cat + ' news'}
          </option>
        ))}
      </select>
    </div>
  );
};
