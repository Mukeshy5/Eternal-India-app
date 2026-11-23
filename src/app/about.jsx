import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, PageFrame, PageIntro, SectionHeading, Surface } from '../components/ui';
import { ASSETS } from '../data/travel';

const CAPABILITIES = [
  ['Network', 'We partner with hotels across budget and luxury categories, transport providers throughout India, and experienced guides who speak many languages. Our network of 30 associates in key Indian cities and our local offices help keep tours running smoothly.'],
  ['Creativity', 'Our knowledgeable staff are ready to handle and resolve client queries. Our offices have modern technology and the people needed to complete work on time and professionally.'],
  ['Bookings', 'Our experienced staff reply quickly, with a centralized CRS (Computer Reservation System) to manage and confirm hotel bookings and tour packages. We share tour details, itinerary information and practical travel tips.'],
  ['Emergency Contacts', 'Our 24-hour contact cell assists customers before and during tours. Our skilled team is ready to take care of last-minute special requests.'],
];

const COMMITMENTS = [
  'We are dedicated to building long-term client relationships because our customers define the standard of our service.',
  'We want your trip to be truly memorable. We select accommodation, transportation, sightseeing and excursions to suit your taste, and put our specialist knowledge to work in perfecting your travel plans.',
  'We do our best to achieve excellence in everything we undertake and deliver customer satisfaction by being efficient and competitive.',
  'We respond to our clients with a sense of urgency.',
  'We aim to help develop offbeat travel destinations in India, so visitors can see and feel the real India alongside its traditional destinations.',
  'Our caring travel professionals understand the destinations and offer practical suggestions for every place you visit.',
];

export default function AboutScreen() {
  return (
    <PageFrame>
      <PageIntro eyebrow="About Eternal India" title="We bring India closer" description="Eternal India is a destination management company creating journeys through India and nearby South Asia. The best trips start with a good conversation and a route that feels like your own." />
      <View className="overflow-hidden rounded-[28px] bg-forest">
        <Image source={ASSETS.heroVaranasi} contentFit="cover" transition={200} style={{ height: 235, width: '100%' }} />
        <View className="absolute inset-0 bg-[#102A23]/45" />
        <View className="absolute inset-x-0 bottom-0 p-5">
          <Text className="font-display text-[27px] leading-8 text-white">A decade of dedicated travel service</Text>
          <Text className="mt-2 text-sm leading-5 text-white/80">From a single city stay to a multi-region journey.</Text>
        </View>
      </View>

      <SectionHeading title="Our Vision" />
      <Surface>
        <Text className="text-sm leading-6 text-muted">To provide the best tour packages at competitive prices through comprehensive, professional service and the best available resources and technology. We aim to make our services effective and suitable, while nurturing a work culture and environment—internally and externally—that promotes total commitment and growth. Our vision is to become India’s largest and most reliable travel company, known for distinctive standards of professionalism and reliability.</Text>
      </Surface>

      <SectionHeading title="Network, Creativity, Bookings & Emergency Contacts" subtitle="The people and systems behind a smooth journey." />
      <View className="gap-3">
        {CAPABILITIES.map(([title, detail], index) => (
          <Surface key={title} className="flex-row items-start gap-4 p-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#F9E9F1]"><Text className="font-display text-lg text-rose">0{index + 1}</Text></View>
            <View className="flex-1"><Text className="text-[15px] font-bold text-forest">{title}</Text><Text className="mt-1 text-sm leading-5 text-muted">{detail}</Text></View>
          </Surface>
        ))}
      </View>

      <SectionHeading title="Reach Us for" subtitle="Journeys across India and the South Asian subcontinent." />
      <Surface>
        <Text className="text-sm leading-6 text-muted">We take you on a journey to mystic destinations. Explore fascinating places across India and the subcontinent, including Nepal and Bhutan. In India, discover Delhi, Agra, Jaipur and Rajasthan, Goa, South India and Kerala’s backwaters, the forests of Eastern India, and the exotic hills of Leh-Ladakh and Uttarakhand. Choose cultural tours of grand temples and monuments or visit Buddhist pilgrimage destinations.</Text>
        <View className="mt-4 self-start"><ActionButton title="Explore our tours" href="/(tabs)/tours" compact icon="arrow" /></View>
      </Surface>

      <SectionHeading title="Our commitments" subtitle="Dedicated to your journey." />
      <View className="gap-3">
        {COMMITMENTS.map((commitment, index) => (
          <Surface key={commitment} className="flex-row items-start gap-4 p-4">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-[#E8EFEA]"><Text className="font-display text-base text-forest">0{index + 1}</Text></View>
            <Text className="flex-1 text-sm leading-6 text-muted">{commitment}</Text>
          </Surface>
        ))}
      </View>

      <SectionHeading title="Company credentials" subtitle="Materials supplied with the Eternal India brand." />
      <View className="flex-row flex-wrap justify-between gap-3">
        {[ASSETS.credentialIato, ASSETS.credentialMinistry, ASSETS.credentialInbound].map((source, index) => (
          <View key={index} className="h-[112px] w-[31%] items-center justify-center rounded-2xl border border-line bg-white p-2">
            <Image source={source} contentFit="contain" style={{ width: '100%', height: '100%' }} />
          </View>
        ))}
      </View>
      <Text className="mt-2 text-xs leading-5 text-muted">Displayed marks are included from the company’s supplied brand assets.</Text>

      <Surface className="mt-7 bg-[#EDE6D9]">
        <Text className="font-display text-[25px] text-forest">Let’s plan something memorable.</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">Tell us what you want to see and how you like to travel.</Text>
        <View className="mt-4 flex-row gap-3">
          <ActionButton title="Plan your trip" href="/plan-trip" compact icon="arrow" />
          <Link href="/(tabs)/contact" asChild><Pressable className="min-h-[42px] items-center justify-center rounded-full border border-forest px-4"><Text className="text-sm font-bold text-forest">Contact us</Text></Pressable></Link>
        </View>
      </Surface>
    </PageFrame>
  );
}
