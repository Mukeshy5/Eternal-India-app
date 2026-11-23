import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, InlineNotice, PageFrame, PageIntro, SectionHeading, Surface } from '../components/ui';
import { FormDatePicker, FormInput } from '../components/FormInput';
import { CONTACT } from '../data/travel';
import { useEnquiryMutation } from '../hooks/useEnquiryMutation';
import { isEnquiryApiConfigured } from '../services/api';
import { makeMailto, openLink } from '../utils/links';
import { tripEnquirySchema } from '../utils/validation';

const PREFERENCES = ['Culture', 'Heritage', 'Spiritual', 'Food', 'Nature', 'Wildlife', 'Slow travel', 'Family'];

function createTripEmail(values) {
  return [
    `Full name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Mobile: ${values.phone.trim()}`,
    `Destination: ${values.destination.trim()}`,
    `Start date: ${values.startDate}`,
    `Travelers: ${values.travelers}`,
    `Duration: ${values.duration.trim()}`,
    `Budget: ${values.budget.trim() || 'Not specified'}`,
    `Travel preferences: ${values.preferences.join(', ') || 'Not specified'}`,
    `Additional message: ${values.message.trim() || 'None'}`,
  ].join('\n');
}

export default function PlanTripScreen() {
  const params = useLocalSearchParams();
  const destinationParam = Array.isArray(params.destination) ? params.destination[0] : params.destination;
  const tourParam = Array.isArray(params.tour) ? params.tour[0] : params.tour;
  const initialDestination = String(destinationParam || tourParam || '');
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(tripEnquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      destination: initialDestination,
      startDate: '',
      travelers: '2',
      duration: '',
      budget: '',
      preferences: [],
      message: '',
    },
  });
  const enquiryMutation = useEnquiryMutation();
  const [feedback, setFeedback] = useState(null);
  const [emailFallback, setEmailFallback] = useState(null);

  const openEmailDraft = async (values) => {
    const opened = await openLink(makeMailto(CONTACT.email, 'Plan your trip · Eternal India', createTripEmail(values)));
    setFeedback({
      tone: opened ? 'info' : 'error',
      message: opened
        ? 'An email draft is open. Review the details and tap Send in your email app to submit the enquiry.'
        : 'The email app could not be opened. Please contact the team by phone or WhatsApp.',
    });
  };

  const submit = handleSubmit(async (values) => {
    setFeedback(null);
    setEmailFallback(null);

    if (!isEnquiryApiConfigured) {
      await openEmailDraft(values);
      return;
    }

    try {
      await enquiryMutation.mutateAsync({
        type: 'trip-planning',
        ...values,
        travelers: Number(values.travelers),
      });
      setFeedback({ tone: 'success', message: 'Your trip enquiry was received by the configured enquiry service.' });
      reset({ ...values, name: '', email: '', phone: '', message: '' });
    } catch {
      setEmailFallback(values);
      setFeedback({ tone: 'error', message: 'We could not send your enquiry. Please try again or use email instead.' });
    }
  });

  return (
    <PageFrame>
      <PageIntro eyebrow="Start a conversation" title="Plan your trip" description="Share a few details about the journey you have in mind. The team can help shape the route and confirm current availability." />
      <Surface>
        <FormInput control={control} name="name" label="Full name" placeholder="Your name" autoCapitalize="words" />
        <FormInput control={control} name="email" label="Email address" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
        <FormInput control={control} name="phone" label="Mobile number" placeholder="Include your country code" keyboardType="phone-pad" />
        <FormInput control={control} name="destination" label="Destination" placeholder="Where would you like to go?" />

        <View className="flex-row gap-3">
          <View className="flex-1"><FormDatePicker control={control} name="startDate" label="Travel start date" /></View>
          <View className="flex-1"><FormInput control={control} name="travelers" label="Travelers" placeholder="2" keyboardType="number-pad" /></View>
        </View>
        <View className="flex-row gap-3">
          <View className="flex-1"><FormInput control={control} name="duration" label="Tour duration" placeholder="e.g. 7 days" /></View>
          <View className="flex-1"><FormInput control={control} name="budget" label="Budget (optional)" placeholder="Approx. per person" keyboardType="default" /></View>
        </View>

        <Text className="mb-2 text-[12px] font-bold text-forest">Travel preferences</Text>
        <Controller
          control={control}
          name="preferences"
          render={({ field }) => (
            <View className="mb-4 flex-row flex-wrap gap-2">
              {PREFERENCES.map((preference) => {
                const selected = (field.value || []).includes(preference);
                return (
                  <Pressable
                    key={preference}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: selected }}
                    onPress={() => field.onChange(selected ? field.value.filter((item) => item !== preference) : [...field.value, preference])}
                    className={`rounded-full border px-3 py-2.5 ${selected ? 'border-forest bg-forest' : 'border-line bg-white'}`}
                  >
                    <Text className={`text-xs font-semibold ${selected ? 'text-white' : 'text-muted'}`}>{preference}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        />
        {errors.preferences?.message ? <Text className="mb-3 text-xs text-rose">{errors.preferences.message}</Text> : null}
        <FormInput control={control} name="message" label="Additional message" placeholder="Anything else we should know?" multiline />

        <ActionButton
          title={isSubmitting ? 'Sending enquiry…' : isEnquiryApiConfigured ? 'Send enquiry' : 'Compose enquiry email'}
          onPress={submit}
          loading={isSubmitting}
          icon="arrow"
        />
        {feedback ? <InlineNotice tone={feedback.tone}>{feedback.message}</InlineNotice> : null}
        {emailFallback ? (
          <View className="mt-3">
            <ActionButton title="Email this enquiry instead" onPress={() => openEmailDraft(emailFallback)} variant="outline" compact icon="mail" />
          </View>
        ) : null}
        <Text className="mt-3 text-xs leading-5 text-muted">
          {isEnquiryApiConfigured
            ? 'Your enquiry is sent to the configured service. This form never asks for payment card details.'
            : 'No enquiry server is configured. Your email app opens with a draft for you to review and send; this app does not claim it was submitted.'}
        </Text>
      </Surface>

      <SectionHeading title="Prefer to speak first?" />
      <Surface className="bg-[#EDE6D9]">
        <Text className="text-sm leading-5 text-forest">Call or message the team at {CONTACT.phoneDisplay}.</Text>
        <View className="mt-4 flex-row gap-3">
          <View className="flex-1"><ActionButton title="Call" onPress={() => openLink(CONTACT.phoneLink)} compact /></View>
          <View className="flex-1"><ActionButton title="WhatsApp" onPress={() => openLink(CONTACT.whatsapp)} variant="outline" compact /></View>
        </View>
      </Surface>
    </PageFrame>
  );
}
