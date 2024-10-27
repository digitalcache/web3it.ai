export type TokenDTO = {
    name: string;
    ticker: string;
    imageUrl: string;
    description: string;
    website: string;
    twitter?: string;
    categories?: Array<string> | [];
}

export type CategoriesDTO = {
  data: Array<CategoryType> | []
}

export type CategoryType = {
  id: string;
  value: string;
  label: string;
  name: string;
}
