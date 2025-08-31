import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useExpenses } from './hooks/useExpenses';
import {  exportToCSV, exportToCSVSimple } from './utils/exportToCSV';
import { Colors } from './constants/Colors';

export default function StatisticsScreen() {
   const router = useRouter();
  const { expenses, getTotalExpenses, loading } = useExpenses();

  // Для отладки: логируем расходы при загрузке
  useEffect(() => {
    if (expenses.length > 0) {
      console.log('Expenses loaded, total:', expenses.length);
      // debugAllExpenses(expenses);
    }
  }, [expenses]);

  const handleExport = async () => {
    try {
      await exportToCSV(expenses);
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', 'Failed to export expenses. Check console for details.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const totalAmount = getTotalExpenses();


  return (
    <ScrollView style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.title}>📊 Statistics</Text>
        <Text style={styles.subtitle}>Your spending overview</Text>
        
        {/* Кнопка отладки */}
       
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📋</Text>
          <Text style={styles.statValue}>{expenses.length}</Text>
          <Text style={styles.statLabel}>Total Expenses</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>💰</Text>
          <Text style={styles.statValue}>${totalAmount.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Total Spent</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.exportButton, expenses.length === 0 && styles.disabledButton]}
        onPress={handleExport}
        disabled={expenses.length === 0}
      >
        <Text style={styles.exportButtonText}>📤 Export to CSV</Text>
      </TouchableOpacity>


      {expenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📝</Text>
          <Text style={styles.emptyText}>No expenses yet!</Text>
          <Text style={styles.emptySubtext}>Add your first expense to see statistics</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/add-expense')}
          >
            <Text style={styles.addButtonText}>➕ Add First Expense</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          {expenses.slice(-3).map((expense, index) => (
            <View key={expense.id} style={styles.expenseItem}>
              <Text style={styles.expenseNumber}>{index + 1}</Text>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseCategory}>{expense.category}</Text>
                <Text style={styles.expenseDate}>
                  {new Date(expense.date).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    backgroundColor: Colors.primaryDark,
    padding: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  exportButton: {
    backgroundColor: Colors.accent,
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginTop: 20,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 12,
    paddingHorizontal: 25,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  recentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  expenseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textSecondary,
    marginRight: 15,
    minWidth: 20,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textTransform: 'capitalize',
  },
  expenseDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
    debugButton: {
    backgroundColor: '#666',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  debugButtonText: {
    color: Colors.white,
    fontSize: 12,
  },
});


// import React from 'react';
// import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useExpenses } from './hooks/useExpenses';
// import { exportToCSV, exportToCSVSimple } from './utils/exportToCSV';

// export default function StatisticsScreen() {
//   const router = useRouter();
//   const { expenses, getTotalExpenses, loading } = useExpenses();

//   const handleExport = async () => {
//     try {
//       await exportToCSV(expenses);
//     } catch (error) {
//       console.error('Export error:', error);
//       // Fallback: используем простую версию если основная не работает
//       await exportToCSVSimple(expenses);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   const totalAmount = getTotalExpenses();

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Statistics</Text>
      
//       <View style={styles.statCard}>
//         <Text style={styles.statValue}>{expenses.length}</Text>
//         <Text style={styles.statLabel}>Total Expenses</Text>
//       </View>

//       <View style={styles.statCard}>
//         <Text style={styles.statValue}>${totalAmount.toFixed(2)}</Text>
//         <Text style={styles.statLabel}>Total Amount</Text>
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button
//           title="Export to CSV"
//           onPress={handleExport}
//           disabled={expenses.length === 0}
//         />
//       </View>

//       {expenses.length === 0 && (
//         <Text style={styles.emptyText}>No expenses to display. Add some expenses first!</Text>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#333',
//   },
//   statCard: {
//     backgroundColor: '#f8f9fa',
//     padding: 25,
//     borderRadius: 12,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   statValue: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#007AFF',
//     marginBottom: 5,
//   },
//   statLabel: {
//     fontSize: 16,
//     color: '#666',
//   },
//   buttonContainer: {
//     marginVertical: 20,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#999',
//     marginTop: 30,
//     fontSize: 16,
//   },
// });

// // import React from 'react';
// // import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
// // import { useRouter } from 'expo-router';
// // import { useExpenses } from './hooks/useExpenses';
// // import { exportToCSV } from './utils/exportToCSV';

// // export default function StatisticsScreen() {
// //   const router = useRouter();
// //   const { expenses, getTotalExpenses, loading } = useExpenses();

// //   const handleExport = async () => {
// //     try {
// //       await exportToCSV(expenses);
// //     } catch (error) {
// //       Alert.alert('Error', 'Export failed');
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <Text>Loading...</Text>
// //       </View>
// //     );
// //   }

// //   const totalAmount = getTotalExpenses();

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.title}>Statistics</Text>
      
// //       {/* Карточка с общим количеством расходов */}
// //       <View style={styles.statCard}>
// //         <Text style={styles.statValue}>{expenses.length}</Text>
// //         <Text style={styles.statLabel}>Total Expenses</Text>
// //       </View>

// //       {/* Карточка с общей суммой */}
// //       <View style={styles.statCard}>
// //         <Text style={styles.statValue}>${totalAmount.toFixed(2)}</Text>
// //         <Text style={styles.statLabel}>Total Amount</Text>
// //       </View>

// //       {/* Кнопка экспорта */}
// //       <View style={styles.buttonContainer}>
// //         <Button
// //           title="Export to CSV"
// //           onPress={handleExport}
// //           disabled={expenses.length === 0}
// //         />
// //       </View>

// //       {/* Сообщение если нет расходов */}
// //       {expenses.length === 0 && (
// //         <Text style={styles.emptyText}>No expenses to display</Text>
// //       )}

// //       {/* Список расходов (опционально) */}
// //       {expenses.length > 0 && (
// //         <View style={styles.expensesList}>
// //           <Text style={styles.listTitle}>Recent Expenses:</Text>
// //           {expenses.slice(-5).map((expense) => (
// //             <View key={expense.id} style={styles.expenseItem}>
// //               <Text style={styles.expenseDate}>
// //                 {expense.date.toLocaleDateString()}
// //               </Text>
// //               <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
// //               <Text style={styles.expenseCategory}>{expense.category}</Text>
// //             </View>
// //           ))}
// //         </View>
// //       )}
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#fff',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     marginBottom: 30,
// //     color: '#333',
// //   },
// //   statCard: {
// //     backgroundColor: '#f8f9fa',
// //     padding: 25,
// //     borderRadius: 12,
// //     marginBottom: 20,
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   statValue: {
// //     fontSize: 32,
// //     fontWeight: 'bold',
// //     color: '#007AFF',
// //     marginBottom: 5,
// //   },
// //   statLabel: {
// //     fontSize: 16,
// //     color: '#666',
// //   },
// //   buttonContainer: {
// //     marginVertical: 20,
// //   },
// //   emptyText: {
// //     textAlign: 'center',
// //     color: '#999',
// //     marginTop: 30,
// //     fontSize: 16,
// //   },
// //   expensesList: {
// //     marginTop: 30,
// //   },
// //   listTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     marginBottom: 15,
// //     color: '#333',
// //   },
// //   expenseItem: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     padding: 15,
// //     backgroundColor: '#f8f9fa',
// //     borderRadius: 8,
// //     marginBottom: 10,
// //   },
// //   expenseDate: {
// //     fontSize: 14,
// //     color: '#666',
// //     flex: 1,
// //   },
// //   expenseAmount: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: '#FF3B30',
// //     flex: 1,
// //     textAlign: 'center',
// //   },
// //   expenseCategory: {
// //     fontSize: 14,
// //     color: '#007AFF',
// //     flex: 1,
// //     textAlign: 'right',
// //   },
// // });

