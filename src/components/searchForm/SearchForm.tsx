import {
  Dispatch,
  SetStateAction,
  RefObject,
  useEffect,
  useState,
} from 'react';
import { useFormikContext, Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useSearchFormContext } from 'src/App';
import useDebounce from 'hooks/debounce.hook';
import Schema from './schema';
import './searchForm.scss';

export type Fields = {
  title: string;
  artist_title: string;
  place_of_origin: string;
  style_title: string;
  start_year: string;
  end_year: string;
};

type Props = {
  setQueryStr: Dispatch<SetStateAction<string>>;
  fields: RefObject<Fields>;
};

const AutoSubmitData = ({ setQueryStr, fields }: Props) => {
  const { values, isValid } = useFormikContext<Fields>();
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  useEffect(() => {
    if (Object.values(values).every((val) => !val)) {
      setQueryStr('');
    } else if (isValid && !isInitial) {
      const { start_year, end_year, ...fields } = values;
      const entries = Object.entries(fields).filter((item) => item[1]);
      let index = entries.length;

      setQueryStr(
        entries.reduce(
          (str, [key, val], i) =>
            str + `&query[bool][must][${i}][match][${key}]=${val}`,
          ''
        ) +
          (start_year
            ? `&query[bool][must][${index++}][range][date_end][gte]=${start_year}`
            : '') +
          (end_year
            ? `&query[bool][must][${index}][range][date_end][lte]=${end_year}`
            : '')
      );
    }

    fields.current = values;
  }, [values]);

  return null;
};

const SearchForm = () => {
  const { fields, setQueryStr } = useSearchFormContext();
  const debounce = useDebounce();

  return (
    <Formik
      initialValues={fields.current}
      validationSchema={toFormikValidationSchema(Schema)}
      validateOnMount
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ handleChange, handleBlur, errors, initialValues }) => {
        const debouncedChangeHandler = debounce(handleChange, 500);

        return (
          <Form className="search_form">
            <div>
              <input
                className={`search_form__input ${errors.title ? 'input_error' : ''}`}
                onChange={debouncedChangeHandler}
                onBlur={handleBlur}
                name="title"
                placeholder="Enter art title..."
                defaultValue={initialValues.title}
              />
              {errors.title && (
                <p className="search_form__error">{errors.title}</p>
              )}
            </div>
            <div>
              <input
                className={`search_form__input ${errors.artist_title ? 'input_error' : ''}`}
                onChange={debouncedChangeHandler}
                onBlur={handleBlur}
                name="artist_title"
                placeholder="Enter artist..."
                defaultValue={initialValues.artist_title}
              />
              {errors.artist_title && (
                <p className="search_form__error">{errors.artist_title}</p>
              )}
            </div>
            <div>
              <input
                className={`search_form__input ${errors.place_of_origin ? 'input_error' : ''}`}
                onChange={debouncedChangeHandler}
                onBlur={handleBlur}
                name="place_of_origin"
                placeholder="Enter place of origin..."
                defaultValue={initialValues.place_of_origin}
              />
              {errors.place_of_origin && (
                <p className="search_form__error">{errors.place_of_origin}</p>
              )}
            </div>
            <div>
              <input
                className={`search_form__input ${errors.style_title ? 'input_error' : ''}`}
                onChange={debouncedChangeHandler}
                onBlur={handleBlur}
                name="style_title"
                placeholder="Enter style..."
                defaultValue={initialValues.style_title}
              />
              {errors.style_title && (
                <p className="search_form__error">{errors.style_title}</p>
              )}
            </div>
            <div>
              <div className="search_form__years_wrapper">
                <p>Years:</p>
                <input
                  className={`search_form__input ${errors.start_year ? 'input_error' : ''}`}
                  onChange={debouncedChangeHandler}
                  onBlur={handleBlur}
                  name="start_year"
                  placeholder="From"
                  defaultValue={initialValues.start_year}
                />
                <input
                  className={`search_form__input ${errors.end_year ? 'input_error' : ''}`}
                  onChange={debouncedChangeHandler}
                  onBlur={handleBlur}
                  name="end_year"
                  placeholder="To"
                  defaultValue={initialValues.end_year}
                />
              </div>
              {errors.start_year && (
                <p className="search_form__error">{errors.start_year}</p>
              )}
              {errors.end_year && (
                <p className="search_form__error">{errors.end_year}</p>
              )}
            </div>
            <AutoSubmitData setQueryStr={setQueryStr} fields={fields} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchForm;
