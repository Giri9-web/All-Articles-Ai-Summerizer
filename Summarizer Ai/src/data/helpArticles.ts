import { HelpArticle } from '../types';

export const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'Getting Started with BharatSummarizer',
    content: `Welcome to BharatSummarizer! This guide will help you get started with our advanced multilingual text summarization platform.

## What is BharatSummarizer?
BharatSummarizer is an AI-powered text summarization tool that supports all major Indian languages. It uses advanced natural language processing to extract key information from your text and create concise, meaningful summaries.

## Key Features:
- Support for 22+ Indian languages
- Multiple summary lengths (short, medium, long)
- Social features (like, comment, share)
- User accounts and guest access
- Advanced comparison tools
- Real-time text analysis

## How to Use:
1. Select your preferred language from the dropdown
2. Paste or type your text in the input area
3. Choose your desired summary length
4. Click "Generate Summary" to create your summary
5. Use social features to interact with summaries

## Language Support:
Our platform supports all major Indian languages including Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, and many more.`,
    category: 'Getting Started',
    tags: ['basics', 'introduction', 'languages'],
    lastUpdated: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Understanding Summary Quality and Accuracy',
    content: `Learn how our AI algorithms work and how to get the best results from your text summarization.

## How Our AI Works:
Our summarization engine uses advanced extractive and abstractive techniques:
- **Extractive Summarization**: Selects the most important sentences from your original text
- **Abstractive Summarization**: Creates new sentences that capture the essence of your content
- **Multilingual Processing**: Specialized models for each Indian language

## Factors Affecting Quality:
1. **Text Length**: Longer texts (500+ words) generally produce better summaries
2. **Text Structure**: Well-structured content with clear paragraphs works best
3. **Language Consistency**: Keep your text in one language for optimal results
4. **Content Type**: News articles, academic papers, and formal documents work exceptionally well

## Tips for Better Summaries:
- Use clear, well-formatted text
- Avoid mixing languages within the same document
- Choose appropriate summary length based on your needs
- Review and edit summaries for your specific use case

## Quality Metrics:
- **Compression Ratio**: Shows how much the text was reduced
- **Confidence Score**: Indicates the AI's confidence in the summary quality
- **Keyword Extraction**: Identifies key terms and concepts`,
    category: 'Advanced Features',
    tags: ['ai', 'quality', 'tips', 'algorithms'],
    lastUpdated: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Account Management and Settings',
    content: `Manage your BharatSummarizer account and customize your experience.

## Creating an Account:
1. Click "Sign Up" in the top navigation
2. Enter your email address and create a password
3. Verify your email address
4. Complete your profile setup

## Guest Access:
You can use BharatSummarizer without creating an account:
- Click "Continue as Guest"
- Limited features compared to registered users
- Summaries are not saved permanently
- No social features access

## Account Settings:
- **Default Language**: Set your preferred language for the interface
- **Summary Preferences**: Choose default summary length
- **Theme**: Select light, dark, or auto theme
- **Notifications**: Manage email and in-app notifications

## Privacy and Security:
- Your data is encrypted and secure
- We don't share your content with third parties
- You can delete your account and data at any time
- Regular security updates and monitoring

## Subscription Plans:
- **Free**: Basic summarization with daily limits
- **Pro**: Unlimited summaries, advanced features, priority support
- **Enterprise**: Custom solutions for organizations`,
    category: 'Account',
    tags: ['account', 'settings', 'privacy', 'subscription'],
    lastUpdated: new Date('2024-01-18'),
  },
  {
    id: '4',
    title: 'Social Features: Like, Comment, and Share',
    content: `Discover how to use the social features to engage with the BharatSummarizer community.
    content: \`Discover how to use the social features to engage with the Summarizer community.
  }
]

## Public Summaries:
When you create a summary, you can choose to make it public:
- Other users can view your summary
- Engage with community feedback
- Build your reputation in the community

## Liking Summaries:
- Show appreciation for well-crafted summaries
- Help others discover quality content
- Build connections with other users

## Commenting System:
- Provide feedback on summaries
- Ask questions about the content
- Share insights and perspectives
- Engage in meaningful discussions

## Sharing Features:
- Share summaries via social media
- Generate shareable links
- Export summaries in various formats
- Collaborate with team members

## Community Guidelines:
- Be respectful and constructive
- Provide helpful feedback
- Avoid spam or inappropriate content
- Report issues to our moderation team

## Privacy Controls:
- Choose who can see your summaries
- Control comment permissions
- Manage your public profile
- Block or report problematic users`,
    category: 'Social Features',
    tags: ['social', 'community', 'sharing', 'engagement'],
    lastUpdated: new Date('2024-01-22'),
  },
  {
    id: '5',
    title: 'Troubleshooting Common Issues',
    content: `Solutions to common problems and frequently asked questions.

## Summary Not Generating:
**Problem**: The summarizer isn't working
**Solutions**:
- Check your internet connection
- Ensure text is at least 50 words long
- Try refreshing the page
- Clear your browser cache

## Language Detection Issues:
**Problem**: Wrong language detected
**Solutions**:
- Manually select the correct language
- Ensure text is in a single language
- Check for special characters or formatting

## Poor Summary Quality:
**Problem**: Summary doesn't capture key points
**Solutions**:
- Try a different summary length
- Ensure source text is well-structured
- Remove unnecessary formatting
- Use formal, clear language

## Login Problems:
**Problem**: Can't access your account
**Solutions**:
- Check email and password
- Use password reset feature
- Clear browser cookies
- Try incognito/private mode

## Performance Issues:
**Problem**: Slow loading or processing
**Solutions**:
- Check internet speed
- Try during off-peak hours
- Reduce text length
- Update your browser

## Contact Support:
If you continue experiencing issues:
- Live chat: Available 24/7
- Help forum: Community support
- Phone: +91-XXX-XXX-XXXX`,
    category: 'Troubleshooting',
    tags: ['troubleshooting', 'problems', 'support', 'faq'],
    lastUpdated: new Date('2024-01-25'),
  },
];