# Authentication System

This app supports two authentication methods:

1. **JWT-based authentication** (existing system)
2. **Google OAuth authentication** (new addition)

## Setup

### Environment Variables

Add the following environment variables to your `.env` file:

```env
# Google OAuth Configuration
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_ios_client_id
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_android_client_id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id
```

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - For web: `http://localhost:8081/oauthredirect`
   - For native: `com.vrum.app://oauthredirect`

## Usage

### Using the AuthContext

```tsx
import { useAuthContext } from '../context/AuthContext';

function MyComponent() {
  const {
    isAuthenticated,
    user,
    isLoading,
    login,
    loginWithGoogle,
    logout
  } = useAuthContext();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      {isAuthenticated ? (
        <View>
          <Text>Welcome, {user?.email}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Button title="Login with Email" onPress={() => handleLogin(email, password)} />
          <Button title="Login with Google" onPress={handleGoogleLogin} />
        </View>
      )}
    </View>
  );
}
```

## Authentication State

The `isAuthenticated` property in the auth context represents the **effective authentication state**, which is `true` only when:

1. The user has successfully logged in
2. The current access token is not expired

### Token Expiration Handling

- **Proactive checking**: Tokens are checked for expiration before API calls
- **Automatic refresh**: Expired tokens are automatically refreshed when possible
- **State updates**: When tokens expire and cannot be refreshed, `isAuthenticated` automatically becomes `false`
- **Real-time monitoring**: Components can check `isTokenExpired()` for current token status

### Authentication Flow

```typescript
// isAuthenticated is automatically false when token expires
const { isAuthenticated, isTokenExpired } = useAuthContext();

if (isAuthenticated) {
  // User is logged in AND token is valid
} else if (isTokenExpired()) {
  // User was logged in but token expired
} else {
  // User is not logged in
}
```

## Testing

Visit `/auth-test` in your app to test the authentication functionality.

## Architecture

- `AuthContext.tsx`: Main authentication context with state management
- `oauth-config.ts`: OAuth configuration and utilities
- `token-manager.ts`: Token management utilities
- `cache.ts`: Token caching for native platforms

## Security Notes

- OAuth tokens are validated on app startup
- Failed authentication attempts clear all stored tokens
- Refresh tokens are invalidated on logout
- Token expiration is handled automatically