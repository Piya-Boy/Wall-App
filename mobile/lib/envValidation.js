/**
 * Environment Variables Validation
 * Checks if required environment variables are set
 */

const requiredEnvVars = [
  'CLERK_PUBLISHABLE_KEY',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
];

/**
 * Validates that all required environment variables are set
 * @returns {Object} Validation result with missing variables
 */
export const validateEnvironment = () => {
  const missing = [];
  
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });
  
  return {
    isValid: missing.length === 0,
    missing,
    message: missing.length > 0 
      ? `Missing required environment variables: ${missing.join(', ')}`
      : 'All required environment variables are set'
  };
};

/**
 * Gets environment variable with validation
 * @param {string} varName - Environment variable name
 * @param {string} defaultValue - Default value if not set
 * @returns {string} Environment variable value or default
 */
export const getEnvVar = (varName, defaultValue = '') => {
  const value = process.env[varName];
  
  if (!value && requiredEnvVars.includes(varName)) {
    console.warn(`⚠️  Missing required environment variable: ${varName}`);
  }
  
  return value || defaultValue;
};

/**
 * Logs environment validation status
 */
export const logEnvironmentStatus = () => {
  const validation = validateEnvironment();
  
  if (validation.isValid) {
    console.log('✅ Environment variables are properly configured');
  } else {
    console.error('❌ Environment validation failed:');
    console.error(validation.message);
    console.error('Please check your .env file and ensure all required variables are set.');
  }
  
  return validation;
}; 