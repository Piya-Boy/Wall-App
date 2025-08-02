#!/usr/bin/env node

/**
 * Wallet App Setup Script
 * Helps users configure environment variables
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get the project root directory (one level up from scripts folder)
const projectRoot = path.resolve(process.cwd(), '..');
const envPath = path.join(projectRoot, '.env');
const envExamplePath = path.join(projectRoot, 'env.example');

console.log('🔐 Wallet App Environment Setup');
console.log('================================\n');

/**
 * Prompts user for input
 * @param {string} question - Question to ask
 * @returns {Promise<string>} User input
 */
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
};

/**
 * Creates .env file with user input
 */
const createEnvFile = async () => {
  console.log('Please provide the following information:\n');
  
  const clerkKey = await askQuestion('Clerk Publishable Key: ');
  const googleClientId = await askQuestion('Google Client ID: ');
  const googleClientSecret = await askQuestion('Google Client Secret: ');
  
  const envContent = `# Clerk Configuration
# Get your publishable key from: https://dashboard.clerk.com/
CLERK_PUBLISHABLE_KEY=${clerkKey}

# Google OAuth Configuration
# Get your credentials from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=${googleClientId}
GOOGLE_CLIENT_SECRET=${googleClientSecret}

# Other OAuth Providers (optional)
# FACEBOOK_APP_ID=your_facebook_app_id_here
# APPLE_CLIENT_ID=your_apple_client_id_here

# Backend API Configuration
# API_BASE_URL=https://your-backend-api.com
# API_KEY=your_api_key_here
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file created successfully!');
    console.log('📝 Please review the file and make sure all values are correct.');
  } catch (error) {
    console.error('\n❌ Error creating .env file:', error.message);
  }
};

/**
 * Checks if .env file exists
 */
const checkEnvFile = () => {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists!');
    return askQuestion('Do you want to overwrite it? (y/N): ').then(answer => {
      return answer.toLowerCase() === 'y';
    });
  }
  return Promise.resolve(true);
};

/**
 * Main setup function
 */
const main = async () => {
  try {
    const shouldProceed = await checkEnvFile();
    
    if (shouldProceed) {
      await createEnvFile();
    } else {
      console.log('Setup cancelled.');
    }
  } catch (error) {
    console.error('Setup failed:', error.message);
  } finally {
    rl.close();
  }
};

// Run setup if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { createEnvFile, checkEnvFile }; 