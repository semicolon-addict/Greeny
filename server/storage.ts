/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Added a safe in-memory storage fallback while preserving the existing database-backed storage implementation.
Outcome: The app can now serve articles, team members, transactions, and vacancies without returning API 500 errors when DATABASE_URL is unavailable.
Short Description: Reworked the storage layer to choose between Neon-backed persistence and seeded in-memory data for local resilience and cleaner runtime behavior.
/////////////////////////////////////////////////////////////
*/

import { randomUUID } from "node:crypto";
import {
  type Article,
  type InsertArticle,
  type InsertTeamMember,
  type InsertTransaction,
  type InsertUser,
  type InsertVacancy,
  type TeamMember,
  type Transaction,
  type User,
  type Vacancy,
  articles,
  teamMembers,
  transactions,
  users,
  vacancies,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { desc, eq } from "drizzle-orm";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const databaseUrl = process.env.DATABASE_URL?.trim();
const db = databaseUrl ? drizzle(new Pool({ connectionString: databaseUrl })) : null;

function byNewest<T extends { createdAt: Date }>(left: T, right: T) {
  return right.createdAt.getTime() - left.createdAt.getTime();
}

function byOrder(left: TeamMember, right: TeamMember) {
  return left.order - right.order;
}

const seedArticles: Article[] = [
  {
    id: 1,
    type: "publication",
    title: "Website Input: General Requirements",
    summary:
      "Source brief covering required footer policy links, privacy/legal sections, and editable page support requirements.",
    content: null,
    date: "Mar 2026",
    imageUrl: null,
    createdAt: new Date("2026-03-01T08:00:00.000Z"),
  },
  {
    id: 2,
    type: "publication",
    title: "Website Input: Home Page Direction",
    summary:
      "Source brief instruction to use dynamic image/video backgrounds and update core homepage narrative to sustainable advisory positioning.",
    content: null,
    date: "Mar 2026",
    imageUrl: null,
    createdAt: new Date("2026-03-02T08:00:00.000Z"),
  },
  {
    id: 3,
    type: "news",
    title: "Website Input: Contact Details Update",
    summary:
      "Source contact update for head-office address at 2 Norwich Close, Sandown, Sandton, and phone number +27 021 013 7199.",
    content: null,
    date: "Mar 2026",
    imageUrl: null,
    createdAt: new Date("2026-03-03T08:00:00.000Z"),
  },
];

const seedTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Siphokazi Mpanza",
    position: "Managing Director",
    bio: "Qualified chartered accountant with over 16 years of professional experience in finance and economic development advisory.",
    imageUrl: "/kaluba/team-siphokazi.jpeg",
    order: 1,
    createdAt: new Date("2026-01-10T08:00:00.000Z"),
  },
  {
    id: 2,
    name: "Kaluba Chipulu",
    position: "Head of Projects and Infrastructure Advisory",
    bio: "Qualified chartered accountant with over 14 years of project and corporate transaction advisory experience across African infrastructure sectors.",
    imageUrl: "/kaluba/team-kaluba.jpg",
    order: 2,
    createdAt: new Date("2026-01-12T08:00:00.000Z"),
  },
  {
    id: 3,
    name: "Mpho Mogale",
    position: "Senior Associate",
    bio: "Qualified chartered accountant with over 10 years of experience in corporate and project transaction advisory and tax structuring.",
    imageUrl: "/kaluba/team-mpho.jpg",
    order: 3,
    createdAt: new Date("2026-01-14T08:00:00.000Z"),
  },
  {
    id: 4,
    name: "Chipasha Lupekesa",
    position: "Senior Analyst",
    bio: "Transaction advisory professional with over 6 years of experience across energy, telecommunications, and social infrastructure assignments.",
    imageUrl: "/kaluba/team-chipasha.jpg",
    order: 4,
    createdAt: new Date("2026-01-16T08:00:00.000Z"),
  },
  {
    id: 5,
    name: "Thabo Mbatha",
    position: "Advisory Team Member",
    bio: "Listed in the supplied team image set. Detailed profile text was not included in the provided source documents.",
    imageUrl: "/kaluba/team-thabo.jpeg",
    order: 5,
    createdAt: new Date("2026-01-18T08:00:00.000Z"),
  },
  {
    id: 6,
    name: "Lungile Mnyayiza",
    position: "Projects Administrator",
    bio: "Experienced projects administrator with over 13 years of professional experience across project administration, operations, and support functions.",
    imageUrl: "/kaluba/team-lungile.jpeg",
    order: 6,
    createdAt: new Date("2026-01-20T08:00:00.000Z"),
  },
];

