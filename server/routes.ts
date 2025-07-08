import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertOrganizationSchema, insertDeviceSchema, insertSimSchema, 
  insertUserSchema, insertReportSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Organizations
  app.get("/api/organizations", async (req, res) => {
    try {
      const organizations = await storage.getOrganizations();
      res.json(organizations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organizations" });
    }
  });

  app.get("/api/organizations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const organization = await storage.getOrganization(id);
      if (!organization) {
        return res.status(404).json({ message: "Organization not found" });
      }
      res.json(organization);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organization" });
    }
  });

  app.post("/api/organizations", async (req, res) => {
    try {
      const data = insertOrganizationSchema.parse(req.body);
      const organization = await storage.createOrganization(data);
      res.status(201).json(organization);
    } catch (error) {
      res.status(400).json({ message: "Invalid organization data" });
    }
  });

  app.put("/api/organizations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertOrganizationSchema.partial().parse(req.body);
      const organization = await storage.updateOrganization(id, data);
      res.json(organization);
    } catch (error) {
      res.status(400).json({ message: "Failed to update organization" });
    }
  });

  app.delete("/api/organizations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteOrganization(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete organization" });
    }
  });

  // Devices
  app.get("/api/devices", async (req, res) => {
    try {
      const devices = await storage.getDevices();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch devices" });
    }
  });

  app.get("/api/devices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const device = await storage.getDevice(id);
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      res.json(device);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch device" });
    }
  });

  app.post("/api/devices", async (req, res) => {
    try {
      const data = insertDeviceSchema.parse(req.body);
      const device = await storage.createDevice(data);
      res.status(201).json(device);
    } catch (error) {
      res.status(400).json({ message: "Invalid device data" });
    }
  });

  app.put("/api/devices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertDeviceSchema.partial().parse(req.body);
      const device = await storage.updateDevice(id, data);
      res.json(device);
    } catch (error) {
      res.status(400).json({ message: "Failed to update device" });
    }
  });

  app.delete("/api/devices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteDevice(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete device" });
    }
  });

  // SIMs
  app.get("/api/sims", async (req, res) => {
    try {
      const sims = await storage.getSims();
      res.json(sims);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch SIMs" });
    }
  });

  app.get("/api/sims/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const sim = await storage.getSim(id);
      if (!sim) {
        return res.status(404).json({ message: "SIM not found" });
      }
      res.json(sim);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch SIM" });
    }
  });

  app.post("/api/sims", async (req, res) => {
    try {
      const data = insertSimSchema.parse(req.body);
      const sim = await storage.createSim(data);
      res.status(201).json(sim);
    } catch (error) {
      res.status(400).json({ message: "Invalid SIM data" });
    }
  });

  app.put("/api/sims/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertSimSchema.partial().parse(req.body);
      const sim = await storage.updateSim(id, data);
      res.json(sim);
    } catch (error) {
      res.status(400).json({ message: "Failed to update SIM" });
    }
  });

  app.delete("/api/sims/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSim(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete SIM" });
    }
  });

  // Users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const user = await storage.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, data);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Failed to update user" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Reports
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  app.get("/api/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const report = await storage.getReport(id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch report" });
    }
  });

  app.post("/api/reports", async (req, res) => {
    try {
      const data = insertReportSchema.parse(req.body);
      const report = await storage.createReport(data);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ message: "Invalid report data" });
    }
  });

  app.put("/api/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertReportSchema.partial().parse(req.body);
      const report = await storage.updateReport(id, data);
      res.json(report);
    } catch (error) {
      res.status(400).json({ message: "Failed to update report" });
    }
  });

  app.delete("/api/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteReport(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete report" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const devices = await storage.getDevices();
      const organizations = await storage.getOrganizations();
      const users = await storage.getUsers();
      const sims = await storage.getSims();

      const deviceStats = devices.reduce((acc, device) => {
        acc[device.status] = (acc[device.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const totalDataUsage = sims.reduce((acc, sim) => acc + sim.currentUsage, 0);

      res.json({
        totalDevices: devices.length,
        totalOrganizations: organizations.length,
        totalUsers: users.length,
        totalDataUsage,
        deviceStats,
        recentActivity: [
          { type: "device", message: "Device DEV-001 registered", time: new Date(Date.now() - 120000) },
          { type: "user", message: "User john@acme.com logged in", time: new Date(Date.now() - 300000) },
          { type: "organization", message: 'Organization "TechCorp" updated', time: new Date(Date.now() - 720000) },
          { type: "error", message: "Device DEV-045 connection error", time: new Date(Date.now() - 1080000) },
        ]
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
