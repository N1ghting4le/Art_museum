import { ShowCard } from './cards';
import artParams from '@/constants/artParams';

export type FullInfo = ShowCard & {
  [val in (typeof artParams)[number]]: string | null;
};
