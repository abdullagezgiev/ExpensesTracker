import { Stack } from 'expo-router';
import { Colors } from './constants/Colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryDark,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: Colors.primary,
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Expense Tracker',
          headerTitleAlign: 'center'
        }} 
      />
      
      <Stack.Screen 
        name="add-expense" 
        options={{ 
          title: 'Add Expense',
          headerTitleAlign: 'center',
          presentation: 'modal'
        }} 
      />
      
      <Stack.Screen 
        name="statistics" 
        options={{ 
          title: 'Statistics',
          headerTitleAlign: 'center'
        }} 
      />
    </Stack>
  );
}