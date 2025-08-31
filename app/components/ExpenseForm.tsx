import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../constants/Colors';

const CATEGORIES = [
  { id: 'food', name: 'Food', emoji: '🍕' },
  { id: 'transport', name: 'Transport', emoji: '🚗' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎬' },
  { id: 'shopping', name: 'Shopping', emoji: '🛍️' },
  { id: 'health', name: 'Health', emoji: '🏥' },
  { id: 'other', name: 'Other', emoji: '📦' }
];

interface ExpenseFormProps {
  onSubmit: (amount: number, category: string, description?: string) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function ExpenseForm({ onSubmit, onCancel, isSubmitting = false }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    onSubmit(numericAmount, category, description);
  };

  const selectedCategory = CATEGORIES.find(cat => cat.id === category);

  return (
    <View style={styles.container}>
      {/* Amount Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>💰 Amount</Text>
        <TextInput
          placeholder="Enter amount..."
          placeholderTextColor={Colors.textSecondary}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          editable={!isSubmitting}
        />
      </View>

      {/* Category Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>📁 Category</Text>
        
        {/* Кнопка для выбора категории */}
        <TouchableOpacity 
          style={styles.categoryButton}
          onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          disabled={isSubmitting}
        >
          <Text style={styles.categoryButtonText}>
            {selectedCategory ? `${selectedCategory.emoji} ${selectedCategory.name}` : 'Select Category'}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {/* Picker появляется при нажатии */}
        {showCategoryPicker && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => {
                setCategory(itemValue);
                setShowCategoryPicker(false);
              }}
              style={styles.picker}
              itemStyle={styles.pickerItem} // Добавляем стиль для элементов    
            >
              {CATEGORIES.map(cat => (
                <Picker.Item 
                  key={cat.id} 
                  label={`${cat.emoji} ${cat.name}`} 
                  value={cat.id} 
                />
              ))}
            </Picker>
          </View>
        )}
      </View>

      {/* Description Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>📝 Description (Optional)</Text>
        <TextInput
          placeholder="What was this expense for?"
          placeholderTextColor={Colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={3}
          editable={!isSubmitting}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>❌ Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? '⏳ Adding...' : '✅ Add Expense'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    padding: 20,
    borderRadius: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.text,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: Colors.white,
    color: Colors.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 15,
    backgroundColor: Colors.white,
  },
  categoryButtonText: {
    fontSize: 16,
    color: Colors.text,
  },
  dropdownIcon: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  picker: {
    width: '100%',
    color: Colors.text,
  },
  pickerItem: {
    color: Colors.text, // Важно: задаем цвет текста
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: Colors.accent,
  },
  cancelButton: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});

// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Colors } from '../constants/Colors';

// const CATEGORIES = [
//   { id: 'food', name: 'Food', emoji: '🍕' },
//   { id: 'transport', name: 'Transport', emoji: '🚗' },
//   { id: 'entertainment', name: 'Entertainment', emoji: '🎬' },
//   { id: 'shopping', name: 'Shopping', emoji: '🛍️' },
//   { id: 'health', name: 'Health', emoji: '🏥' },
//   { id: 'other', name: 'Other', emoji: '📦' }
// ];

// interface ExpenseFormProps {
//   onSubmit: (amount: number, category: string, description?: string) => void;
//   onCancel: () => void;
//   isSubmitting?: boolean;
// }

// export default function ExpenseForm({ onSubmit, onCancel, isSubmitting = false }: ExpenseFormProps) {
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('food');
//   const [description, setDescription] = useState('');

//   const handleSubmit = () => {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       Alert.alert('Error', 'Please enter a valid amount');
//       return;
//     }

//     onSubmit(numericAmount, category, description);
//   };

//   const selectedCategory = CATEGORIES.find(cat => cat.id === category);

//   return (
//     <View style={styles.container}>
//       {/* Amount Input */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>💰 Amount</Text>
//         <TextInput
//           placeholder="Enter amount..."
//           placeholderTextColor={Colors.textSecondary}
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="numeric"
//           style={styles.input}
//           editable={!isSubmitting}
//         />
//       </View>

//       {/* Category Picker */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>📁 Category</Text>
//         <View style={styles.pickerContainer}>
//           <Picker
//             selectedValue={category}
//             onValueChange={setCategory}
//             style={styles.picker}
//             enabled={!isSubmitting}
//           >
//             {CATEGORIES.map(cat => (
//               <Picker.Item 
//                 key={cat.id} 
//                 label={`${cat.emoji} ${cat.name}`} 
//                 value={cat.id} 
//               />
//             ))}
//           </Picker>
//         </View>
//       </View>

//       {/* Description Input */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>📝 Description (Optional)</Text>
//         <TextInput
//           placeholder="What was this expense for?"
//           placeholderTextColor={Colors.textSecondary}
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//           numberOfLines={3}
//           editable={!isSubmitting}
//         />
//       </View>

//       {/* Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, styles.cancelButton]}
//           onPress={onCancel}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.buttonText}>❌ Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.submitButton, isSubmitting && styles.disabledButton]}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.buttonText}>
//             {isSubmitting ? '⏳ Adding...' : '✅ Add Expense'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.primaryLight,
//     padding: 20,
//     borderRadius: 20,
//     shadowColor: Colors.shadow,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: Colors.text,
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: Colors.border,
//     borderRadius: 12,
//     padding: 15,
//     fontSize: 16,
//     backgroundColor: Colors.white,
//     color: Colors.text,
//   },
//   textArea: {
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   pickerContainer: {
//     borderWidth: 2,
//     borderColor: Colors.border,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: Colors.white,
//   },
//   picker: {
//     width: '100%',
//     color: Colors.text,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 15,
//     marginTop: 10,
//   },
//   button: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: Colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   submitButton: {
//     backgroundColor: Colors.accent,
//   },
//   cancelButton: {
//     backgroundColor: Colors.primaryLight,
//     borderWidth: 2,
//     borderColor: Colors.accent,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.text,
//   },
// });
