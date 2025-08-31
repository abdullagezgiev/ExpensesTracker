import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from './constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Expense Tracker</Text>
      <Text style={styles.subtitle}>Track your expenses easily</Text>
      
      <View style={styles.buttonContainer}>
        <Link href="/add-expense" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>➕ Add Expense</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/statistics" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.buttonText}>📊 View Statistics</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Your financial companion</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  primaryButton: {
    backgroundColor: Colors.accent,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: Colors.primaryLight,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
  },
  footerText: {
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});


// import { View, Text, Button, StyleSheet } from 'react-native';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Expense Tracker</Text>
      
//       <Link href="/add-expense" asChild>
//         <Button title="Add Expense" />
//       </Link>
      
//       <Link href="/statistics" asChild>
//         <Button title="Statistics" />
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
// });