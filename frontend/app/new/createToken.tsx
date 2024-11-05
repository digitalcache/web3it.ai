import {
  Loader,
  MultiSelectAndCustomTags,
} from '@/common/components/atoms';
import Image from 'next/image';
import {
  Controller,
} from "react-hook-form";
import { MultiValue } from "react-select";
import { Input } from '@/common/components/molecules';
import { v4 } from "uuid";
import {
  Button,
  TextArea,
} from '@/common/components/atoms';
import { blurDataUrl } from '@/common/utils/blurDataUrl';
import lang from '@/common/lang';
import { ImageSelectionAndUpload } from './imageSelectionAndUpload';
import { useCreateToken } from './useCreateToken';
import { CategoryType } from './types';

const { createIdea: { form: formCopy } } = lang

export const CreateToken = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    setValue,
    getValues,
    ideaCreatedThroughAI,
    imageProcessing,
    isIdeaFetching,
    isLoading,
    isPending,
    isSupabaseSubmitting,
    categories,
    isCategoriesLoading,
    mutateCategories,
    addCategory,
    isAddingCategory,
    trigger,
  } = useCreateToken()

  const onCreateOption = async (option:string) => {
    const newCategory = {
      value: option,
      id: v4(),
    }
    await addCategory(newCategory);
    setValue("categories", [...getValues("categories") || [], newCategory.id.toString()]);
    mutateCategories();
  }

  const createOptionValue = (field: string[]) => {
    const ans = categories?.flatMap((category) => field?.includes(category.id.toString()) ? category : []);
    return ans;
  }
  return (
    <>
      {(isPending || isLoading || isSupabaseSubmitting || imageProcessing || isIdeaFetching) && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[800px] relative bg-gradient-to-r overflow-hidden from-indigo-500 to-purple-500 w-full rounded-2xl pt-8 flex flex-col gap-4'>
        <div className='bg-gradient-to-t from-white to-transparent backdrop-blur-3xl blur-[200px] absolute bottom-0 left-0 w-full h-[400px] -z-[0]'></div>
        <div className="px-4 md:px-8 relative flex gap-4 flex-col md:gap-2 md:flex-row">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({
              field, fieldState,
            }) => {
              const { error } = fieldState;
              const {
                ref, ...fieldProperties
              } = field;
              return (
                <Input
                  id={field.name}
                  labelText={formCopy.name}
                  placeholder="Web3It.AI"
                  error={!!error}
                  errorMessage={error?.message}
                  {...fieldProperties}
                  width="w-full"
                />
              )
            }}
          />
          <Controller
            name="ticker"
            control={control}
            rules={{ required: true }}
            render={({
              field, fieldState,
            }) => {
              const { error } = fieldState;
              const {
                ref, ...fieldProperties
              } = field;
              return (
                <Input
                  id={field.name}
                  labelText={formCopy.ticker}
                  placeholder="Ticker"
                  error={!!error}
                  errorMessage={error?.message}
                  {...fieldProperties}
                  width="w-full"
                />
              )
            }}
          />
        </div>
        <div className="px-4 md:px-8 relative">
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({
              field, fieldState,
            }) => {
              const { error } = fieldState;
              const {
                ref, ...fieldProperties
              } = field;
              return (
                <TextArea
                  id={field.name}
                  labelText={formCopy.description}
                  placeholder="Describe your idea"
                  error={!!error}
                  errorMessage={error?.message}
                  {...fieldProperties}
                  width="w-full"
                />
              )
            }}
          />
        </div>
        <div className="px-4 md:px-8 relative">
          <Controller
            name="categories"
            control={control}
            rules={{ required: true }}
            render={({
              field, fieldState,
            }) => {
              const { error } = fieldState;
              const onChangeMulti = (selected: MultiValue<CategoryType> | null) => {
                field.onChange(selected?.map((category) => category.id.toString()) || []);
              };
              return (
                <MultiSelectAndCustomTags
                  id={field.name}
                  labelText={formCopy.category}
                  placeholder="Security, NFT, DeFi, etc."
                  isLoading={isCategoriesLoading || isAddingCategory}
                  onCreateOption={onCreateOption}
                  onChange={onChangeMulti}
                  value={createOptionValue(field.value || [])}
                  options={categories}
                  error={!!error}
                  errorMessage={error?.message}
                />
              )
            }}
          />
        </div>
        <div className="px-4 md:px-8 relative">
          <Controller
            name="imageUrl"
            control={control}
            rules={{ required: true }}
            render={({
              field, fieldState,
            }) => {
              const { error } = fieldState;
              const {
                ref, value,
              } = field;
              return (
                <ImageSelectionAndUpload
                  trigger={trigger}
                  id={field.name}
                  errorField={!!error}
                  errorMessage={error?.message}
                  setValue={setValue}
                  value={value}
                />
              )
            }}
          />
        </div>
        {ideaCreatedThroughAI && getValues('website') ? (
          <div className="px-4 md:px-8 relative">
            <label  className={`block text-sm font-medium text-white`}>
              {formCopy.website}
            </label>
            <div className="w-full h-auto rounded-xl overflow-hidden mt-2 bg-white/50">
              <Image
                src={getValues('website')}
                alt="pinata"
                width={400}
                height={200}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                className="w-full h-auto"
                quality={50}
              />
            </div>
          </div>
        ) : null}
        <div className="px-4 md:px-8 relative flex gap-4 flex-col md:gap-2 md:flex-row">
          {!ideaCreatedThroughAI ? (
            <Controller
              name="website"
              control={control}
              rules={{ required: true }}
              render={({
                field, fieldState,
              }) => {
                const { error } = fieldState;
                const {
                  ref, ...fieldProperties
                } = field;
                return (
                  <Input
                    id={field.name}
                    labelText={formCopy.website}
                    placeholder="https://web3it.ai"
                    error={!!error}
                    errorMessage={error?.message}
                    {...fieldProperties}
                    width="w-full"
                  />
                )
              }}
            />
          ) : null}
          <Controller
            name="twitter"
            control={control}
            render={({
              field, fieldState,
            }) => {
              const { error } = fieldState;
              const {
                ref, ...fieldProperties
              } = field;
              return (
                <Input
                  id={field.name}
                  labelText={formCopy.twitter}
                  placeholder="https://x.com/justweb3it"
                  error={!!error}
                  errorMessage={error?.message}
                  {...fieldProperties}
                  width="w-full"
                />
              )
            }}
          />
        </div>
        <div className='flex px-4 md:px-0 justify-center mt-8 pb-8 relative'>
          <Button
            size="md"
            type='submit'
            variant="primary"
            className="transition-all gap-2 w-full md:w-auto duration-150 disabled:bg-space-cadet/40 bg-space-cadet hover:bg-space-cadet/80 font-medium"
          >
            {formCopy.submitLabel}
          </Button>
        </div>
      </form>
    </>
  )
}
