export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}