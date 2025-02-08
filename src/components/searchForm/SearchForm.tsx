import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormikContext, Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import useDebounce from '../../hooks/debounce.hook';
import Schema from './schema';
import './searchForm.scss';

type Props = {
  setQueryStr: Dispatch<SetStateAction<string>>;
};

type Fields = {
  title: string;
  artist_title: string;
  place_of_origin: string;
  style_title: string;
  start_year: string;
  end_year: string;
};

const AutoSubmitData = ({ setQueryStr }: Props) => {
  const { values, isValid, dirty } = useFormikContext<Fields>();

  useEffect(() => {
    if (!dirty) {
      setQueryStr('');
    } else if (isValid) {
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
  }, [values]);

  return null;
};

const SearchForm = ({ setQueryStr }: Props) => {
  const initialValues: Fields = {
    title: '',
    artist_title: '',
    place_of_origin: '',
    style_title: '',
    start_year: '',
    end_year: '',
  };
  const debounce = useDebounce();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(Schema)}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ handleChange, handleBlur, errors }) => {
        const debouncedChangeHandler = debounce(handleChange, 500);

        return (
          <Form className="search_form">
            <div className="">
              <input
                className={`search_form__input ${errors.title ? 'input_error' : ''}`}
                onChange={debouncedChangeHandler}
                onBlur={handleBlur}
                name="title"
                placeholder="Enter art title..."
              />
              {errors.title && (
                <p className="search_form__error">{errors.title}</p>
              )}
            </div>
            <div className="">
              <input
                className={`search_form__input ${errors.artist_title ? 'input_error' : ''}`}
                onChange={debouncedChangeHandler}
                onBlur={handleBlur}
                name="artist_title"
                placeholder="Enter artist..."
              />
              {errors.artist_title && (
                <p className="search_form__error">{errors.artist_title}</p>
              )}
            </div>
            <div className="">
              <input
                className={`search_form__input ${errors.place_of_origin ? 'input_error' : ''}`}
                onChange={debouncedChangeHandler}
                onBlur={handleBlur}
                name="place_of_origin"
                placeholder="Enter place of origin..."
              />
              {errors.place_of_origin && (
                <p className="search_form__error">{errors.place_of_origin}</p>
              )}
            </div>
            <div className="">
              <input
                className={`search_form__input ${errors.style_title ? 'input_error' : ''}`}
                onChange={debouncedChangeHandler}
                onBlur={handleBlur}
                name="style_title"
                placeholder="Enter style..."
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
                />
                <input
                  className={`search_form__input ${errors.end_year ? 'input_error' : ''}`}
                  onChange={debouncedChangeHandler}
                  onBlur={handleBlur}
                  name="end_year"
                  placeholder="To"
                />
              </div>
              {errors.start_year && (
                <p className="search_form__error">{errors.start_year}</p>
              )}
              {errors.end_year && (
                <p className="search_form__error">{errors.end_year}</p>
              )}
            </div>
            <AutoSubmitData setQueryStr={setQueryStr} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchForm;
