import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../types';

const STORAGE_KEY = '@expenses';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Функция для преобразования даты
  const parseExpenseDate = (expense: any): Expense => {
    return {
      ...expense,
      date: expense.date ? new Date(expense.date) : new Date()
    };
  };

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedExpenses = JSON.parse(stored).map(parseExpenseDate);
        setExpenses(parsedExpenses);
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expenseData: Omit<Expense, 'id'>) => {
    try {
      const newExpense: Expense = {
        ...expenseData,
        id: Date.now().toString(),
        date: expenseData.date instanceof Date ? expenseData.date : new Date(expenseData.date)
      };

      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
      return newExpense;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  }, [expenses]);

  // ... остальные функции остаются без изменений

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return {
    expenses,
    loading,
    addExpense,
    deleteExpense: useCallback(async (id: string) => {
      const updatedExpenses = expenses.filter(exp => exp.id !== id);
      setExpenses(updatedExpenses);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
    }, [expenses]),
    getTotalExpenses: useCallback(() => {
      return expenses.reduce((total, exp) => total + exp.amount, 0);
    }, [expenses]),
    getTotalByCategory: useCallback((category: string) => {
      return expenses
        .filter(exp => exp.category === category)
        .reduce((total, exp) => total + exp.amount, 0);
    }, [expenses]),
    refreshExpenses: loadExpenses
  };
};

// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Expense } from '../types';

// const STORAGE_KEY = '@expenses';

// export const useExpenses = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadExpenses();
//   }, []);

//   const loadExpenses = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(STORAGE_KEY);
//       if (stored) {
//         const parsedExpenses = JSON.parse(stored);
//         setExpenses(parsedExpenses);
//       }
//     } catch (error) {
//       console.error('Error loading expenses:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addExpense = async (expense: Omit<Expense, 'id'>) => {
//     const newExpense: Expense = {
//       ...expense,
//       id: Date.now().toString(),
//       date: new Date(expense.date), // Ensure date is Date object
//     };

//     const updatedExpenses = [...expenses, newExpense];
//     setExpenses(updatedExpenses);
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
//   };

//   const getTotalExpenses = () => {
//     return expenses.reduce((total, exp) => total + exp.amount, 0);
//   };

//   return {
//     expenses,
//     loading,
//     addExpense,
//     getTotalExpenses,
//   };
// };


