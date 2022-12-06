import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = sanityClient({
    projectId: 'irl0zn8w',
    dataset: 'production',
    apiVersion: '2022-12-01',
    useCdn: true,
    token: process.env.NEXT_PUBRIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source)