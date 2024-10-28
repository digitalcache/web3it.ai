'use client'
import {
  useRef,
} from "react";
import { useOutsideClick } from "@/common/hooks";
import { Transition } from "@headlessui/react";
import {
  ChevronDown, PackageSearch,
} from "lucide-react";
import lang from "@/common/lang";
import AsyncSelect from "react-select/async"
import { createClient } from "@/common/utils/supabase/client";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";

const {
  header: {
    searchIdeas: searchIdeasCopy,
  },
} = lang

export const SearchIdeas = ({
  searchEnabled,
  setSearchEnabled,
} : {
  searchEnabled: boolean;
  setSearchEnabled: (value: boolean) => void;
}) => {
  const searchBoxRef = useRef<HTMLDivElement>(null)
  const supabase = createClient();
  const router = useRouter()

  useOutsideClick({
    isVisible: searchEnabled,
    ref: searchBoxRef,
    callback: () => setSearchEnabled(false),
  });

  const promiseOptions = async (inputValue: string) => {
    const { data: Subdomains } = await supabase
      .from('Subdomains')
      .select('subdomain')
      .ilike('subdomain', `%${inputValue}%`)
    if (Subdomains?.length) {
      return [
        ...Subdomains.map((subdomain) => ({
          label: subdomain.subdomain,
          value: subdomain.subdomain,
        })),
      ]
    }
    return []
  }

  return (
    <Transition
      show={searchEnabled}
      enter="transition-all duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className='w-full fixed top-0 left-0 h-screen flex justify-center items-center backdrop-blur-md z-[9999] bg-black bg-opacity-20'>
        <div ref={searchBoxRef} className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-space-cadet z-10">
            <PackageSearch />
          </span>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            placeholder={searchIdeasCopy.placeholder}
            components={{
              IndicatorSeparator: () => <span></span>,
              DropdownIndicator: (state) => {
                return <span className={`text-space-cadet cursor-pointer ${state.selectProps.menuIsOpen ? "rotate-180" : ""}`}><ChevronDown/></span>
              },
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary25: '#7E5EF2',
                primary: '#7E5EF2',
              },
            })}
            noOptionsMessage={() => searchIdeasCopy.noIdeasFound}
            autoFocus={true}
            onChange={(inputValue) => {
              if (inputValue) {
                router.push(routes.projectDetailPath.replace('%subdomain%', inputValue.value))
                setSearchEnabled(false)
              }
            }}
            classNames={{
              container: () => "w-[320px] md:w-[400px]",
              control: () => `!rounded-full py-1.5 !pr-3 !pl-10 !border-0 !ring-0`,
              placeholder: () => '!text-gray-400',
              input: () => '!ring-0 !my-0 cursor-text',
              menu: () => '!rounded-xl overflow-hidden',
              menuList: () => '!py-0',
              option: (state) => `${state.isFocused ? "!text-white" : "!text-neutral-600"} !uppercase transition-all duration-200 ease-in-out active:!bg-[#7E5EF2] !cursor-pointer capitalize active:!text-white`,
            }}
          />
        </div>
      </div>
    </Transition>
  )
}
