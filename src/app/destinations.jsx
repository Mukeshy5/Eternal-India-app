import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

import { DestinationCard, PageFrame, PageIntro, RegionCard, SearchInput, SectionHeading, Surface } from '../components/ui';
import { DESTINATIONS, REGIONS } from '../data/travel';

const REGION_SLUGS = new Set(REGIONS.map((region) => region.slug));
const FILTERS = ['All', 'India', 'Buddhist Circuit', 'Beyond India'];

export default function DestinationsScreen() {
  const params = useLocalSearchParams();
  const [query, setQuery] = useState(String(params.query ?? ''));
  const [filter, setFilter] = useState('All');
  const places = useMemo(() => DESTINATIONS.filter((destination) => {
    if (REGION_SLUGS.has(destination.slug)) return false;
    const matchesQuery = `${destination.name} ${destination.region} ${destination.intro}`.toLowerCase().includes(query.trim().toLowerCase());
    const isBeyond = destination.region === 'Beyond India' || destination.region.includes('Nepal');
    const isBuddhist = destination.slug === 'bodh-gaya' || destination.slug === 'sarnath' || destination.slug === 'kushinagar' || destination.slug === 'rajgir' || destination.slug === 'nalanda' || destination.slug === 'lumbini';
    const matchesFilter = filter === 'All' || (filter === 'India' && !isBeyond) || (filter === 'Beyond India' && isBeyond) || (filter === 'Buddhist Circuit' && isBuddhist);
    return matchesQuery && matchesFilter;
  }), [query, filter]);

  return (
    <PageFrame>
      <PageIntro eyebrow="A place to begin" title="Destinations in India" description="Browse destination guides, then open a place for its highlights, experiences, best time to visit and related journeys." />
      <SearchInput value={query} onChangeText={setQuery} placeholder="Search destinations" />
      <SectionHeading title="Explore by region" subtitle="Six distinct corners of India." href="/india" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 mb-5 pl-5">
        {REGIONS.map((region) => <RegionCard key={region.slug} region={region} horizontal />)}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 mb-4 pl-5">
        {FILTERS.map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)} className={`mr-2 rounded-full border px-4 py-2.5 ${filter === item ? 'border-forest bg-forest' : 'border-line bg-white'}`}>
            <Text className={`text-xs font-bold ${filter === item ? 'text-white' : 'text-muted'}`}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <SectionHeading title={`${places.length} places`} subtitle="Tap a destination to explore its guide." />
      {places.length ? places.map((destination) => <DestinationCard key={destination.slug} destination={destination} />) : (
        <Surface className="items-center py-8">
          <Text className="font-display text-xl text-forest">No destinations found</Text>
          <Text className="mt-2 text-sm text-muted">Try a different search or filter.</Text>
        </Surface>
      )}
      <Text className="mb-4 mt-2 text-xs leading-5 text-muted">Nearby extensions in Nepal and Sri Lanka are shown separately from the India list.</Text>
    </PageFrame>
  );
}