const seedTransactions: Transaction[] = [
  {
    id: 1,
    date: "Mar 2026",
    project: "Acquisition of a Stake in DTIC Office Accommodation",
    sector: "Public Infrastructure",
    role: "Financial Advisor",
    value: "R230 Billion",
    status: "Disclosed",
    createdAt: new Date("2026-03-20T08:00:00.000Z"),
  },
  {
    id: 2,
    date: "Feb 2026",
    project: "Integrated Renewable Energy and Resource Efficiency Programme",
    sector: "Renewable Energy",
    role: "Financial and Economic Development Advisor",
    value: "R387 Billion",
    status: "Disclosed",
    createdAt: new Date("2026-02-18T08:00:00.000Z"),
  },
  {
    id: 3,
    date: "Jan 2026",
    project: "National Solar Water Heater Programme",
    sector: "Renewable Energy",
    role: "Financial and Economic Development Advisor",
    value: "R18 Billion",
    status: "Disclosed",
    createdAt: new Date("2026-01-25T08:00:00.000Z"),
  },
  {
    id: 4,
    date: "Jan 2026",
    project: "REIPPPP Bid Window 7",
    sector: "Renewable Energy",
    role: "Financial and Economic Development Advisor",
    value: "R230 Billion",
    status: "Disclosed",
    createdAt: new Date("2026-01-20T08:00:00.000Z"),
  },
  {
    id: 5,
    date: "Jan 2026",
    project: "Battery Energy Storage IPP Programme Bid Window 3",
    sector: "Power and Storage",
    role: "Economic Development Advisor",
    value: "R9.5 Billion",
    status: "Disclosed",
    createdAt: new Date("2026-01-18T08:00:00.000Z"),
  },
  {
    id: 6,
    date: "Jan 2026",
    project: "Battery Energy Storage IPP Programme Bid Window 2",
    sector: "Power and Storage",
    role: "Economic Development Advisor",
    value: "R12.8 Billion",
    status: "Disclosed",
    createdAt: new Date("2026-01-15T08:00:00.000Z"),
  },
  {
    id: 7,
    date: "Jan 2026",
    project: "REIPPPP Bid Window 5",
    sector: "Renewable Energy",
    role: "Financial Advisor",
    value: "R250 Billion",
    status: "Disclosed",
    createdAt: new Date("2026-01-12T08:00:00.000Z"),
  },
  {
    id: 8,
    date: "Jan 2026",
    project: "Biomass Plant Development",
    sector: "Power Generation",
    role: "Financial Advisor",
    value: "R0.6 Billion",
    status: "Disclosed",
    createdAt: new Date("2026-01-10T08:00:00.000Z"),
  },
];

const seedVacancies: Vacancy[] = [];

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;
  getAllTransactions(): Promise<Transaction[]>;
  getTransactionById(id: number): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined>;
  deleteTransaction(id: number): Promise<boolean>;
  getAllVacancies(): Promise<Vacancy[]>;
  getActiveVacancies(): Promise<Vacancy[]>;
  getVacancyById(id: number): Promise<Vacancy | undefined>;
  createVacancy(vacancy: InsertVacancy): Promise<Vacancy>;
  updateVacancy(id: number, vacancy: Partial<InsertVacancy>): Promise<Vacancy | undefined>;
  deleteVacancy(id: number): Promise<boolean>;
}

