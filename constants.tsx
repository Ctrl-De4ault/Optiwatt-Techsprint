
import { Appliance, EnergyReading, Suggestion, Block, Notification } from './types';

export const INITIAL_APPLIANCES: Appliance[] = [
  { id: '1', name: 'Takshila - 201', icon: 'building', usageKwH: 4.2, status: 'on', dailyHours: 24, efficiency: 'A' },
  { id: '2', name: 'Takshila - 202', icon: 'building', usageKwH: 3.8, status: 'on', dailyHours: 24, efficiency: 'B' },
  { id: '3', name: 'Pushpagiri - 301', icon: 'campus', usageKwH: 5.5, status: 'on', dailyHours: 24, efficiency: 'A' },
  { id: '4', name: 'Pushpagiri - 302', icon: 'campus', usageKwH: 2.1, status: 'off', dailyHours: 0, efficiency: 'C' },
  { id: '5', name: 'Main Server Room', icon: 'oven', usageKwH: 12.5, status: 'on', dailyHours: 24, efficiency: 'A' },
];

export const INITIAL_BLOCKS: Block[] = [
  {
    id: 'b1',
    name: 'Takshila',
    icon: 'building',
    address: 'Sector 42, Knowledge Park, North Wing',
    rooms: [
      { id: 'r201', name: 'Room 201' },
      { id: 'r202', name: 'Room 202' }
    ]
  },
  {
    id: 'b2',
    name: 'Pushpagiri',
    icon: 'campus',
    address: 'Hill View Road, Block B, South Campus',
    rooms: [
      { id: 'r301', name: 'Room 301' },
      { id: 'r302', name: 'Room 302' }
    ]
  }
];

export const HISTORICAL_DATA: EnergyReading[] = [
  { time: '00:00', usage: 1.4, cost: 0.28 },
  { time: '03:00', usage: 1.1, cost: 0.22 },
  { time: '06:00', usage: 2.5, cost: 0.50 },
  { time: '09:00', usage: 8.2, cost: 1.64 },
  { time: '12:00', usage: 15.8, cost: 3.16 },
  { time: '15:00', usage: 12.4, cost: 2.48 },
  { time: '18:00', usage: 18.2, cost: 3.64 },
  { time: '21:00', usage: 9.8, cost: 1.96 },
];

export const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: 's1',
    title: 'Optimize Takshila HVAC',
    description: 'Room 201 is showing 15% higher usage during non-occupancy hours. Schedule an HVAC audit.',
    impact: 'High',
    category: 'Appliance'
  },
  {
    id: 's2',
    title: 'Pushpagiri Lighting Upgrade',
    description: 'Switching common area lighting in Pushpagiri to motion-sensing LEDs can save $35/month.',
    impact: 'Medium',
    category: 'Lighting'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'High Usage Alert',
    message: 'Takshila Block has exceeded its daily baseline by 15%.',
    time: '2 hours ago',
    type: 'warning',
    read: false
  },
  {
    id: 'n2',
    title: 'Optimization Success',
    message: 'Your new HVAC schedule saved $12.40 yesterday.',
    time: '5 hours ago',
    type: 'success',
    read: false
  },
  {
    id: 'n3',
    title: 'Maintenance Schedule',
    message: 'Pushpagiri Block common area sensors are due for inspection.',
    time: '1 day ago',
    type: 'info',
    read: true
  }
];
