import lang from '@/common/lang';
import * as Yup from 'yup';

const { createIdea: { validationErrors: validationErrorsCopy } } = lang

export const tokenSchema = Yup.object().shape({
  name: Yup.string().required(validationErrorsCopy.nameRequired).min(1, validationErrorsCopy.nameMinError).max(20, validationErrorsCopy.nameMaxError).trim(),
  ticker: Yup.string().required(validationErrorsCopy.tickerRequired).min(1, validationErrorsCopy.tickerMinError).max(20, validationErrorsCopy.tickerMaxError).trim(),
  imageUrl: Yup.string().required(validationErrorsCopy.logoRequired),
  description: Yup.string().required(validationErrorsCopy.descriptionRequired).min(10, validationErrorsCopy.descriptionMinError).max(1000, validationErrorsCopy.descriptionMaxError),
  categories: Yup.array().of(Yup.string().required(validationErrorsCopy.categoriesRequired)).min(1, validationErrorsCopy.categoriesRequired),
  website: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    validationErrorsCopy.websiteRequired).required(validationErrorsCopy.websiteRequired),
  twitter: Yup
    .string()
    .test(
      'is-correct-url',
      () => validationErrorsCopy.twitterInvalid,
      (value) => {
        if (value) {
          if (value.match(/http(?:s)?:\/\/(?:www\.)?x\.com\/([a-zA-Z0-9_]+)/)) {
            return true
          }
          return false
        } else {
          return true;
        }
      },
    ),
});
