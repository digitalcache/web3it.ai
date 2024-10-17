import * as Yup from 'yup';

export const tokenSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name for your product').min(1, 'Please enter more than 2 characters').trim(),
  ticker: Yup.string().required('Please enter a name for your ticker').min(1, 'Please enter more than 2 characters').trim(),
  imageUrl: Yup.string().required('Please provide an image link'),
  description: Yup.string().required('Please provide a description for your product'),
  website: Yup.string().required('Please provide a valid link to your website'),
  twitter: Yup.string(),
});