import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  status: text("status").notNull().default("active"), // active, inactive, suspended
  createdAt: timestamp("created_at").defaultNow(),
  lastActive: timestamp("last_active").defaultNow(),
});

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  imei: text("imei").notNull().unique(),
  model: text("model"),
  manufacturer: text("manufacturer"),
  description: text("description"),
  status: text("status").notNull().default("offline"), // online, offline, error
  organizationId: integer("organization_id"),
  simId: integer("sim_id"),
  lastOnline: timestamp("last_online"),
  location: jsonb("location"), // { lat: number, lng: number, accuracy: number }
  createdAt: timestamp("created_at").defaultNow(),
});

export const sims = pgTable("sims", {
  id: serial("id").primaryKey(),
  simId: text("sim_id").notNull().unique(),
  iccid: text("iccid").notNull(),
  msisdn: text("msisdn").notNull(),
  status: text("status").notNull().default("inactive"), // active, inactive, suspended
  networkProvider: text("network_provider").notNull(),
  country: text("country").notNull().default("US"),
  dataLimit: integer("data_limit").default(1000), // MB
  currentUsage: integer("current_usage").default(0), // MB
  lastSync: timestamp("last_sync"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  phone: text("phone"),
  role: text("role").notNull().default("user"), // super_admin, admin, user
  organizationId: integer("organization_id"),
  status: text("status").notNull().default("active"), // active, inactive, suspended
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // usage, device, organization, user_activity
  dateRange: text("date_range").notNull(),
  organizationId: integer("organization_id"),
  format: text("format").notNull().default("pdf"), // pdf, csv, excel
  status: text("status").notNull().default("pending"), // pending, complete, failed
  filePath: text("file_path"),
  fileSize: integer("file_size"),
  generatedAt: timestamp("generated_at").defaultNow(),
  createdBy: integer("created_by").notNull(),
});

// Insert schemas
export const insertOrganizationSchema = createInsertSchema(organizations).omit({
  id: true,
  createdAt: true,
  lastActive: true,
});

export const insertDeviceSchema = createInsertSchema(devices).omit({
  id: true,
  createdAt: true,
  lastOnline: true,
});

export const insertSimSchema = createInsertSchema(sims).omit({
  id: true,
  createdAt: true,
  lastSync: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastLogin: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  generatedAt: true,
  filePath: true,
  fileSize: true,
});

// Types
export type Organization = typeof organizations.$inferSelect;
export type Device = typeof devices.$inferSelect;
export type Sim = typeof sims.$inferSelect;
export type User = typeof users.$inferSelect;
export type Report = typeof reports.$inferSelect;

export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type InsertDevice = z.infer<typeof insertDeviceSchema>;
export type InsertSim = z.infer<typeof insertSimSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertReport = z.infer<typeof insertReportSchema>;
