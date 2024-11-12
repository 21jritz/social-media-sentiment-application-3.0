import { create } from 'zustand';

interface SentimentState {
  isMonitoring: boolean;
  realTimeData: any[];
  notifications: string[];
  alertThresholds: {
    positive: number;
    negative: number;
  };
  startMonitoring: () => void;
  stopMonitoring: () => void;
  updateData: (data: any[]) => void;
  setAlertThresholds: (thresholds: { positive: number; negative: number }) => void;
  addNotification: (notification: string) => void;
  clearNotifications: () => void;
}

export const useSentimentStore = create<SentimentState>((set) => ({
  isMonitoring: false,
  realTimeData: [],
  notifications: [],
  alertThresholds: {
    positive: 0.7,
    negative: -0.3
  },
  startMonitoring: () => set({ isMonitoring: true }),
  stopMonitoring: () => set({ isMonitoring: false }),
  updateData: (data) => set({ realTimeData: data }),
  setAlertThresholds: (thresholds) => set({ alertThresholds: thresholds }),
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),
  clearNotifications: () => set({ notifications: [] })
}));