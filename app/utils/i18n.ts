import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      add_expense: 'Add Expense',
      amount: 'Amount',
      category: 'Category',
      description: 'Description',
      food: 'Food',
      transport: 'Transport',
      entertainment: 'Entertainment',
      shopping: 'Shopping',
      health: 'Health',
      other: 'Other',
      statistics: 'Statistics',
      export: 'Export to CSV',
      total: 'Total',
      date: 'Date',
      save: 'Save',
      cancel: 'Cancel',
      expenses: 'Expenses',
      add_new: 'Add New',
      charts: 'Charts',
      go_back: 'Go Back',
      export_to_csv: 'Export to CSV',
      export_failed: 'Export failed',
      total_expenses: 'Total Expenses',
      total_amount: 'Total Amount',
      expense_tracker: 'Expense Tracker',
      error: 'Error'
    }
  },
  ru: {
    translation: {
      add_expense: 'Добавить расход',
      amount: 'Сумма',
      category: 'Категория',
      description: 'Описание',
      food: 'Еда',
      transport: 'Транспорт',
      entertainment: 'Развлечения',
      shopping: 'Покупки',
      health: 'Здоровье',
      other: 'Другое',
      statistics: 'Статистика',
      export: 'Экспорт в CSV',
      total: 'Всего',
      date: 'Дата',
      save: 'Сохранить',
      cancel: 'Отмена',
      expenses: 'Расходы',
      add_new: 'Добавить',
      charts: 'Графики',
      go_back: 'Назад',
      export_to_csv: 'Экспорт в CSV',
      export_failed: 'Ошибка экспорта',
      total_expenses: 'Всего расходов',
      total_amount: 'Общая сумма',
      expense_tracker: 'Трекер расходов',
      error: 'Ошибка'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;