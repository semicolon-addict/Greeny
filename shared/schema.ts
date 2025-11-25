import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content"),
  date: text("date").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true });
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true, createdAt: true });
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  project: text("project").notNull(),
  sector: text("sector").notNull(),
  role: text("role").notNull(),
  value: text("value").notNull(),
  status: text("status").notNull().default("Closed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, createdAt: true });
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export const vacancies = pgTable("vacancies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  isActive: integer("is_active").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVacancySchema = createInsertSchema(vacancies).omit({ id: true, createdAt: true });
export type InsertVacancy = z.infer<typeof insertVacancySchema>;
export type Vacancy = typeof vacancies.$inferSelect;
