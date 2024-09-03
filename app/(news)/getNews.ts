import { Article } from '../_types/article';

export async function getNews(category?: string): Promise<{ articles: Article[]; error: string }> {
  try {
    const { NEWS_API_URL, NEWS_API_KEY } = process.env;
    const url =
      `${NEWS_API_URL}?country=us&apiKey=${NEWS_API_KEY}` +
      (category ? `&category=${category}` : '');
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error('Invalid data format.');
    }

    return {
      articles: data.articles as Article[],
      error: '',
    };
  } catch (error) {
    return {
      articles: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred.',
    };
  }
}
