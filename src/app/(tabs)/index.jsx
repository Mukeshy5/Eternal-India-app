import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { ActionButton, DestinationCard, Icon, PageFrame, Pill, RegionCard, SearchInput, SectionHeading, Surface, TourCard } from '../../components/ui';
import { ASSETS, DESTINATION_DETAILS, REGIONS, TOURS } from '../../data/travel';
import { openLink } from '../../utils/links';

const QUICK_LINKS = [
  { label: 'Golden Triangle', href: '/tour/golden-triangle' },
  { label: 'Buddhist Circuit', href: '/buddhist' },
  { label: 'Rajasthan', href: '/destination/rajasthan' },
  { label: 'Varanasi', href: '/destination/varanasi' },
];

const EXPERIENCES = [
  { title: 'Sacred journeys', detail: 'Pilgrimage & reflection', image: ASSETS.buddha, href: '/buddhist', tag: 'BUDDHIST CIRCUIT' },
  { title: 'Royal Rajasthan', detail: 'Forts, colour & culture', image: ASSETS.rajasthanTour, href: '/destination/rajasthan', tag: 'HERITAGE' },
  { title: 'Mountain air', detail: 'Slow days in the hills', image: ASSETS.manali, href: '/tour/manali-volvo', tag: 'HIMALAYAS' },
];

