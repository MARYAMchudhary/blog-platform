import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    summary: text('summary'),
    created_at: timestamp('created_at').defaultNow(),
})