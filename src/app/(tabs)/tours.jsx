import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

import { ActionButton, PageFrame, PageIntro, SearchInput, SectionHeading, Surface, TourCard } from '../../components/ui';
import { TOURS, TOUR_CATEGORIES } from '../../data/travel';
import { openLink } from '../../utils/links';

export default function ToursScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const tours = useMemo(() => TOURS.filter((tour) => {
    const matchesCategory = category === 'All' || tour.category === category;
    const matchesQuery = `${tour.name} ${tour.route} ${tour.summary}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [query, category]);

  return (
    <PageFrame tabbed>
      <PageIntro eyebrow="Journeys by Eternal India" title="Find your kind of India" description="Browse heritage circuits, culture-rich city stays and pilgrimage routes. Published durations are a starting point; ask us to confirm dates and current inclusions." />
      <SearchInput value={query} onChangeText={setQuery} placeholder="Search tours or destinations" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 mb-3 mt-4 pl-5">
        {TOUR_CATEGORIES.map((item) => (
          <Pressable key={item} onPress={() => setCategory(item)} className={`mr-2 rounded-full border px-4 py-2.5 ${category === item ? 'border-forest bg-forest' : 'border-line bg-white'}`}>
            <Text className={`text-xs font-bold ${category === item ? 'text-white' : 'text-muted'}`}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <SectionHeading title={`${tours.length} journeys`} subtitle="Open any route for highlights and itinerary." />
      {tours.length ? tours.map((tour) => <TourCard key={tour.slug} tour={tour} />) : (
        <Surface className="items-center py-8">
          <Text className="font-display text-xl text-forest">No matching journeys</Text>
          <Text className="mt-2 text-center text-sm text-muted">Try a different category or destination.</Text>
        </Surface>
      )}
      <Surface className="mt-3 bg-[#EDE6D9]">
        <Text className="font-display text-2xl text-forest">A route that’s yours</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">Don’t see the right fit? Share your dates, interests and pace with the team.</Text>
        <ActionButton title="Ask for a custom tour" onPress={() => openLink('mailto:info@eternal-india.com?subject=Custom%20tour%20enquiry')} compact icon="arrow" />
      </Surface>
    </PageFrame>
  );
}
