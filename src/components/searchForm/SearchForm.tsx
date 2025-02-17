import { Dispatch, SetStateAction, RefObject, memo } from 'react';
import { useFormikContext, Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useSearchFormContext } from 'src/App';
import { textFields, yearFields } from './fields';
import { Fields } from './schema';
import useDebounce from 'hooks/debounce.hook';
import useUpdateEffect from 'src/hooks/updateEffect.hook';
import Schema from './schema';
import './searchForm.scss';

type Props = {
  setQueryStr: Dispatch<SetStateAction<string>>;
  fields: RefObject<Fields>;
};

const AutoSubmitData = memo(({ setQueryStr, fields }: Props) => {
  const { values, isValid } = useFormikContext<Fields>();

  useUpdateEffect(() => {
    if (Object.values(values).every((val) => !val)) {
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

    fields.current = values;
  }, [values]);

  return null;
});

const SearchForm = memo(() => {
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
            {textFields.map(({ name, placeholder }) => (
              <div key={name}>
                <input
                  className={`search_form__input ${errors[name] ? 'input_error' : ''}`}
                  onChange={debouncedChangeHandler}
                  onBlur={handleBlur}
                  name={name}
                  placeholder={placeholder}
                  defaultValue={initialValues[name]}
                />
                {errors[name] && (
                  <p className="search_form__error">{errors[name]}</p>
                )}
              </div>
            ))}
            <div>
              <div className="search_form__years_wrapper">
                <p>Years:</p>
                {yearFields.map(({ name, placeholder }) => (
                  <input
                    key={name}
                    className={`search_form__input ${errors[name] ? 'input_error' : ''}`}
                    onChange={debouncedChangeHandler}
                    onBlur={handleBlur}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={initialValues[name]}
                  />
                ))}
              </div>
              {yearFields.map(
                ({ name }) =>
                  errors[name] && (
                    <p key={name} className="search_form__error">
                      {errors[name]}
                    </p>
                  )
              )}
            </div>
            <AutoSubmitData setQueryStr={setQueryStr} fields={fields} />
          </Form>
        );
      }}
    </Formik>
  );
});

export default SearchForm;
