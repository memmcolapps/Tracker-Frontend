interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Device {
  [key: string]: any;
}

export interface Organization {
  id?: string;
  name: string;
  adminEmail: string;
  adminPhone: string;
  noOfDevices: number;
  createdAt?: Date;
  updatedAt?: Date;
  users?: User[];
  devices?: Device[];
}

export interface createOrganizationPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  adminFirstName: string;
  adminLastName: string;
}
