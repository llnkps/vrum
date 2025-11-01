import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useAuthContext } from '../context/AuthContext';

export default function AuthTestScreen() {
  const { isAuthenticated, user, token, isLoading, isInitialized, login, loginWithGoogle, logout, isTokenExpired } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed: ' + (error as Error).message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      Alert.alert('Success', 'Google login successful!');
    } catch (error) {
      Alert.alert('Error', 'Google login failed: ' + (error as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Success', 'Logged out successfully!');
    } catch (error) {
      Alert.alert('Error', 'Logout failed: ' + (error as Error).message);
    }
  };

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Initializing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication Test</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Authenticated: {isAuthenticated ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.statusText}>
          Loading: {isLoading ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.statusText}>
          Initialized: {isInitialized ? 'Yes' : 'No'}
        </Text>
        {user && (
          <Text style={styles.statusText}>
            User: {user.email}
          </Text>
        )}
        {token && (
          <>
            <Text style={styles.statusText}>
              Token: {token.substring(0, 20)}...
            </Text>
            <Text style={[styles.statusText, { color: isTokenExpired() ? 'red' : 'green' }]}>
              Token Status: {isTokenExpired() ? 'Expired' : 'Valid'}
            </Text>
          </>
        )}
      </View>

      {!isAuthenticated ? (
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title={isLoading ? "Logging in..." : "Login"}
            onPress={handleLogin}
            disabled={isLoading || !email || !password}
          />
          <View style={styles.spacer} />
          <Button
            title={isLoading ? "Logging in..." : "Login with Google"}
            onPress={handleGoogleLogin}
            disabled={isLoading}
          />
        </View>
      ) : (
        <View style={styles.logoutContainer}>
          <Button
            title={isLoading ? "Logging out..." : "Logout"}
            onPress={handleLogout}
            disabled={isLoading}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 5,
  },
  loginContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    fontSize: 16,
  },
  spacer: {
    height: 15,
  },
});