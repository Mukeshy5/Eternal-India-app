import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { ActionButton, DestinationCard, PageFrame, PageIntro, RegionCard, SearchInput, SectionHeading, Surface } from '../../components/ui';
import { DESTINATIONS, REGIONS } from '../../data/travel';

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const places = useMemo(() => DESTINATIONS.filter((item) => {
    const matchesQuery = `${item.name} ${item.region} ${item.intro}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesRegion = regionFilter === 'All' || item.region.toLowerCase().includes(regionFilter.toLowerCase()) || item.name.toLowerCase().includes(regionFilter.toLowerCase());
    return matchesQuery && matchesRegion;
  }), [query, regionFilter]);
  const filters = ['All', 'North', 'South', 'East', 'West', 'Central', 'Northeast'];

  return (
    <PageFrame tabbed>
      <PageIntro eyebrow="The subcontinent, your way" title="Explore India" description="Find a region, a city or a story worth following. Every route can be shaped around your dates and interests." />
      <SearchInput value={query} onChangeText={setQuery} placeholder="Search a place or state" />
      <SectionHeading title="By region" subtitle="Choose a starting point." href="/india" />
      <View className="-mr-5 flex-row">
        {REGIONS.map((region) => <RegionCard key={region.slug} region={region} horizontal />)}
      </View>

      <SectionHeading title="Find your place" subtitle={`${places.length} journeys and destinations`} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 mb-4 pl-5">
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setRegionFilter(filter)}
            className={`mr-2 rounded-full border px-4 py-2.5 ${regionFilter === filter ? 'border-forest bg-forest' : 'border-line bg-white'}`}
          >
            <Text className={`text-xs font-bold ${regionFilter === filter ? 'text-white' : 'text-muted'}`}>{filter}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {places.length ? places.map((destination) => <DestinationCard key={destination.slug} destination={destination} />) : (
        <Surface className="items-center py-8">
          <Text className="font-display text-xl text-forest">No places found</Text>
          <Text className="mt-2 text-center text-sm text-muted">Try another region or search term.</Text>
        </Surface>
      )}
      <Surface className="mt-5 bg-[#EDE6D9]">
        <Text className="font-display text-2xl text-forest">Want to go beyond India?</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">Explore nearby journeys in Nepal and Sri Lanka, including a Lumbini extension.</Text>
        <View className="mt-4 flex-row gap-2">
          <Link href="/destination/nepal" asChild><Pressable className="rounded-full bg-white px-4 py-3"><Text className="text-sm font-bold text-forest">Nepal</Text></Pressable></Link>
          <Link href="/destination/sri-lanka" asChild><Pressable className="rounded-full bg-white px-4 py-3"><Text className="text-sm font-bold text-forest">Sri Lanka</Text></Pressable></Link>
        </View>
      </Surface>
      <ActionButton title="Plan a custom route" href="/plan-trip" compact icon="arrow" />
    </PageFrame>
  );
}
