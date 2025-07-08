import { 
  organizations, devices, sims, users, reports,
  type Organization, type Device, type Sim, type User, type Report,
  type InsertOrganization, type InsertDevice, type InsertSim, type InsertUser, type InsertReport 
} from "@shared/schema";

export interface IStorage {
  // Organizations
  getOrganizations(): Promise<Organization[]>;
  getOrganization(id: number): Promise<Organization | undefined>;
  createOrganization(org: InsertOrganization): Promise<Organization>;
  updateOrganization(id: number, org: Partial<InsertOrganization>): Promise<Organization>;
  deleteOrganization(id: number): Promise<void>;

  // Devices
  getDevices(): Promise<Device[]>;
  getDevice(id: number): Promise<Device | undefined>;
  getDevicesByOrganization(organizationId: number): Promise<Device[]>;
  createDevice(device: InsertDevice): Promise<Device>;
  updateDevice(id: number, device: Partial<InsertDevice>): Promise<Device>;
  deleteDevice(id: number): Promise<void>;

  // SIMs
  getSims(): Promise<Sim[]>;
  getSim(id: number): Promise<Sim | undefined>;
  createSim(sim: InsertSim): Promise<Sim>;
  updateSim(id: number, sim: Partial<InsertSim>): Promise<Sim>;
  deleteSim(id: number): Promise<void>;

  // Users
  getUsers(): Promise<User[]>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUsersByOrganization(organizationId: number): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;
  deleteUser(id: number): Promise<void>;

  // Reports
  getReports(): Promise<Report[]>;
  getReport(id: number): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
  updateReport(id: number, report: Partial<InsertReport>): Promise<Report>;
  deleteReport(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private organizations: Map<number, Organization> = new Map();
  private devices: Map<number, Device> = new Map();
  private sims: Map<number, Sim> = new Map();
  private users: Map<number, User> = new Map();
  private reports: Map<number, Report> = new Map();
  private currentId = 1;

  constructor() {
    this.seedData();
  }

  private getNextId(): number {
    return this.currentId++;
  }

  private seedData() {
    // Seed organizations
    const orgs = [
      { id: 1, name: "TechCorp Solutions", email: "tech@techcorp.com", phone: "+1-555-0100", address: "123 Tech St, San Francisco, CA", status: "active", createdAt: new Date('2024-01-15'), lastActive: new Date() },
      { id: 2, name: "Global Industries", email: "admin@global.com", phone: "+1-555-0200", address: "456 Global Ave, New York, NY", status: "active", createdAt: new Date('2024-02-03'), lastActive: new Date(Date.now() - 86400000) },
      { id: 3, name: "StartupXYZ", email: "contact@startupxyz.com", phone: "+1-555-0300", address: "789 Innovation Blvd, Austin, TX", status: "inactive", createdAt: new Date('2023-12-20'), lastActive: new Date(Date.now() - 259200000) },
    ];
    orgs.forEach(org => this.organizations.set(org.id, org));

    // Seed SIMs
    const simData = [
      { id: 1, simId: "SIM-001", iccid: "89014103211118510720", msisdn: "+1-555-0123", status: "active", networkProvider: "Verizon", country: "US", dataLimit: 10000, currentUsage: 2400, lastSync: new Date(), createdAt: new Date() },
      { id: 2, simId: "SIM-002", iccid: "89014103211118510721", msisdn: "+1-555-0124", status: "active", networkProvider: "AT&T", country: "US", dataLimit: 5000, currentUsage: 1800, lastSync: new Date(), createdAt: new Date() },
      { id: 3, simId: "SIM-003", iccid: "89014103211118510722", msisdn: "+1-555-0125", status: "inactive", networkProvider: "T-Mobile", country: "US", dataLimit: 8000, currentUsage: 0, lastSync: new Date(), createdAt: new Date() },
    ];
    simData.forEach(sim => this.sims.set(sim.id, sim));

    // Seed devices
    const deviceData = [
      { id: 1, label: "DEV-001", imei: "123456789012345", model: "IoT Device Pro", manufacturer: "TechCorp", description: "Industrial IoT sensor", status: "online", organizationId: 1, simId: 1, lastOnline: new Date(Date.now() - 300000), location: { lat: 37.7749, lng: -122.4194, accuracy: 10 }, createdAt: new Date() },
      { id: 2, label: "DEV-002", imei: "123456789012346", model: "Smart Tracker", manufacturer: "Global Tech", description: "GPS tracking device", status: "offline", organizationId: 2, simId: 2, lastOnline: new Date(Date.now() - 7200000), location: { lat: 40.7128, lng: -74.0060, accuracy: 15 }, createdAt: new Date() },
      { id: 3, label: "DEV-003", imei: "123456789012347", model: "Environmental Monitor", manufacturer: "EcoTech", description: "Environmental monitoring sensor", status: "error", organizationId: 1, simId: null, lastOnline: new Date(Date.now() - 86400000), location: null, createdAt: new Date() },
    ];
    deviceData.forEach(device => this.devices.set(device.id, device));

    // Seed users
    const userData = [
      { id: 1, username: "johnadmin", email: "john@admin.com", password: "hashed_password", fullName: "John Admin", phone: "+1-555-1000", role: "super_admin", organizationId: null, status: "active", lastLogin: new Date(Date.now() - 7200000), createdAt: new Date() },
      { id: 2, username: "sarah.manager", email: "sarah@techcorp.com", password: "hashed_password", fullName: "Sarah Manager", phone: "+1-555-1001", role: "admin", organizationId: 1, status: "active", lastLogin: new Date(Date.now() - 86400000), createdAt: new Date() },
      { id: 3, username: "mike.user", email: "mike@global.com", password: "hashed_password", fullName: "Mike User", phone: "+1-555-1002", role: "user", organizationId: 2, status: "active", lastLogin: new Date(Date.now() - 3600000), createdAt: new Date() },
    ];
    userData.forEach(user => this.users.set(user.id, user));

    // Seed reports
    const reportData = [
      { id: 1, name: "Monthly Usage Report - January 2024", type: "usage", dateRange: "2024-01-01 to 2024-01-31", organizationId: null, format: "pdf", status: "complete", filePath: "/reports/usage-jan-2024.pdf", fileSize: 2457600, generatedAt: new Date(Date.now() - 7200000), createdBy: 1 },
      { id: 2, name: "Device Inventory Report", type: "device", dateRange: "2024-01-01 to 2024-07-08", organizationId: null, format: "csv", status: "complete", filePath: "/reports/devices-inventory.csv", fileSize: 1887436, generatedAt: new Date(Date.now() - 86400000), createdBy: 1 },
    ];
    reportData.forEach(report => this.reports.set(report.id, report));

    this.currentId = 100; // Start IDs from 100 to avoid conflicts
  }

  // Organizations
  async getOrganizations(): Promise<Organization[]> {
    return Array.from(this.organizations.values());
  }

  async getOrganization(id: number): Promise<Organization | undefined> {
    return this.organizations.get(id);
  }

  async createOrganization(org: InsertOrganization): Promise<Organization> {
    const id = this.getNextId();
    const newOrg: Organization = {
      ...org,
      id,
      createdAt: new Date(),
      lastActive: new Date(),
    };
    this.organizations.set(id, newOrg);
    return newOrg;
  }

  async updateOrganization(id: number, org: Partial<InsertOrganization>): Promise<Organization> {
    const existing = this.organizations.get(id);
    if (!existing) throw new Error("Organization not found");
    
    const updated: Organization = {
      ...existing,
      ...org,
      lastActive: new Date(),
    };
    this.organizations.set(id, updated);
    return updated;
  }

  async deleteOrganization(id: number): Promise<void> {
    this.organizations.delete(id);
  }

  // Devices
  async getDevices(): Promise<Device[]> {
    return Array.from(this.devices.values());
  }

  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }

