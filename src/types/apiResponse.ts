import { Cards } from './cards';

type Pagination = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url?: string;
};

export type ApiResponse = {
  pagination: Pagination;
  data: Cards;
  config: {
    iiif_url: string;
    website_url: string;
  };
};
