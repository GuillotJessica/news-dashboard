'use client';

import { useRouter } from 'next/navigation';
import { categories } from '../(news)/[category]/page';

export const CategoryPicker = () => {
  const router = useRouter();
  const categoriesCapitalizedOptions = categories.map((cat) => {
    const [firstLetter, ...restWord] = cat.split(''); // Type 'string' can only be iteration warning
    const catCapitalized = [firstLetter.toUpperCase(), ...restWord].join('');
    return (
      <option key={cat} value={cat}>
        {catCapitalized + ' news'}
      </option>
    );
  });
  return (
    <div className="content-centerm flex w-full flex-row justify-center">
      <select
        onChange={(e) => {
          if (e.target.value === 'all') router.push('/');
          else router.push('/' + e.target.value);
        }}
        defaultValue={'all'}
        id="categories"
        className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base text-gray-600 focus:outline-none"
      >
        <option className="capitalize" value="all">
          All the news
        </option>
        {categoriesCapitalizedOptions}
      </select>
    </div>
  );
};
