import { 
  type User, 
  type InsertUser,
  type Article,
  type InsertArticle,
  type TeamMember,
  type InsertTeamMember,
  type Transaction,
  type InsertTransaction,
  type Vacancy,
  type InsertVacancy,
  users,
  articles,
  teamMembers,
  transactions,
  vacancies
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";
import { eq, desc } from "drizzle-orm";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getAllArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  
  // Team member methods
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;
  
  // Transaction methods
  getAllTransactions(): Promise<Transaction[]>;
  getTransactionById(id: number): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined>;
  deleteTransaction(id: number): Promise<boolean>;
  
  // Vacancy methods
  getAllVacancies(): Promise<Vacancy[]>;
  getActiveVacancies(): Promise<Vacancy[]>;
  getVacancyById(id: number): Promise<Vacancy | undefined>;
  createVacancy(vacancy: InsertVacancy): Promise<Vacancy>;
  updateVacancy(id: number, vacancy: Partial<InsertVacancy>): Promise<Vacancy | undefined>;
  deleteVacancy(id: number): Promise<boolean>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Article methods
  async getAllArticles(): Promise<Article[]> {
    return await db.select().from(articles).orderBy(desc(articles.createdAt));
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    const result = await db.select().from(articles).where(eq(articles.id, id));
    return result[0];
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const result = await db.insert(articles).values(article).returning();
    return result[0];
  }

  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const result = await db.update(articles).set(article).where(eq(articles.id, id)).returning();
    return result[0];
  }

  async deleteArticle(id: number): Promise<boolean> {
    const result = await db.delete(articles).where(eq(articles.id, id));
    return true;
  }

  // Team member methods
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).orderBy(teamMembers.order);
  }

  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    const result = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return result[0];
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const result = await db.insert(teamMembers).values(member).returning();
    return result[0];
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const result = await db.update(teamMembers).set(member).where(eq(teamMembers.id, id)).returning();
    return result[0];
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    const result = await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return true;
  }

  // Transaction methods
  async getAllTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions).orderBy(desc(transactions.createdAt));
  }

  async getTransactionById(id: number): Promise<Transaction | undefined> {
    const result = await db.select().from(transactions).where(eq(transactions.id, id));
    return result[0];
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values(transaction).returning();
    return result[0];
  }

  async updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const result = await db.update(transactions).set(transaction).where(eq(transactions.id, id)).returning();
    return result[0];
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const result = await db.delete(transactions).where(eq(transactions.id, id));
    return true;
  }

  // Vacancy methods
  async getAllVacancies(): Promise<Vacancy[]> {
    return await db.select().from(vacancies).orderBy(desc(vacancies.createdAt));
  }

  async getActiveVacancies(): Promise<Vacancy[]> {
    return await db.select().from(vacancies).where(eq(vacancies.isActive, 1)).orderBy(desc(vacancies.createdAt));
  }

  async getVacancyById(id: number): Promise<Vacancy | undefined> {
    const result = await db.select().from(vacancies).where(eq(vacancies.id, id));
    return result[0];
  }

  async createVacancy(vacancy: InsertVacancy): Promise<Vacancy> {
    const result = await db.insert(vacancies).values(vacancy).returning();
    return result[0];
  }

  async updateVacancy(id: number, vacancy: Partial<InsertVacancy>): Promise<Vacancy | undefined> {
    const result = await db.update(vacancies).set(vacancy).where(eq(vacancies.id, id)).returning();
    return result[0];
  }

  async deleteVacancy(id: number): Promise<boolean> {
    const result = await db.delete(vacancies).where(eq(vacancies.id, id));
    return true;
  }
}

export const storage = new DbStorage();
