# Summarizer Mobile App

A powerful React Native mobile application for multilingual text summarization supporting 22+ Indian languages with advanced AI capabilities.

## 🚀 Features

### Core Functionality
- **Advanced Text Summarization**: AI-powered summarization with multiple length options
- **Multilingual Support**: 22+ Indian languages including Hindi, Bengali, Telugu, Tamil, and more
- **Real-time Processing**: Fast and efficient text processing with live statistics
- **Smart Language Detection**: Automatic language identification with manual override
- **Offline Capability**: Basic summarization works without internet connection

### User Experience
- **Beautiful UI/UX**: Modern, intuitive design with smooth animations
- **Dark/Light Theme**: Automatic theme switching based on system preferences
- **Haptic Feedback**: Enhanced user interaction with tactile responses
- **Voice Input**: Speech-to-text for hands-free text input
- **Export Options**: Share summaries via multiple platforms

### Social Features
- **User Profiles**: Personalized accounts with statistics and preferences
- **Summary History**: Save and organize all your summaries
- **Public/Private Summaries**: Choose visibility for your content
- **Like & Share**: Engage with community summaries
- **Comments**: Discuss and provide feedback on summaries

### Advanced Features
- **Batch Processing**: Summarize multiple texts simultaneously
- **Custom Templates**: Save frequently used summary configurations
- **Analytics Dashboard**: Track your usage patterns and improvements
- **Cloud Sync**: Synchronize data across devices
- **Push Notifications**: Get notified about summary completion and updates

## 📱 Screenshots

### Home Screen
- Welcome interface with language carousel
- Quick action buttons for common tasks
- Feature highlights and statistics
- Beautiful gradient backgrounds with animations

### Summarizer Screen
- Clean text input with real-time statistics
- Language selector with native script display
- Summary length options with visual indicators
- Processing animations and progress feedback

### History Screen
- Organized list of all summaries
- Filter options (All, Public, Private)
- Quick actions (Share, Delete, Edit)
- Search and sort functionality

### Profile Screen
- User statistics and achievements
- Settings and preferences
- Account management
- App information and support links

## 🛠️ Technical Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library
- **Redux Toolkit**: State management
- **React Native Reanimated**: Smooth animations
- **Expo Vector Icons**: Comprehensive icon library

### Backend Integration
- **REST API**: Communication with Python backend
- **AsyncStorage**: Local data persistence
- **Expo SecureStore**: Secure credential storage
- **Push Notifications**: Real-time updates
- **File System**: Document and media handling

### UI/UX Libraries
- **React Native Elements**: UI component library
- **React Native Paper**: Material Design components
- **Lottie**: Advanced animations
- **Linear Gradient**: Beautiful gradient effects
- **Haptic Feedback**: Tactile user feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-repo/bharatsummarizer-mobile.git
cd bharatsummarizer-mobile
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
```

3. **Start the development server**:
```bash
npm start
# or
expo start
```

4. **Run on device/simulator**:
```bash
# For Android
npm run android

# For iOS
npm run ios

# For web (development)
npm run web
```

### Environment Setup

Create a `.env` file in the root directory:
```env
API_BASE_URL=http://localhost:5000
SENTRY_DSN=your_sentry_dsn
ANALYTICS_KEY=your_analytics_key
```

## 📦 Build and Deployment

### Development Build
```bash
# Build for development
expo build:android --type apk
expo build:ios --type simulator
```

### Production Build
```bash
# Build for production
eas build --platform android --profile production
eas build --platform ios --profile production
```

### App Store Deployment
```bash
# Submit to Google Play Store
eas submit --platform android

# Submit to Apple App Store
eas submit --platform ios
```

## 🏗️ Project Structure

```
mobile_app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components
│   │   ├── forms/          # Form components
│   │   └── modals/         # Modal components
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── SummarizerScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/         # Navigation configuration
│   ├── store/             # Redux store and slices
│   │   ├── authSlice.ts
│   │   ├── summarySlice.ts
│   │   └── settingsSlice.ts
│   ├── services/          # API and external services
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── constants/         # App constants
├── assets/                # Images, fonts, and other assets
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "BharatSummarizer",
    "slug": "bharatsummarizer",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#3B82F6"
    },
    "platforms": ["ios", "android", "web"],
    "ios": {
      "bundleIdentifier": "com.bharatsummarizer.app",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.bharatsummarizer.app",
      "versionCode": 1
    }
  }
}
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Performance Testing
```bash
npm run test:performance
```

## 📊 Analytics and Monitoring

### Crash Reporting
- **Sentry**: Real-time error tracking and performance monitoring
- **Crashlytics**: Firebase crash reporting for production apps

### User Analytics
- **Expo Analytics**: Built-in analytics for user behavior
- **Custom Events**: Track specific user interactions and features

### Performance Monitoring
- **Flipper**: Development debugging and performance analysis
- **React Native Performance**: Built-in performance monitoring

## 🔒 Security Features

### Data Protection
- **Secure Storage**: Sensitive data encrypted using Expo SecureStore
- **API Security**: Token-based authentication with refresh tokens
- **Input Validation**: Comprehensive validation for all user inputs
- **Privacy Controls**: User-controlled data sharing and analytics

### Authentication
- **JWT Tokens**: Secure authentication with automatic refresh
- **Biometric Authentication**: Fingerprint and Face ID support
- **Guest Mode**: Limited functionality without account creation
- **Social Login**: Optional OAuth integration

## 🌐 Internationalization

### Language Support
- **22+ Indian Languages**: Full support for major Indian languages
- **RTL Support**: Right-to-left text support for Urdu and Arabic
- **Dynamic Font Loading**: Automatic font selection based on language
- **Localized UI**: Interface elements translated to user's language

### Implementation
```typescript
// Language configuration
const languages = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', rtl: false },
  { code: 'ur', name: 'Urdu', native: 'اردو', rtl: true },
  // ... more languages
];
```

## 🚀 Performance Optimization

### Code Optimization
- **Code Splitting**: Lazy loading of screens and components
- **Bundle Analysis**: Regular bundle size monitoring and optimization
- **Memory Management**: Efficient memory usage and cleanup
- **Image Optimization**: Automatic image compression and caching

### Network Optimization
- **API Caching**: Intelligent caching of API responses
- **Offline Support**: Core functionality available offline
- **Background Sync**: Automatic data synchronization when online
- **Request Batching**: Efficient API request handling

## 📱 Platform-Specific Features

### iOS Features
- **3D Touch**: Quick actions from home screen
- **Siri Shortcuts**: Voice commands for common actions
- **Widget Support**: Home screen widgets for quick access
- **Apple Pencil**: Enhanced text input on iPad

### Android Features
- **Adaptive Icons**: Dynamic icon theming
- **Shortcuts**: App shortcuts for quick actions
- **Android Auto**: Voice-controlled summarization while driving
- **Work Profile**: Enterprise features for business users

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use ESLint and Prettier for code formatting
3. Write comprehensive tests for new features
4. Follow React Native performance guidelines
5. Maintain accessibility standards

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request with detailed description
5. Ensure all CI checks pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

### Contact Information
- **Email**: support@bharatsummarizer.com
- **Website**: https://bharatsummarizer.com
- **GitHub Issues**: Create an issue for bugs or feature requests
- **Discord**: Join our community for discussions

### Documentation
- **API Documentation**: https://docs.bharatsummarizer.com
- **User Guide**: https://help.bharatsummarizer.com
- **Developer Guide**: https://dev.bharatsummarizer.com

---

**Built with ❤️ for the Indian language community**

*Empowering users with advanced AI-powered text summarization in their native languages*