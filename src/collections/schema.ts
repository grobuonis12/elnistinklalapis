import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

// Pages table
export const pages = sqliteTable('pages', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content'),
  status: text('status').default('draft'),
  createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
}, (table) => ({
  pages_slug_idx: index('pages_slug_idx').on(table.slug),
}));

// Posts table
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content'),
  excerpt: text('excerpt'),
  status: text('status').default('draft'),
  publishedAt: text('published_at'),
  authorId: integer('author_id').references(() => users.id),
  createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
}, (table) => ({
  posts_slug_idx: index('posts_slug_idx').on(table.slug),
  posts_author_idx: index('posts_author_idx').on(table.authorId),
}));

// Categories table
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
}, (table) => ({
  categories_slug_idx: index('categories_slug_idx').on(table.slug),
}));

// Media table
export const media = sqliteTable('media', {
  id: integer('id').primaryKey(),
  filename: text('filename').notNull(),
  mimeType: text('mime_type').notNull(),
  filesize: integer('filesize').notNull(),
  width: integer('width'),
  height: integer('height'),
  alt: text('alt'),
  url: text('url').notNull(),
  createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

// Users table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name'),
  role: text('role').default('user'),
  createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
}, (table) => ({
  users_email_idx: index('users_email_idx').on(table.email),
}));

// Post Categories (junction table)
export const postCategories = sqliteTable('post_categories', {
  postId: integer('post_id').notNull().references(() => posts.id),
  categoryId: integer('category_id').notNull().references(() => categories.id),
}, (table) => ({
  post_categories_post_idx: index('post_categories_post_idx').on(table.postId),
  post_categories_category_idx: index('post_categories_category_idx').on(table.categoryId),
}));

// Post Media (junction table)
export const postMedia = sqliteTable('post_media', {
  postId: integer('post_id').notNull().references(() => posts.id),
  mediaId: integer('media_id').notNull().references(() => media.id),
  type: text('type').notNull(), // e.g., 'featured', 'gallery', etc.
}, (table) => ({
  post_media_post_idx: index('post_media_post_idx').on(table.postId),
  post_media_media_idx: index('post_media_media_idx').on(table.mediaId),
}));

// Redirects table
export const redirects = sqliteTable('redirects', {
  id: integer('id').primaryKey(),
  from: text('from').notNull().unique(),
  to: text('to').notNull(),
  type: text('type').default('301'), // 301 or 302
  createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
}, (table) => ({
  redirects_from_idx: index('redirects_from_idx').on(table.from),
})); 