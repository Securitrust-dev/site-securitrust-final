import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  titleFr: text('title_fr'),
  excerpt: text('excerpt').notNull(),
  excerptFr: text('excerpt_fr'),
  content: text('content').notNull(),
  contentFr: text('content_fr'),
  image: text('image').notNull(),
  author: text('author').notNull().default('SecuriTrust'),
  category: text('category').notNull(),
  tags: text('tags'),
  lang: text('lang').default('fr'),
  source: text('source').default('internal'),
  sourceUrl: text('source_url'),
  slug: text('slug').notNull().unique(),
  slugFr: text('slug_fr').unique(),
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

export const formations = sqliteTable('formations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  thumbnail: text('thumbnail').notNull(),
  price: integer('price').notNull(),
  priceMonthly: integer('price_monthly'),
  duration: text('duration').notNull(),
  level: text('level').notNull(),
  category: text('category').notNull(),
  modules: text('modules').notNull(),
  instructor: text('instructor').notNull(),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const formationPurchases = sqliteTable('formation_purchases', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull(),
  formationSlug: text('formation_slug').notNull(),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  purchaseType: text('purchase_type').notNull(),
  accessToken: text('access_token').notNull().unique(),
  accessTokenExpiry: text('access_token_expiry').notNull(),
  status: text('status').notNull().default('active'),
  customerName: text('customer_name'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const signwellSignatures = sqliteTable('signwell_signatures', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  documentId: text('document_id').notNull().unique(),
  status: text('status').notNull().default('pending'), // pending | completed
  signerEmail: text('signer_email'),
  signerName: text('signer_name'),
  createdAt: text('created_at').notNull(),
  completedAt: text('completed_at'),
});

export const pageViews = sqliteTable('page_views', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: text('session_id').notNull(),
  path: text('path').notNull(),
  referrer: text('referrer'),
  deviceType: text('device_type'),
  country: text('country'),
  ip: text('ip'),
  duration: integer('duration'),
  createdAt: text('created_at').notNull(),
});

export const pentestOrders = sqliteTable('pentest_orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: text('order_id').notNull().unique(),
  paymentIntentId: text('payment_intent_id').notNull().unique(),
  customerEmail: text('customer_email').notNull(),
  customerName: text('customer_name').notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull().default('eur'),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
  expiresAt: text('expires_at').notNull(),
  capturedAt: text('captured_at'),
  canceledAt: text('canceled_at'),
});