interface Tag {
  name: string;
  id: string;
  can_write: boolean;
  color: string;
}

interface Coordinates {
  cellId: string;
  accuracy: number;
  latitude: number;
  longitude: number;
}

interface UsageLimit {
  type: string;
  used: number | null;
  total: number;
  period: string;
  resets_at: string;
  alert_threshold: number | null;
}

export interface DevicePayload {
  name: string;
  model: string;
  simType: string;
  simNumber: string;
  type: string;
}

export interface Device {
  id?: string;
  name: string;
  model: string;
  simType: string;
  simNumber: string;
  coordinates: Coordinates;
  status: string;
  organizationId?: string;
  usage: number;
  usageLimit: UsageLimit;
  lastOnlineAt?: string;
  tags: string[] | Tag[]; // The example shows tags as stringified JSON, but you might want to parse them into Tag objects
  organizationName?: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DevicesData {
  devices: Device[];
  onlineDevices: number;
  offlineDevices: number;
}

export interface DeviceApiResponse {
  success: boolean;
  data: DevicesData;
  error?: string;
}
