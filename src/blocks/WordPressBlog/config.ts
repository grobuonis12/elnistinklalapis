import type { Block } from 'payload';

export type WordPressBlogType = {
  blockType: 'wordPressBlog';
  blockName?: string;
  postsPerPage?: number;
  wordpressUrl: string;
};

export const WordPressBlogBlock: Block = {
  slug: 'wordPressBlog',
  imageURL: '/assets/icons/blog.svg',
  imageAltText: 'WordPress Blog Block',
  labels: {
    singular: 'WordPress Blog',
    plural: 'WordPress Blog Blocks',
  },
  interfaceName: 'WordPressBlogType',
  fields: [
    {
      name: 'blockName',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional name for this block instance',
      },
    },
    {
      name: 'wordpressUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://www.elnis.lt/wp-json/wp/v2/posts',
      admin: {
        description: 'The WordPress REST API URL (e.g., https://example.com/wp-json/wp/v2/posts)',
        placeholder: 'https://example.com/wp-json/wp/v2/posts'
      },
    },
    {
      name: 'postsPerPage',
      type: 'number',
      label: 'Posts Per Page',
      defaultValue: 10,
      admin: {
        description: 'Number of posts to display per page (1-50)',
        step: 1,
      },
    },
  ],
}; 