function getDb() {
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  return db;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await getDb().select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await getDb().select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await getDb().insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllArticles(): Promise<Article[]> {
    return getDb().select().from(articles).orderBy(desc(articles.createdAt));
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    const result = await getDb().select().from(articles).where(eq(articles.id, id));
    return result[0];
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const result = await getDb().insert(articles).values(article).returning();
    return result[0];
  }

  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const result = await getDb().update(articles).set(article).where(eq(articles.id, id)).returning();
    return result[0];
  }

  async deleteArticle(id: number): Promise<boolean> {
    await getDb().delete(articles).where(eq(articles.id, id));
    return true;
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return getDb().select().from(teamMembers).orderBy(teamMembers.order);
  }

  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    const result = await getDb().select().from(teamMembers).where(eq(teamMembers.id, id));
    return result[0];
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const result = await getDb().insert(teamMembers).values(member).returning();
    return result[0];
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const result = await getDb().update(teamMembers).set(member).where(eq(teamMembers.id, id)).returning();
    return result[0];
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    await getDb().delete(teamMembers).where(eq(teamMembers.id, id));
    return true;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return getDb().select().from(transactions).orderBy(desc(transactions.createdAt));
  }

  async getTransactionById(id: number): Promise<Transaction | undefined> {
    const result = await getDb().select().from(transactions).where(eq(transactions.id, id));
    return result[0];
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const result = await getDb().insert(transactions).values(transaction).returning();
    return result[0];
  }

  async updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const result = await getDb().update(transactions).set(transaction).where(eq(transactions.id, id)).returning();
    return result[0];
  }

  async deleteTransaction(id: number): Promise<boolean> {
    await getDb().delete(transactions).where(eq(transactions.id, id));
    return true;
  }

  async getAllVacancies(): Promise<Vacancy[]> {
    return getDb().select().from(vacancies).orderBy(desc(vacancies.createdAt));
  }

  async getActiveVacancies(): Promise<Vacancy[]> {
    return getDb().select().from(vacancies).where(eq(vacancies.isActive, 1)).orderBy(desc(vacancies.createdAt));
  }

  async getVacancyById(id: number): Promise<Vacancy | undefined> {
    const result = await getDb().select().from(vacancies).where(eq(vacancies.id, id));
    return result[0];
  }

  async createVacancy(vacancy: InsertVacancy): Promise<Vacancy> {
    const result = await getDb().insert(vacancies).values(vacancy).returning();
    return result[0];
  }

  async updateVacancy(id: number, vacancy: Partial<InsertVacancy>): Promise<Vacancy | undefined> {
    const result = await getDb().update(vacancies).set(vacancy).where(eq(vacancies.id, id)).returning();
    return result[0];
  }

  async deleteVacancy(id: number): Promise<boolean> {
    await getDb().delete(vacancies).where(eq(vacancies.id, id));
    return true;
  }
}

