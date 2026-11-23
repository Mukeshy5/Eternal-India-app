import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, InfoRow, InlineNotice, PageFrame, PageIntro, SectionHeading, Surface } from '../../components/ui';
import { FormInput } from '../../components/FormInput';
import { CONTACT } from '../../data/travel';
import { useEnquiryMutation } from '../../hooks/useEnquiryMutation';
import { isEnquiryApiConfigured } from '../../services/api';
import { contactEnquirySchema } from '../../utils/validation';
import { makeMailto, openLink } from '../../utils/links';

function createContactEmail(values) {
  return `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\nPhone: ${values.phone.trim()}\n\nMessage:\n${values.message.trim()}`;
}

export default function ContactScreen() {
  const { control, handleSubmit, formState: { isSubmitting }, reset } = useForm({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });
  const enquiryMutation = useEnquiryMutation();
  const [feedback, setFeedback] = useState(null);
  const [emailFallback, setEmailFallback] = useState(null);

  const openEmailDraft = async (values) => {
    const opened = await openLink(makeMailto(CONTACT.email, 'Contact enquiry · Eternal India', createContactEmail(values)));
    setFeedback({
      tone: opened ? 'info' : 'error',
      message: opened
        ? 'An email draft is open. Review it and tap Send in your email app to submit your message.'
        : 'The email app could not be opened. Please use the phone or WhatsApp options below.',
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
      await enquiryMutation.mutateAsync({ type: 'contact', ...values });
      setFeedback({ tone: 'success', message: 'Your message was received by the configured enquiry service.' });
      reset();
    } catch {
      setEmailFallback(values);
      setFeedback({ tone: 'error', message: 'We could not send your message. Please try again or use email instead.' });
    }
  });

  return (
    <PageFrame tabbed>
      <PageIntro eyebrow="We’re here to help" title="Talk to our team" description="Ask a question, discuss a route or get help with an existing booking. Speak directly with Eternal India." />
      <Surface>
        <InfoRow icon="phone" title="Call us" detail={CONTACT.phoneDisplay} onPress={() => openLink(CONTACT.phoneLink)} />
        <View className="h-px bg-line" />
        <InfoRow icon="chat" title="WhatsApp" detail="Chat with the travel team" onPress={() => openLink(CONTACT.whatsapp)} />
        <View className="h-px bg-line" />
        <InfoRow icon="mail" title="Email" detail={CONTACT.email} onPress={() => openLink(`mailto:${CONTACT.email}`)} />
        <View className="h-px bg-line" />
        <InfoRow icon="mail" title="Alternate email" detail={CONTACT.alternateEmail} onPress={() => openLink(`mailto:${CONTACT.alternateEmail}`)} />
        <View className="h-px bg-line" />
        <InfoRow icon="globe" title="Website" detail="eternal-india.com" onPress={() => openLink(CONTACT.website)} />
      </Surface>

      <SectionHeading title="Write to us" subtitle="Your email app will open with your enquiry ready to review." />
      <Surface>
        <FormInput control={control} name="name" label="Full name" placeholder="Your name" autoCapitalize="words" />
        <FormInput control={control} name="email" label="Email address" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
        <FormInput control={control} name="phone" label="Mobile number" placeholder="Include your country code" keyboardType="phone-pad" />
        <FormInput control={control} name="message" label="How can we help?" placeholder="Tell us what you need help with" multiline />
        <ActionButton
          title={isSubmitting ? 'Sending message…' : isEnquiryApiConfigured ? 'Send message' : 'Compose enquiry email'}
          onPress={submit}
          loading={isSubmitting}
          icon="arrow"
        />
        {feedback ? <InlineNotice tone={feedback.tone}>{feedback.message}</InlineNotice> : null}
        {emailFallback ? (
          <View className="mt-3">
            <ActionButton title="Email this message instead" onPress={() => openEmailDraft(emailFallback)} variant="outline" compact icon="mail" />
          </View>
        ) : null}
        <Text className="mt-3 text-xs leading-5 text-muted">
          {isEnquiryApiConfigured
            ? 'Messages go to the configured service. This app does not store your contact details locally.'
            : 'No enquiry server is configured. Review and send the email draft from your email app; this app does not claim the message was submitted.'}
        </Text>
      </Surface>

      <SectionHeading title="Visit the Delhi office" />
      <Surface className="bg-[#EDE6D9]">
        <Text className="text-sm leading-6 text-forest">{CONTACT.address}</Text>
        <Pressable onPress={() => openLink('https://maps.google.com/?q=69%2F70+Block+N-2+Gurudwara+Road+Mohan+Garden+New+Delhi')} className="mt-4 self-start rounded-full bg-white px-4 py-3">
          <Text className="text-sm font-bold text-forest">Open directions</Text>
        </Pressable>
      </Surface>

      <View className="mt-5 flex-row gap-3">
        <View className="flex-1"><ActionButton title="Call now" onPress={() => openLink(CONTACT.phoneLink)} compact /></View>
        <View className="flex-1"><ActionButton title="WhatsApp" onPress={() => openLink(CONTACT.whatsapp)} variant="outline" compact /></View>
      </View>
    </PageFrame>
  );
}
