import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ExpenseForm from './components/ExpenseForm';
import { useExpenses } from './hooks/useExpenses';
import { Colors } from './constants/Colors';

export default function AddExpenseScreen() {
  const router = useRouter();
  const { addExpense } = useExpenses();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (amount: number, category: string, description?: string) => {
    try {
      setIsSubmitting(true);
      await addExpense({
        amount,
        category,
        description,
        date: new Date(),
      });
      
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💸 Add New Expense</Text>
        <Text style={styles.subtitle}>Track where your money goes</Text>
      </View>

      <View style={styles.formContainer}>
        <ExpenseForm
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
          isSubmitting={isSubmitting}
        />
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  formContainer: {
    padding: 20,
  },
});


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import ExpenseForm from './components/ExpenseForm';
// import { useExpenses } from './hooks/useExpenses';

// export default function AddExpenseScreen() {
//   const router = useRouter();
//   const { addExpense } = useExpenses();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (amount: number, category: string, description?: string) => {
//     try {
//       setIsSubmitting(true);
//       await addExpense({
//         amount,
//         category,
//         description,
//         date: new Date(),
//       });
      
//       router.back();
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add expense');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Expense</Text>
//       <ExpenseForm
//         onSubmit={handleSubmit}
//         onCancel={() => router.back()}
//         isSubmitting={isSubmitting}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
// });