import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Expense } from '../types';

/**
 * Безопасное преобразование даты
 */
const safeDateToString = (date: any): string => {
  try {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    
    if (typeof date === 'string') {
      // Пытаемся распарсить строку даты
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split('T')[0];
      }
    }
    
    // Если ничего не работает, используем текущую дату
    return new Date().toISOString().split('T')[0];
  } catch (error) {
    console.warn('Date conversion error:', error);
    return new Date().toISOString().split('T')[0];
  }
};

/**
 * Конвертирует массив расходов в CSV строку
 */
export const convertExpensesToCSV = (expenses: Expense[]): string => {
  if (expenses.length === 0) {
    return '';
  }

  // Заголовки CSV
  const headers = ['Date', 'Amount', 'Category', 'Description'];
  
  // Данные с безопасной обработкой
  const rows = expenses.map(expense => [
    safeDateToString(expense.date), // Безопасное преобразование даты
    expense.amount.toString(),
    expense.category,
    expense.description ? `"${expense.description.replace(/"/g, '""')}"` : ''
  ]);

  // Объединяем заголовки и данные
  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  return csvContent;
};

/**
 * Упрощенная версия экспорта (для тестирования)
 */
export const exportToCSVSimple = async (expenses: Expense[]): Promise<void> => {
  try {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }

    const csvContent = convertExpensesToCSV(expenses);
    
    // Показываем содержимое в alert
    alert(`CSV Content (first 200 chars):\n\n${csvContent.substring(0, 200)}...\n\nFull data copied to console.`);
    
    // Также логируем полный CSV в консоль
    console.log('Full CSV content:', csvContent);

  } catch (error) {
    console.error('Error in simple export:', error);
    alert('Failed to generate CSV');
  }
};

/**
 * Основная функция экспорта с созданием файла
 */
export const exportToCSV = async (expenses: Expense[]): Promise<void> => {
  try {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }

    // Сначала тестируем простую версию
    // await exportToCSVSimple(expenses);
    
    // Если простая версия работает, пробуем полную
   
    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing is not available on this device');
      return;
    }

    const csvContent = convertExpensesToCSV(expenses);
    const filename = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    const fileUri = FileSystem.documentDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(fileUri, {
      mimeType: 'text/csv',
      dialogTitle: 'Export Expenses to CSV',
      UTI: 'public.comma-separated-values-text'
    });
    

  } catch (error) {
    console.error('Error exporting to CSV:', error);
    // Fallback на простую версию
    await exportToCSVSimple(expenses);
  }
};

/**
 * Для отладки: выводит информацию о расходе
 */
// export const debugExpense = (expense: Expense) => {
//   console.log('Expense debug:', {
//     id: expense.id,
//     amount: expense.amount,
//     category: expense.category,
//     date: expense.date,
//     dateType: typeof expense.date,
//     isDate: expense.date instanceof Date,
//     description: expense.description
//   });
// };

/**
 * Для отладки: выводит информацию о всех расходах
 */
// export const debugAllExpenses = (expenses: Expense[]) => {
//   console.log('=== EXPENSES DEBUG ===');
//   expenses.forEach((expense, index) => {
//     console.log(`Expense ${index + 1}:`);
//     debugExpense(expense);
//   });
//   console.log('=== END DEBUG ===');
// };

