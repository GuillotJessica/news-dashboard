import { Metadata } from 'next';
import ShowNews from './DisplayNews';

export const metadata: Metadata = {
  title: 'News dashboard - All the news',
};

export default async function Page() {
  return <ShowNews />;
}
