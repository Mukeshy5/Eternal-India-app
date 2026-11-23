import { z } from 'zod';

const emailField = z.string().trim().email('Enter a valid email address.');
const nameField = z.string().trim().min(2, 'Enter your full name.').max(100, 'Keep your name under 100 characters.');
const phoneField = z.string().trim().refine((value) => {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}, 'Enter a valid mobile number with 10 to 15 digits.');

function isTodayOrFuture(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return false;
  date.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export const tripEnquirySchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  destination: z.string().trim().min(2, 'Tell us where you would like to travel.').max(120, 'Keep the destination under 120 characters.'),
  startDate: z.string().refine(isTodayOrFuture, 'Choose today or a future travel date.'),
  travelers: z.string().trim().regex(/^[1-9]\d{0,2}$/, 'Enter between 1 and 999 travelers.'),
  duration: z.string().trim().min(1, 'Enter the number of days or nights.').max(60, 'Keep the duration under 60 characters.'),
  budget: z.string().trim().max(100, 'Keep the budget under 100 characters.'),
  preferences: z.array(z.string()).max(8),
  message: z.string().trim().max(1200, 'Keep your message under 1,200 characters.'),
});

export const contactEnquirySchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  message: z.string().trim().min(3, 'Tell us how we can help.').max(1200, 'Keep your message under 1,200 characters.'),
});

export const paymentDetailsSchema = z.object({
  name: nameField,
  reference: z.string().trim().min(1, 'Enter the booking or reference ID.').max(80, 'Keep the reference under 80 characters.'),
  amount: z.string().trim().regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid amount.').refine((value) => Number(value) > 0, 'Amount must be greater than zero.'),
  email: emailField,
  phone: phoneField,
});
