import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  image: text('image').notNull(),
  author: text('author').notNull().default('SecuriTrust'),
  category: text('category').notNull(),
  slug: text('slug').notNull().unique(),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const stripeEvents = sqliteTable('stripe_events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: text('event_id').notNull().unique(),
  eventType: text('event_type').notNull(),
  processed: integer('processed', { mode: 'boolean' }).default(false),
  payload: text('payload').notNull(),
  createdAt: text('created_at').notNull(),
});

export const esignatureEvents = sqliteTable('esignature_events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: text('event_id').notNull().unique(),
  contractId: text('contract_id').notNull(),
  eventType: text('event_type').notNull(),
  processed: integer('processed', { mode: 'boolean' }).default(false),
  payload: text('payload').notNull(),
  createdAt: text('created_at').notNull(),
});

export const uploadedFiles = sqliteTable('uploaded_files', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  uploadedBy: text('uploaded_by'),
  ipAddress: text('ip_address'),
  createdAt: text('created_at').notNull(),
});