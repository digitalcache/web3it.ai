import * as Yup from 'yup';

export const tokenSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name for your product').min(1, 'Please enter more than 2 characters').max(20, 'Please enter less than 20 characters').trim(),
  ticker: Yup.string().required('Please enter a name for your ticker').min(1, 'Please enter more than 2 characters').max(20, 'Please enter less than 20 characters').trim(),
  imageUrl: Yup.string().required('Please provide an image link'),
  description: Yup.string().required('Please provide a description for your product').min(10, 'Please enter more than 10 characters').max(20, 'Please enter less than 250 characters'),
  website: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Please provide a valid link to your website').required('Please provide a valid link to your website'),
  twitter: Yup
    .string()
    .test(
      'is-correct-url',
      () => 'Please provide a valid X link',
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