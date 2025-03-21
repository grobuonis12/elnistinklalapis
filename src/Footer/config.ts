import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Latest Posts',
              value: 'latest_posts',
            },
            {
              label: 'Tag Cloud',
              value: 'tag_cloud',
            },
            {
              label: 'Custom Links',
              value: 'custom_links',
            },
          ],
        },
        {
          name: 'buttons',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'tag_cloud',
          },
          fields: [
            {
              name: "text",
              label: "Button Text",
              type: "text",
              required: true,
            },
            {
              name: "link",
              label: "Button Link",
              type: "text",
              required: true,
              admin: {
                description: "Enter the page URL (e.g. /nauja-svetaine), not the API URL"
              }
            },
            {
              name: "hexColor",
              label: "Hexagon Color",
              type: "text",
              required: true,
              defaultValue: "#FF5733",
            },
          ],
        },
        {
          name: 'links',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'custom_links',
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
