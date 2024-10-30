'use client'
import { useOutsideClick } from "@/common/hooks";
import lang from "@/common/lang";
import { routes } from "@/common/routes";
import debounce from "debounce-promise";
import { createClient } from "@/common/utils/supabase/client";
import { Transition } from "@headlessui/react";
import {
  ChevronDown, PackageSearch,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useRef,
} from "react";
import {
  components,
} from "react-select";
import AsyncSelect from "react-select/async";

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

  const promiseOptions = debounce(async (inputValue: string) => {
    const { data: Subdomains } = await supabase
      .from('Subdomains')
      .select('*')
      .or(`subdomain.ilike."%${inputValue}%",name.ilike."%${inputValue}%"`)
    if (Subdomains?.length) {
      return [
        ...Subdomains.map((subdomain) => ({
          label: `${subdomain.name}`,
          value: `${subdomain.name} (${subdomain.subdomain})`,
          subdomain: subdomain.subdomain,
        })),
      ]
    }
    return []
  }, 1000)

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
      <div className='w-full fixed top-0 left-0 h-screen flex justify-center pt-[200px] md:pt-0 md:items-center backdrop-blur-md z-[9999] bg-black bg-opacity-20'>
        <div ref={searchBoxRef} className="relative font-medium">
          <span className="absolute top-2.5 md:top-1/2 md:-translate-y-1/2 left-3 text-indigo-400 z-10">
            <PackageSearch width={24} height={24} strokeWidth={1.5} />
          </span>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            placeholder={searchIdeasCopy.placeholder}
            components={{
              IndicatorSeparator: () => <span></span>,
              DropdownIndicator: (state) => {
                return <span className={`text-indigo-400 cursor-pointer ${state.selectProps.menuIsOpen ? "rotate-180" : ""}`}><ChevronDown/></span>
              },
              Option: (props) => {
                return (
                  <components.Option {...props}>
                    <div className="flex items-center justify-between">
                      <span className=" font-medium">{props.data.label}</span>
                      <div className="bg-gradient-to-tl from-indigo-500 to-purple-500 rounded-full text-sm px-2 py-1/2 font-medium">
                        <span className="text-white">
                          {props.data.subdomain}
                        </span>
                      </div>
                    </div>
                  </components.Option>
                );
              },
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary25: '#818cf8',
                primary: '#818cf8',
              },
            })}
            noOptionsMessage={() => searchIdeasCopy.noIdeasFound}
            autoFocus={true}
            onChange={(inputValue) => {
              if (inputValue) {
                router.push(routes.projectDetailPath.replace('%subdomain%', inputValue.subdomain))
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
              option: (state) => `${state.isFocused ? "!text-white" : "!text-neutral-600"} transition-all duration-200 ease-in-out active:!bg-[#818cf8] !cursor-pointer capitalize active:!text-white`,
            }}
          />
        </div>
      </div>
    </Transition>
  )
}