function ExperienceCard({ experience }) {
  return (
    <Link href={experience.href} asChild>
      <Pressable accessibilityRole="link" className="mr-3 w-[252px] overflow-hidden rounded-[26px] bg-forest">
        <Image source={experience.image} contentFit="cover" transition={220} style={{ width: '100%', height: 218 }} />
        <View className="absolute inset-0 bg-[#102A23]/40" />
        <View className="absolute inset-x-0 bottom-0 p-4">
          <Text className="mb-2 self-start rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-bold tracking-[1.4px] text-white">{experience.tag}</Text>
          <Text className="font-display text-[25px] leading-8 text-white">{experience.title}</Text>
          <View className="mt-1 flex-row items-center justify-between">
            <Text className="text-sm text-white/85">{experience.detail}</Text>
            <View className="h-9 w-9 items-center justify-center rounded-full bg-white"><Icon name="arrow" size={15} /></View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const searchTravel = () => {
    const phrase = search.trim().toLowerCase();
    if (!phrase) {
      router.push('/destinations');
      return;
    }
    const tour = TOURS.find((item) => `${item.name} ${item.route}`.toLowerCase().includes(phrase));
    if (tour) {
      router.push(`/tour/${tour.slug}`);
      return;
    }
    const destination = Object.values(DESTINATION_DETAILS).find((item) => `${item.name} ${item.region}`.toLowerCase().includes(phrase));
    router.push(destination ? `/destination/${destination.slug}` : `/destinations?query=${encodeURIComponent(search.trim())}`);
  };

  return (
    <PageFrame tabbed>
      <View className="overflow-hidden rounded-[34px] bg-forestDeep">
        <Image source={ASSETS.heroVaranasi} contentFit="cover" transition={260} style={{ height: 420, width: '100%' }} />
        <View className="absolute inset-0 bg-[#102A23]/55" />
        <View className="absolute inset-x-0 top-0 flex-row items-center justify-between p-5">
          <View className="rounded-full border border-white/30 bg-black/15 px-3 py-2">
            <Text className="text-[10px] font-bold uppercase tracking-[1.8px] text-white">India · thoughtfully explored</Text>
          </View>
          <View className="h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10">
            <Icon name="star" size={18} color="#FFFFFF" />
          </View>
        </View>
        <View className="absolute inset-x-0 bottom-0 p-6 pb-8">
          <Text className="mb-3 text-[11px] font-bold uppercase tracking-[2.3px] text-[#F5C9DE]">Journeys shaped around you</Text>
          <Text className="font-display text-[42px] leading-[46px] text-white">Find your way{ '\n' }to India.</Text>
          <Text className="mt-3 max-w-[410px] text-[14px] leading-6 text-white/85">From the first light on the ghats to a quiet road through the hills, make space for the India that speaks to you.</Text>
          <View className="mt-5 flex-row flex-wrap gap-3">
            <ActionButton title="Explore journeys" href="/india" variant="light" compact icon="arrow" />
            <ActionButton title="Plan your trip" href="/plan-trip" variant="glass" compact />
          </View>
        </View>
      </View>

      <View className="z-10 -mt-6 mx-2 rounded-[26px] border border-line bg-white p-4 shadow-md">
        <View className="mb-3 flex-row items-end justify-between gap-3 px-1">
          <View className="flex-1">
            <Text className="text-[10px] font-bold uppercase tracking-[1.7px] text-copper">Start with a place</Text>
            <Text className="mt-1 font-display text-[22px] text-forest">Where to next?</Text>
          </View>
          <Icon name="pin" size={20} color="#B76F51" />
        </View>
        <SearchInput value={search} onChangeText={setSearch} onSubmitEditing={searchTravel} placeholder="Search a destination or tour" />
        <Pressable accessibilityRole="button" onPress={searchTravel} className="mt-3 h-12 flex-row items-center justify-center gap-2 rounded-full bg-forest">
          <Icon name="search" size={16} color="#FFFFFF" />
          <Text className="text-sm font-bold text-white">Find your journey</Text>
        </Pressable>
      </View>

      <View className="mb-1 mt-5">
        <Text className="mb-3 text-[10px] font-bold uppercase tracking-[1.7px] text-muted">Popular starting points</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 pl-5">
          {QUICK_LINKS.map((item) => (
            <Link key={item.label} href={item.href} asChild>
              <Pressable className="mr-2 rounded-full border border-line bg-white px-4 py-3">
                <Text className="text-xs font-semibold text-forest">{item.label}</Text>
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </View>

      <SectionHeading title="Travel by feeling" subtitle="Choose the kind of journey you want to remember." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 pl-5">
        {EXPERIENCES.map((experience) => <ExperienceCard key={experience.title} experience={experience} />)}
      </ScrollView>

      <SectionHeading title="Six regions, many stories" subtitle="Start with a corner of India and follow what draws you in." href="/india" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 pl-5">
        {REGIONS.map((region) => <RegionCard key={region.slug} region={region} horizontal />)}
      </ScrollView>

      <SectionHeading title="Places to fall for" subtitle="A few favourites to get your imagination moving." href="/destinations" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 pl-5">
        {['varanasi', 'jaipur', 'kashmir', 'andaman'].map((slug) => (
          <DestinationCard key={slug} destination={DESTINATION_DETAILS[slug]} horizontal />
        ))}
      </ScrollView>

      <SectionHeading title="Journeys worth taking" subtitle="Signature routes from Eternal India." href="/(tabs)/tours" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 pl-5">
        {TOURS.slice(0, 4).map((tour) => <TourCard key={tour.slug} tour={tour} horizontal />)}
      </ScrollView>

      <View className="mt-9 overflow-hidden rounded-[30px] bg-forest">
        <Image source={ASSETS.buddha} contentFit="cover" transition={220} style={{ width: '100%', height: 245 }} />
        <View className="absolute inset-0 bg-[#102A23]/50" />
        <View className="absolute inset-x-0 bottom-0 p-5">
          <Text className="text-[10px] font-bold uppercase tracking-[2px] text-white/80">A journey of reflection</Text>
          <Text className="mt-2 font-display text-[30px] leading-9 text-white">Walk the Buddhist Circuit</Text>
          <Text className="mt-1 text-sm text-white/80">Bodh Gaya · Sarnath · Rajgir · Kushinagar</Text>
          <Link href="/buddhist" asChild>
            <Pressable accessibilityRole="link" className="mt-4 self-start flex-row items-center gap-2 rounded-full bg-white px-4 py-3">
              <Text className="text-sm font-bold text-forest">Explore Buddhist tours</Text>
              <Icon name="arrow" size={15} />
            </Pressable>
          </Link>
        </View>
      </View>

      <SectionHeading title="Why travel with us" subtitle="A local team helps make the details feel easy." href="/about" />
      <View className="gap-3">
        {[
          ['Local perspective', 'Thoughtful routes built around the places and people you want to meet.'],
          ['Made to fit', 'Share your pace, dates and interests; the itinerary can be shaped around them.'],
          ['Here when you need us', 'Speak directly with the team before your trip and while plans take shape.'],
        ].map(([title, detail], index) => (
          <Surface key={title} className="flex-row items-start gap-4 p-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#F9E9F1]">
              <Text className="font-display text-lg text-rose">0{index + 1}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-bold text-forest">{title}</Text>
              <Text className="mt-1 text-sm leading-5 text-muted">{detail}</Text>
            </View>
          </Surface>
        ))}
      </View>

      <Surface className="mt-8 bg-[#F1E8DC]">
        <Text className="text-[10px] font-bold uppercase tracking-[2px] text-copper">Traveler reviews</Text>
        <Text className="mt-2 font-display text-[25px] leading-8 text-forest">Good journeys stay with you.</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">Read current traveler feedback on the company’s public listing.</Text>
        <Pressable accessibilityRole="link" onPress={() => openLink('https://www.justdial.com/Varanasi/Eternal-India-Opposite-Taksal-Cinema-Nadser-Cantonment/0542PX542-X542-230304172835-Y9K2_BZDET')} className="mt-4 flex-row items-center gap-2 self-start">
          <Text className="text-sm font-bold text-rose">View traveler ratings</Text>
          <Icon name="arrowUp" size={15} color="#C33982" />
        </Pressable>
      </Surface>

      <View className="mb-5 mt-8 rounded-[30px] bg-[#EDE6D9] p-5">
        <Pill tone="green">Your next chapter</Pill>
        <Text className="mt-3 font-display text-[28px] leading-9 text-forest">Your India story starts with a conversation.</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">Tell us what you have in mind. We’ll help you shape the route.</Text>
        <View className="mt-4 flex-row flex-wrap gap-3">
          <ActionButton title="Plan your trip" href="/plan-trip" compact icon="arrow" />
          <ActionButton title="About us" href="/about" variant="outline" compact />
        </View>
      </View>
    </PageFrame>
  );
}
