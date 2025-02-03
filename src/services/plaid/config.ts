import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import Constants from 'expo-constants';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': Constants.expoConfig?.extra?.plaidClientId,
      'PLAID-SECRET': Constants.expoConfig?.extra?.plaidSandboxSecret,
    },
  },
});

export const plaidClient = new PlaidApi(configuration);

export const createLinkToken = async (userId: string) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: 'Quartz',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Plaid link token:', error);
    throw error;
  }
};

export const exchangePublicToken = async (publicToken: string) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    return response.data;
  } catch (error) {
    console.error('Error exchanging public token:', error);
    throw error;
  }
}; 