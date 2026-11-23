import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, Icon, PageFrame, PageIntro, SectionHeading, Surface } from '../../components/ui';
import { CONTACT } from '../../data/travel';
import { openLink } from '../../utils/links';

const OPTIONS = [
  { icon: 'calendar', title: 'Plan your trip', detail: 'Share dates, budget and travel style.', href: '/plan-trip' },
  { icon: 'card', title: 'Online payment', detail: 'Open the official payment instructions.', href: '/payment' },
  { icon: 'star', title: 'About Eternal India', detail: 'Meet the local team and how we work.', href: '/about' },
  { icon: 'globe', title: 'Visit the website', detail: 'See the latest information online.', action: () => openLink(CONTACT.website) },
];

export default function ProfileScreen() {
  return (
    <PageFrame tabbed>
      <PageIntro eyebrow="Your travel companion" title="Your journey, your way" description="No account is needed to start planning. Tell us what matters to you and the team will help with the details." />

      <View className="rounded-[28px] bg-forest p-5">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-white/15">
          <Icon name="profile" size={23} color="#FFFFFF" />
        </View>
        <Text className="mt-4 font-display text-[25px] text-white">Planning something special?</Text>
        <Text className="mt-2 text-sm leading-5 text-white/75">Build your itinerary with a local travel team, one conversation at a time.</Text>
        <View className="mt-4 self-start"><ActionButton title="Start planning" href="/plan-trip" variant="light" compact icon="arrow" /></View>
      </View>

      <SectionHeading title="Useful links" />
      <Surface className="p-2">
        {OPTIONS.map((item, index) => {
          const row = (
            <Pressable onPress={item.action} className="flex-row items-center gap-4 px-3 py-4">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-[#F4EEE5]"><Icon name={item.icon} size={18} color="#B76F51" /></View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-forest">{item.title}</Text>
                <Text className="mt-1 text-xs leading-5 text-muted">{item.detail}</Text>
              </View>
              <Icon name="chevron" size={16} color="#777B71" />
            </Pressable>
          );
          return (
            <View key={item.title}>
              {item.href ? <Link href={item.href} asChild>{row}</Link> : row}
              {index < OPTIONS.length - 1 ? <View className="mx-3 h-px bg-line" /> : null}
            </View>
          );
        })}
      </Surface>

      <SectionHeading title="Need a person?" subtitle="The team is one tap away." />
      <Surface className="bg-[#EDE6D9]">
        <Text className="font-display text-[22px] text-forest">{CONTACT.phoneDisplay}</Text>
        <Text className="mt-1 text-sm text-muted">{CONTACT.email}</Text>
        <View className="mt-4 flex-row gap-3">
          <View className="flex-1"><ActionButton title="Call" onPress={() => openLink(CONTACT.phoneLink)} compact /></View>
          <View className="flex-1"><ActionButton title="WhatsApp" onPress={() => openLink(CONTACT.whatsapp)} variant="outline" compact /></View>
        </View>
      </Surface>
    </PageFrame>
  );
}
