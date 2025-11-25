import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertArticleSchema, 
  insertTeamMemberSchema, 
  insertTransactionSchema, 
  insertVacancySchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticleById(parseInt(req.params.id));
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  app.put("/api/articles/:id", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(parseInt(req.params.id), validatedData);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  app.delete("/api/articles/:id", async (req, res) => {
    try {
      await storage.deleteArticle(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  // Team Members
  app.get("/api/team-members", async (req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.post("/api/team-members", async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ error: "Invalid team member data" });
    }
  });

  app.put("/api/team-members/:id", async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.partial().parse(req.body);
      const member = await storage.updateTeamMember(parseInt(req.params.id), validatedData);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: "Invalid team member data" });
    }
  });

  app.delete("/api/team-members/:id", async (req, res) => {
    try {
      await storage.deleteTeamMember(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });

  // Transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  });

  app.put("/api/transactions/:id", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.partial().parse(req.body);
      const transaction = await storage.updateTransaction(parseInt(req.params.id), validatedData);
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  });

  app.delete("/api/transactions/:id", async (req, res) => {
    try {
      await storage.deleteTransaction(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete transaction" });
    }
  });

  // Vacancies
  app.get("/api/vacancies", async (req, res) => {
    try {
      const active = req.query.active === 'true';
      const vacancies = active 
        ? await storage.getActiveVacancies() 
        : await storage.getAllVacancies();
      res.json(vacancies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vacancies" });
    }
  });

  app.post("/api/vacancies", async (req, res) => {
    try {
      const validatedData = insertVacancySchema.parse(req.body);
      const vacancy = await storage.createVacancy(validatedData);
      res.status(201).json(vacancy);
    } catch (error) {
      res.status(400).json({ error: "Invalid vacancy data" });
    }
  });

  app.put("/api/vacancies/:id", async (req, res) => {
    try {
      const validatedData = insertVacancySchema.partial().parse(req.body);
      const vacancy = await storage.updateVacancy(parseInt(req.params.id), validatedData);
      if (!vacancy) {
        return res.status(404).json({ error: "Vacancy not found" });
      }
      res.json(vacancy);
    } catch (error) {
      res.status(400).json({ error: "Invalid vacancy data" });
    }
  });

  app.delete("/api/vacancies/:id", async (req, res) => {
    try {
      await storage.deleteVacancy(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete vacancy" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