  async getDevicesByOrganization(organizationId: number): Promise<Device[]> {
    return Array.from(this.devices.values()).filter(device => device.organizationId === organizationId);
  }

  async createDevice(device: InsertDevice): Promise<Device> {
    const id = this.getNextId();
    const newDevice: Device = {
      ...device,
      id,
      createdAt: new Date(),
      lastOnline: device.status === "online" ? new Date() : null,
    };
    this.devices.set(id, newDevice);
    return newDevice;
  }

  async updateDevice(id: number, device: Partial<InsertDevice>): Promise<Device> {
    const existing = this.devices.get(id);
    if (!existing) throw new Error("Device not found");
    
    const updated: Device = {
      ...existing,
      ...device,
      lastOnline: device.status === "online" ? new Date() : existing.lastOnline,
    };
    this.devices.set(id, updated);
    return updated;
  }

  async deleteDevice(id: number): Promise<void> {
    this.devices.delete(id);
  }

  // SIMs
  async getSims(): Promise<Sim[]> {
    return Array.from(this.sims.values());
  }

  async getSim(id: number): Promise<Sim | undefined> {
    return this.sims.get(id);
  }

  async createSim(sim: InsertSim): Promise<Sim> {
    const id = this.getNextId();
    const newSim: Sim = {
      ...sim,
      id,
      createdAt: new Date(),
      lastSync: new Date(),
    };
    this.sims.set(id, newSim);
    return newSim;
  }

  async updateSim(id: number, sim: Partial<InsertSim>): Promise<Sim> {
    const existing = this.sims.get(id);
    if (!existing) throw new Error("SIM not found");
    
    const updated: Sim = {
      ...existing,
      ...sim,
      lastSync: new Date(),
    };
    this.sims.set(id, updated);
    return updated;
  }

  async deleteSim(id: number): Promise<void> {
    this.sims.delete(id);
  }

  // Users
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUsersByOrganization(organizationId: number): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.organizationId === organizationId);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.getNextId();
    const newUser: User = {
      ...user,
      id,
      createdAt: new Date(),
      lastLogin: null,
    };
    this.users.set(id, newUser);
    return newUser;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) throw new Error("User not found");
    
    const updated: User = { ...existing, ...user };
    this.users.set(id, updated);
    return updated;
  }

  async deleteUser(id: number): Promise<void> {
    this.users.delete(id);
  }

  // Reports
  async getReports(): Promise<Report[]> {
    return Array.from(this.reports.values());
  }

  async getReport(id: number): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async createReport(report: InsertReport): Promise<Report> {
    const id = this.getNextId();
    const newReport: Report = {
      ...report,
      id,
      generatedAt: new Date(),
      filePath: null,
      fileSize: null,
    };
    this.reports.set(id, newReport);
    return newReport;
  }

  async updateReport(id: number, report: Partial<InsertReport>): Promise<Report> {
    const existing = this.reports.get(id);
    if (!existing) throw new Error("Report not found");
    
    const updated: Report = { ...existing, ...report };
    this.reports.set(id, updated);
    return updated;
  }

  async deleteReport(id: number): Promise<void> {
    this.reports.delete(id);
  }
}

export const storage = new MemStorage();
