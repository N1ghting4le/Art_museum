type Card = {
  id: number;
  title: string;
};

type SearchCard = Card & {
  api_link: string;
};

type ShowCard = Card & {
  artist_title: string | null;
  date_end: number | null;
  image_id: string | null;
};

type Cards = (SearchCard | ShowCard)[];

export type { SearchCard, ShowCard, Cards };
