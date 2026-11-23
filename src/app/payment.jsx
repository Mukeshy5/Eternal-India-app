import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { ActionButton, InlineNotice, PageFrame, PageIntro, SectionHeading, Surface } from '../components/ui';
import { FormInput } from '../components/FormInput';
import { CONTACT } from '../data/travel';
import { paymentDetailsSchema } from '../utils/validation';
import { makeMailto, openLink } from '../utils/links';

export default function PaymentScreen() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: { name: '', reference: '', amount: '', email: '', phone: '' },
  });
  const [feedback, setFeedback] = useState(null);
  const [activeAction, setActiveAction] = useState(null);

  const continueToPayment = handleSubmit(async () => {
    setFeedback(null);
    setActiveAction('payment');
    const opened = await openLink(CONTACT.payment);
    setFeedback({
      tone: opened ? 'info' : 'error',
      message: opened
        ? 'The official payment instructions are open. Complete payment there, then contact the team for confirmation; this app has not marked a payment as complete.'
        : 'The official payment page could not be opened. Please contact the team for current instructions.',
    });
    setActiveAction(null);
  });

  const emailDetails = handleSubmit(async (values) => {
    setFeedback(null);
    setActiveAction('email');
    const body = `Customer: ${values.name.trim()}\nBooking/reference ID: ${values.reference.trim()}\nAmount (INR): ${values.amount.trim()}\nEmail: ${values.email.trim()}\nMobile: ${values.phone.trim()}\n\nPlease confirm the current payment instructions for this booking.`;
    const opened = await openLink(makeMailto(CONTACT.email, `Payment instructions · ${values.reference.trim()}`, body));
    setFeedback({
      tone: opened ? 'info' : 'error',
      message: opened
        ? 'An email draft is open. Review it and tap Send; no payment has been processed by this app.'
        : 'The email app could not be opened. Please contact the team by phone or WhatsApp.',
    });
    setActiveAction(null);
  });

  return (
    <PageFrame>
      <PageIntro eyebrow="Online payment" title="Payment information" description="Enter your booking details, then continue to Eternal India’s official payment instructions." />
      <Surface>
        <FormInput control={control} name="name" label="Customer name" placeholder="Name on your booking" autoCapitalize="words" />
        <FormInput control={control} name="reference" label="Booking / reference ID" placeholder="Your booking reference" autoCapitalize="characters" />
        <FormInput control={control} name="amount" label="Amount (INR)" placeholder="0.00" keyboardType="decimal-pad" />
        <FormInput control={control} name="email" label="Email address" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
        <FormInput control={control} name="phone" label="Mobile number" placeholder="Include your country code" keyboardType="phone-pad" />
        <ActionButton
          title={activeAction === 'payment' ? 'Opening official instructions…' : 'Continue to payment instructions'}
          onPress={continueToPayment}
          loading={activeAction === 'payment'}
          disabled={isSubmitting && activeAction !== 'payment'}
          icon="arrowUp"
        />
        {feedback ? <InlineNotice tone={feedback.tone}>{feedback.message}</InlineNotice> : null}
        <Text className="mt-3 text-xs leading-5 text-muted">The official website currently lists cash and bank transfer instructions; it does not provide an in-app checkout. This form never collects or stores card details.</Text>
      </Surface>

      <SectionHeading title="Need payment instructions for your booking?" />
      <Surface className="bg-[#EDE6D9]">
        <Text className="text-sm leading-5 text-forest">Email your booking details to the team to confirm the current instructions before making a transfer.</Text>
        <View className="mt-4">
          <ActionButton
            title={activeAction === 'email' ? 'Opening email…' : 'Email booking details'}
            onPress={emailDetails}
            variant="outline"
            compact
            icon="mail"
            loading={activeAction === 'email'}
            disabled={isSubmitting && activeAction !== 'email'}
          />
        </View>
      </Surface>

      <SectionHeading title="Pay safely" />
      <Surface>
        {[
          'Use the payment instructions linked from the official Eternal India website.',
          'Check the beneficiary and booking reference against your invoice before transferring.',
          'Never enter or send card details through this app.',
        ].map((item, index) => (
          <View key={item} className={`flex-row items-start gap-3 py-3 ${index < 2 ? 'border-b border-line' : ''}`}>
            <Text className="font-bold text-copper">0{index + 1}</Text><Text className="flex-1 text-sm leading-5 text-muted">{item}</Text>
          </View>
        ))}
      </Surface>
      <View className="mt-5"><ActionButton title="Open official payment page" onPress={() => openLink(CONTACT.payment)} variant="light" compact icon="arrowUp" /></View>
    </PageFrame>
  );
}
