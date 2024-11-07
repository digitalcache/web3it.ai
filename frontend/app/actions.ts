'use server'

import { redirect } from 'next/navigation'
import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { landingPageDescription } from '@/common/constants';

export async function navigate (href: string) {
  redirect(href)
}

export async function generate (input: string) {
  'use server';

  const { object } = await generateObject({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: 'As a founder focused on developing a Minimum Viable Product (MVP) that leverages web3 technologies, you are in need of creating an effective landing page to showcase your product',
    prompt: input,
    maxTokens: 4000,
    schema: z.object({
      ideaName: z.string().describe('Brainstorm a distinctive name for the crowdfunding blockchain application tailored for startups.Try to come with a unique name for the product'),
      ideaLogo: z.string().describe(`
        Generate SVG code for a logo that visually represents our crowdfunding blockchain application. 
        Don't incorporate the name of the idea directly into the design if possible. 
        Choose a color outside the blue spectrum.
        Fit the image into 48px x 48px.
        Keep the background of the image transparent.
        `),
      ideaDescription: z.string().describe('Specify the type of product, its key features, target audience, and what makes it unique. Be concise and direct for clarity. Provide a maximum of 300 character description about the product'),
      ideaTicker: z.string().describe('Come up with a token ticker symbol for the product relevant in crypto today'),
      ideaLandingPage: z.string().describe(landingPageDescription),
    }),
  });
  return object
}
