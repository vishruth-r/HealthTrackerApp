import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys
const HEALTH_KEY = 'healthData';
const TODO_KEY = 'todoList';

// --------- Types ---------
export type HealthData = {
  steps?: number;
  sleep?: number;
  height?: number;
  weight?: number;
};

export type TodoItem = {
  id: string;
  task: string;
  date: string;
  assigned_by: string;
  completed: boolean;
};

const initialTodoList: TodoItem[] = [
  {
    id: '1',
    task: 'Achieve 30k steps every week for blood sugar',
    date: 'Sept 5, 2024',
    assigned_by: 'Laurie Simons',
    completed: false,
  },
  {
    id: '2',
    task: 'Take up health coaching',
    date: 'Sep 5, 2024',
    assigned_by: 'Laurie Simons',
    completed: false,
  },
  {
    id: '3',
    task: 'Go to a nearby gym and workout for 30 mins',
    date: 'Sept 5, 2024',
    assigned_by: 'Laurie Simons',
    completed: false,
  },
  {
    id: '4',
    task: 'Sleep 8 hours',
    date: 'Aug 30, 2024',
    assigned_by: 'Laurie Simons',
    completed: false,
  },
];

// Health Data
export const getHealthData = async (): Promise<HealthData> => {
  try {
    const data = await AsyncStorage.getItem(HEALTH_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to get health data:', error);
    return {};
  }
};

export const updateHealthData = async (newData: Partial<HealthData>) => {
  try {
    const existing = await getHealthData();
    const merged = { ...existing, ...newData };
    await AsyncStorage.setItem(HEALTH_KEY, JSON.stringify(merged));
  } catch (error) {
    console.error('Failed to update health data:', error);
  }
};

export const clearHealthData = async () => {
  try {
    await AsyncStorage.removeItem(HEALTH_KEY);
    console.log('Health data cleared');
  } catch (error) {
    console.error('Failed to clear health data:', error);
  }
};

// To-Do List
export const getTodoList = async (): Promise<TodoItem[]> => {
  try {
    const data = await AsyncStorage.getItem(TODO_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get todo list:', error);
    return [];
  }
};

export const addTodoItem = async (item: TodoItem) => {
  try {
    const existing = await getTodoList();
    const updated = [...existing, item];
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to add todo item:', error);
  }
};

export const updateTodoItem = async (updatedItem: TodoItem) => {
  try {
    const existing = await getTodoList();
    const updated = existing.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update todo item:', error);
  }
};

export const removeTodoItem = async (id: string) => {
  try {
    const existing = await getTodoList();
    const updated = existing.filter(item => item.id !== id);
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to remove todo item:', error);
  }
};

export const clearTodoList = async () => {
  try {
    await AsyncStorage.removeItem(TODO_KEY);
    console.log('To-do list cleared');
  } catch (error) {
    console.error('Failed to clear todo list:', error);
  }
};

export const setInitialTodoList = async () => {
  try {
    const existing = await getTodoList();
    if (existing.length === 0) {
      await AsyncStorage.setItem(TODO_KEY, JSON.stringify(initialTodoList));
      console.log('Initial todo list set');
    }
  } catch (error) {
    console.error('Failed to set initial todo list:', error);
  }
};
