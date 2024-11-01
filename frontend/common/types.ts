import { SubdomainType } from "@/middleware";

export type IdeaType = {
    creatorAddress: string;
    description: string;
    fundingRaised: string;
    productUrl: string;
    name: string;
    symbol: string;
    tokenAddress: string;
    tokenImageUrl: string;
    tokenCurrentSupply: bigint;
    productScreenshotUrl: string;
    categories: string;
    twitterUrl: string;
}

export type IdeasType = Array<IdeaType>
export type IdeaTypeWithDomain = {
    idea: IdeaType;
    subdomains: Array<SubdomainType>;
}

export type IdeaTypeWithDomains = Array<IdeaTypeWithDomain> | []
