import { Alert } from 'react-native';
import * as Linking from 'expo-linking';

export async function openLink(url) {
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    Alert.alert('Unable to open this link', 'Please try again or use the contact details shown in the app.');
    return false;
  }
}

export function makeMailto(email, subject, body) {
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${email}?${query}`;
}
