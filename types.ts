
export interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

export interface Appliance {
  id: string;
  name: string;
  icon: string;
  usageKwH: number;
  status: 'on' | 'off';
  dailyHours: number;
  efficiency: 'A' | 'B' | 'C' | 'D';
}

export interface Room {
  id: string;
  name: string;
}

export interface Block {
  id: string;
  name: string;
  icon: string;
  address: string;
  rooms: Room[];
}

export interface EnergyReading {
  time: string;
  usage: number;
  cost: number;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  category: 'Heating' | 'Lighting' | 'Appliance' | 'Peak';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

export interface GlobalState {
  user: User;
  appliances: Appliance[];
  blocks: Block[];
  history: EnergyReading[];
  suggestions: Suggestion[];
}
