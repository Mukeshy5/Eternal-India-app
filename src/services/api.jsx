import { create } from 'axios';

const apiBaseUrl = (process.env.EXPO_PUBLIC_API_BASE_URL || '').trim().replace(/\/+$/, '');
const enquiryPath = (process.env.EXPO_PUBLIC_ENQUIRY_PATH || '').trim();

export const isEnquiryApiConfigured = Boolean(apiBaseUrl && enquiryPath);

export const apiClient = apiBaseUrl
  ? create({
      baseURL: apiBaseUrl,
      timeout: 15000,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
  : null;

export async function postEnquiry(payload) {
  if (!apiClient || !enquiryPath) {
    throw new Error('The enquiry API is not configured.');
  }

  const response = await apiClient.post(enquiryPath, payload);
  return response.data;
}
