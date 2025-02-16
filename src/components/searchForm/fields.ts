import { Fields } from './schema';

type Field = {
  name: keyof Fields;
  placeholder: string;
};

type FieldArr = Readonly<Readonly<Field>[]>;

const textFields: FieldArr = [
  {
    name: 'title',
    placeholder: 'Enter art title...',
  },
  {
    name: 'artist_title',
    placeholder: 'Enter artist...',
  },
  {
    name: 'place_of_origin',
    placeholder: 'Enter place of origin...',
  },
  {
    name: 'style_title',
    placeholder: 'Enter style...',
  },
];

const yearFields: FieldArr = [
  {
    name: 'start_year',
    placeholder: 'From',
  },
  {
    name: 'end_year',
    placeholder: 'To',
  },
];

export { textFields, yearFields };