export class MemStorage implements IStorage {
  private readonly users = new Map<string, User>();
  private articles = [...seedArticles];
  private teamMembers = [...seedTeamMembers];
  private transactions = [...seedTransactions];
  private vacancies = [...seedVacancies];
  private articleId = this.articles.length + 1;
  private teamMemberId = this.teamMembers.length + 1;
  private transactionId = this.transactions.length + 1;
  private vacancyId = this.vacancies.length + 1;

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const createdUser: User = { id: randomUUID(), ...user };
    this.users.set(createdUser.id, createdUser);
    return createdUser;
  }

  async getAllArticles(): Promise<Article[]> {
    return [...this.articles].sort(byNewest);
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.find((article) => article.id === id);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const createdArticle: Article = {
      id: this.articleId++,
      type: article.type,
      title: article.title,
      summary: article.summary,
      content: article.content ?? null,
      date: article.date,
      imageUrl: article.imageUrl ?? null,
      createdAt: new Date(),
    };

    this.articles = [createdArticle, ...this.articles];
    return createdArticle;
  }

  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const existingArticle = await this.getArticleById(id);
    if (!existingArticle) {
      return undefined;
    }

    const updatedArticle: Article = {
      ...existingArticle,
      ...article,
      content: article.content ?? existingArticle.content,
      imageUrl: article.imageUrl ?? existingArticle.imageUrl,
    };
    this.articles = this.articles.map((item) => (item.id === id ? updatedArticle : item));
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<boolean> {
    this.articles = this.articles.filter((article) => article.id !== id);
    return true;
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return [...this.teamMembers].sort(byOrder);
  }

  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.find((member) => member.id === id);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const createdMember: TeamMember = {
      id: this.teamMemberId++,
      name: member.name,
      position: member.position,
      bio: member.bio,
      imageUrl: member.imageUrl ?? null,
      order: member.order ?? 0,
      createdAt: new Date(),
    };

    this.teamMembers = [...this.teamMembers, createdMember].sort(byOrder);
    return createdMember;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existingMember = await this.getTeamMemberById(id);
    if (!existingMember) {
      return undefined;
    }

    const updatedMember: TeamMember = {
      ...existingMember,
      ...member,
      imageUrl: member.imageUrl ?? existingMember.imageUrl,
      order: member.order ?? existingMember.order,
    };
    this.teamMembers = this.teamMembers.map((item) => (item.id === id ? updatedMember : item)).sort(byOrder);
    return updatedMember;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    this.teamMembers = this.teamMembers.filter((member) => member.id !== id);
    return true;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return [...this.transactions].sort(byNewest);
  }

  async getTransactionById(id: number): Promise<Transaction | undefined> {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const createdTransaction: Transaction = {
      id: this.transactionId++,
      date: transaction.date,
      project: transaction.project,
      sector: transaction.sector,
      role: transaction.role,
      value: transaction.value,
      status: transaction.status ?? "Closed",
      createdAt: new Date(),
    };

    this.transactions = [createdTransaction, ...this.transactions];
    return createdTransaction;
  }

  async updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const existingTransaction = await this.getTransactionById(id);
    if (!existingTransaction) {
      return undefined;
    }

    const updatedTransaction: Transaction = {
      ...existingTransaction,
      ...transaction,
      status: transaction.status ?? existingTransaction.status,
    };
    this.transactions = this.transactions.map((item) => (item.id === id ? updatedTransaction : item));
    return updatedTransaction;
  }

  async deleteTransaction(id: number): Promise<boolean> {
    this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
    return true;
  }

  async getAllVacancies(): Promise<Vacancy[]> {
    return [...this.vacancies].sort(byNewest);
  }

  async getActiveVacancies(): Promise<Vacancy[]> {
    return this.vacancies.filter((vacancy) => vacancy.isActive === 1).sort(byNewest);
  }

  async getVacancyById(id: number): Promise<Vacancy | undefined> {
    return this.vacancies.find((vacancy) => vacancy.id === id);
  }

  async createVacancy(vacancy: InsertVacancy): Promise<Vacancy> {
    const createdVacancy: Vacancy = {
      id: this.vacancyId++,
      title: vacancy.title,
      location: vacancy.location,
      type: vacancy.type,
      description: vacancy.description ?? null,
      isActive: vacancy.isActive ?? 1,
      createdAt: new Date(),
    };

    this.vacancies = [createdVacancy, ...this.vacancies];
    return createdVacancy;
  }

  async updateVacancy(id: number, vacancy: Partial<InsertVacancy>): Promise<Vacancy | undefined> {
    const existingVacancy = await this.getVacancyById(id);
    if (!existingVacancy) {
      return undefined;
    }

    const updatedVacancy: Vacancy = {
      ...existingVacancy,
      ...vacancy,
      description: vacancy.description ?? existingVacancy.description,
      isActive: vacancy.isActive ?? existingVacancy.isActive,
    };
    this.vacancies = this.vacancies.map((item) => (item.id === id ? updatedVacancy : item));
    return updatedVacancy;
  }

  async deleteVacancy(id: number): Promise<boolean> {
    this.vacancies = this.vacancies.filter((vacancy) => vacancy.id !== id);
    return true;
  }
}

export const storage: IStorage = databaseUrl ? new DbStorage() : new MemStorage();
