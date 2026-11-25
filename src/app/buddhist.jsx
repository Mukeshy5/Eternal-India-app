import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, DestinationCard, PageFrame, PageIntro, SectionHeading, Surface, TourCard } from '../components/ui';
import { ASSETS, DESTINATION_DETAILS, TOURS } from '../data/travel';

const BUDDHIST_PLACES = ['bodh-gaya', 'sarnath', 'rajgir', 'nalanda', 'kushinagar', 'lumbini'];

const BUDDHA_STORY = [
  {
    title: "Siddhartha Gautama's early life",
    paragraphs: [
      'Buddhism is a world religion based on the teachings of Siddhartha Gautama, known as the Buddha, or “the Awakened One.” Details of his life were preserved in Buddhist traditions, and accounts differ between early sources.',
      'According to tradition, Siddhartha was born into the Shakya clan, commonly described as a Kshatriya community, whose capital was Kapilavastu. His father, Suddhodana, was the clan’s leader, and his mother was Queen Maya. She gave birth to him at Lumbini, beneath a sal tree. He was named Siddhartha, traditionally understood as “one who achieves his aim.” The seer Asita is said to have foretold that the child would become either a great ruler or a spiritual teacher.',
      'Traditional accounts say Siddhartha married his cousin Yasodhara at about 16 and they had a son, Rahula. He spent about 29 years in the royal household, but came to feel that material comfort and wealth could not answer life’s deeper questions.',
    ],
  },
  {
    title: 'The four sights & the search for a way through suffering',
    paragraphs: [
      'At about 29, Siddhartha is said to have travelled beyond the palace and encountered an old person, someone who was ill, a dead body and a wandering ascetic. These sights brought home the realities of ageing, illness and death and inspired him to seek a way to understand suffering.',
      'He left his princely life to become a mendicant and travelled to Rajagaha in Magadha, where King Bimbisara is said to have offered him a place at court. Siddhartha declined, promising to return if his search brought the understanding he sought.',
    ],
  },
  {
    title: 'Teachers, austerity & the Middle Way',
    paragraphs: [
      'Siddhartha studied meditation with the teachers Alara Kalama and Uddaka Ramaputta. After mastering Alara Kalama’s teachings, he was invited to lead that community, but continued his search. With five companions led by Kaundinya, he then practised severe austerities and restricted his food, seeking liberation through self-denial.',
      'After nearly starving, Siddhartha recalled a peaceful meditative state from his childhood, when he had watched his father begin the seasonal ploughing. He realised that a focused meditative state could bring clarity, while neither self-indulgence nor self-mortification offered the path he sought. This understanding became the Middle Way: a path of moderation between the two extremes.',
    ],
  },
  {
    title: 'Awakening beneath the Bodhi tree',
    paragraphs: [
      'At Bodh Gaya, Siddhartha meditated beneath a tree later known as the Bodhi tree, vowing not to rise until he had found the truth. His five companions had left, believing he had abandoned the search. Buddhist tradition says that after a prolonged meditation he attained awakening and became the Buddha, also known as Shakyamuni, the Awakened One of the Shakya clan.',
      'Buddhist teachings describe his awakening as insight into suffering, its causes, its ending and the path leading to its ending—the Four Noble Truths. Nirvana is liberation from ignorance, greed, hatred and other afflictive states, and the peace associated with that freedom.',
    ],
  },
  {
    title: 'The first teaching & the beginning of the Sangha',
    paragraphs: [
      'After awakening, the Buddha met the merchants Tapussa and Bhallika, remembered as among his first lay followers. He then travelled to the Deer Park at Sarnath, near Varanasi, and delivered his first sermon to his five former companions. This teaching is remembered as setting in motion the Wheel of Dharma. Together, the Buddha and the five formed the first Sangha, the community of Buddhist monastics.',
      'As the teaching community grew, Yasa and his friends joined. Traditional accounts say that the first group of disciples became arahants and that the Sangha grew to around 60 members. The Kassapa brothers later joined with their followers, further expanding the community.',
    ],
  },
  {
    title: 'Teaching across the Gangetic plain',
    paragraphs: [
      'For the rest of his life, the Buddha is said to have travelled and taught across the Gangetic plain, in areas now in Uttar Pradesh and Bihar. Buddhist stories remember his encounters with people from many walks of life, including Angulimala and Alavaka. The teachings welcomed people across social ranks and did not establish a caste structure.',
      'The Sangha travelled for much of the year, pausing during the rainy-season retreat, known as Vassana. The first retreat is associated with Varanasi; later, the Buddha spent several seasons at Veluvana, the Bamboo Grove monastery in Rajagaha.',
      'In Rajagaha, Sariputta and Maudgalyayana became two of the Buddha’s foremost disciples after hearing a teaching from Assaji, one of the first five disciples. Other close disciples included Mahakasyapa, Ananda and Anuruddha.',
    ],
  },
  {
    title: 'Return to Kapilavastu & the monastic community',
    paragraphs: [
      'After hearing of his son’s awakening, King Suddhodana sent messengers to invite him home. Buddhist accounts say that the first nine delegations joined the Sangha; the tenth, led by Siddhartha’s childhood friend Kaludayi, delivered the invitation. The Buddha later returned to Kapilavastu on foot, teaching along the way.',
      'Several members of the royal family are remembered as joining the community, including Siddhartha’s son Rahula, who was still a child, his cousin Anuruddha and his half-brother Nanda. Traditional lists of foremost disciples also name Sariputta, Maudgalyayana, Mahakasyapa, Ananda, Upali, Subhuti, Mahakaccana, Punna and Rahula.',
      'His foster mother Mahapajapati, supported by Ananda, is central to accounts of the founding of the order of nuns. Buddhist tradition says the Buddha eventually agreed to ordain women, recognising their capacity for awakening, while prescribing additional monastic rules for nuns.',
    ],
  },
  {
    title: 'Patronage & Buddhism’s wider reach',
    paragraphs: [
      'The Buddha’s teachings attracted support from rulers and householders. King Bimbisara of Magadha is remembered as an early royal patron who supported the monastic community and helped establish places, including viharas, where it could stay and practise.',
      'Centuries later, the Mauryan emperor Ashoka became a major patron of Buddhism. Following the Kalinga war, he supported the tradition and sponsored missions beyond his empire. Buddhist communities and teachings subsequently spread across Asia, taking root in many cultures.',
    ],
  },
  {
    title: 'Teachings preserved & Parinirvana',
    paragraphs: [
      'The Buddha did not appoint a personal successor, encouraging his followers to practise and seek liberation for themselves. His teachings were transmitted orally, and Buddhist councils were later held to recite, preserve and discuss the teachings and monastic discipline.',
      'Buddhist tradition places the Buddha’s Parinirvana at Kusinara, identified with modern Kushinagar in Uttar Pradesh. Today, pilgrimage routes connect places associated with his birth, awakening, first teaching and final passing, alongside sites shaped by the communities that followed.',
    ],
  },
];

const ITINERARY = [
  {
    title: 'Arrive in Delhi',
    paragraphs: ['Upon arrival, transfer to your hotel.'],
    overnight: 'Delhi',
  },
  {
    title: 'Delhi – Varanasi by flight',
    paragraphs: [
      'After breakfast, enjoy a half-day tour of Delhi. Visit Raj Ghat, the memorial to Mahatma Gandhi, designed with a simplicity that reflects his life.',
      'Drive past the Red Fort, the 17th-century Mughal fort and palace in the historic walled city of Shahjahanabad. See India Gate, designed by Sir Edwin Lutyens and built in 1931 to commemorate soldiers who died in the First World War and the Third Anglo-Afghan War.',
      'See the President’s House and Parliament House from outside, and visit Qutab Minar. After lunch at a restaurant, transfer to the airport for your flight to Varanasi.',
      'On arrival, transfer to your hotel.',
    ],
    overnight: 'Varanasi',
  },
  {
    title: 'Varanasi – Bodhgaya (240 km / approx. 6 hours)',
    paragraphs: [
      'Begin early with a boat ride on the holy River Ganga. After breakfast, visit Bharat Mata Temple, built in 1936 at the Kashi Vidyapeeth campus and inaugurated by Mahatma Gandhi. The temple houses a marble relief map of undivided India.',
      'Continue to Banaras Hindu University (BHU), one of Asia’s largest residential universities, and Durga Mandir in Ramnagar.',
      'Take an excursion to Sarnath, about 10 km from Varanasi. This ancient pilgrimage city is known for its ghats, temples and long history. After lunch at the hotel, drive to Bodhgaya and transfer to your hotel on arrival.',
    ],
    overnight: 'Bodhgaya',
  },
  {
    title: 'Bodhgaya – Nalanda – Rajgir',
    paragraphs: [
      'After breakfast, visit Bodhgaya’s Mahabodhi Temple, which stands near the Bodhi Tree where Buddhist tradition says Gautama Buddha attained enlightenment. The temple rises approximately 170 feet.',
      'Visit the Mahabodhi Tree, revered as the place of the Buddha’s awakening and a setting for meditation.',
      'Drive to Rajgir and visit the historic city, once the capital of Magadha and an important centre in the 6th century BCE. Continue to Nalanda, the site of the renowned ancient residential university where, according to historical accounts, thousands of teachers and students gathered from across the Buddhist world.',
      'Return to Rajgir in the evening.',
    ],
    overnight: 'Rajgir',
  },
  {
    title: 'Rajgir – Vaishali – Kushinagar',
    paragraphs: [
      'After breakfast, drive to Kushinagar, visiting Vaishali en route. See the Ashokan Pillar, a single-piece red sandstone column approximately 18.3 metres high, topped by a lion.',
      'Visit Fort Vishal, associated with the ancient republic of Vaishali, and the museum, which houses antiquities discovered at sites in the area.',
      'Continue to Kushinagar.',
    ],
    overnight: 'Kushinagar',
  },
  {
    title: 'Kushinagar – Sravasti (230 km / approx. 6 hours)',
    paragraphs: [
      'After breakfast, visit Kushinagar’s Nirvana Stupa and temple. The brick stupa was excavated by Carlleyle in 1867. The site is important to Buddhist pilgrims, and the temple is home to a large reclining Buddha statue.',
      'Visit the Mahaparinirvana Temple and its more-than-six-metre-long reclining Buddha image, carved from Chunar sandstone and discovered during excavations in 1876.',
      'Continue to Sravasti.',
    ],
    overnight: 'Sravasti',
  },
  {
    title: 'Sravasti – Lucknow (170 km / approx. 5 hours)',
    paragraphs: [
      'After breakfast, visit Sravasti. See the Ananda Bodhi Tree, associated with the Buddha’s meditation, and Jetavana, the monastery and park where Buddhist tradition remembers the Buddha and his followers staying. The site includes remains and sculptures associated with the ancient monastery.',
      'Visit Shobhanath Temple, revered by Jain pilgrims as the birthplace of Sambhavnath.',
      'Continue to Lucknow.',
    ],
    overnight: 'Lucknow',
  },
  {
    title: 'Lucknow – Sankisa – Agra (approx. 200 km / 5 hours)',
    paragraphs: [
      'After breakfast, drive towards Agra and visit Sankisa en route. Sankisa is associated with Buddhist traditions about the Buddha’s return from heaven and is a quiet pilgrimage destination.',
      'After your visit, continue to Agra.',
    ],
    overnight: 'Agra',
  },
  {
    title: 'Agra – Delhi',
    paragraphs: [
      'After breakfast, enjoy sightseeing in Agra, visiting the Taj Mahal and Agra Fort. Built by Emperor Shah Jahan between 1631 and 1648, the Taj Mahal is a celebrated marble monument commissioned in memory of his wife Mumtaz Mahal.',
      'Explore Agra Fort, whose towers, ramparts and gateways reflect the power of the Mughal Empire. Construction began under Emperor Akbar and was continued by his grandson Shah Jahan.',
      'Drive to Delhi.',
    ],
    overnight: 'Delhi',
  },
  {
    title: 'Departure by flight',
    paragraphs: ['After breakfast, transfer to the airport for your onward flight.'],
  },
];

export default function BuddhistScreen() {
  const [openStoryIndex, setOpenStoryIndex] = useState(null);
  const [openDayIndex, setOpenDayIndex] = useState(null);
  const tour = TOURS.find((item) => item.slug === 'buddhist-circuit');
  return (
    <PageFrame>
      <View className="overflow-hidden rounded-[28px] bg-forest">
        <Image source={ASSETS.buddha} contentFit="cover" transition={220} style={{ width: '100%', height: 265 }} />
        <View className="absolute inset-0 bg-[#102A23]/45" />
        <View className="absolute inset-x-0 bottom-0 p-5">
          <Text className="text-[11px] font-bold uppercase tracking-[2px] text-white/80">A route through Buddhist heritage</Text>
          <Text className="mt-2 font-display text-[32px] leading-9 text-white">A quieter kind of journey</Text>
          <Text className="mt-2 text-sm leading-5 text-white/80">Bodh Gaya · Sarnath · Rajgir · Nalanda · Kushinagar</Text>
        </View>
      </View>

      <PageIntro eyebrow="Buddhist tours" title="Walk the Buddhist Circuit" description="Follow the Buddha’s story through the Gangetic plain, from the place of enlightenment to sites of teaching and pilgrimage." compact />
      {tour ? <TourCard tour={tour} /> : null}

      <SectionHeading title="The story of the Buddha" subtitle="Follow the journey from Siddhartha Gautama’s early life to the communities and teachings that helped Buddhism travel across India and beyond. Tap a chapter to read more." />
      <View className="mb-2 flex-row flex-wrap gap-2">
        {['Lumbini', 'Bodh Gaya', 'Sarnath', 'Kushinagar'].map((place, index) => (
          <Text key={place} className="rounded-full bg-[#EDE6D9] px-3 py-2 text-xs font-bold text-forest">
            {String(index + 1).padStart(2, '0')} · {place}
          </Text>
        ))}
      </View>
      {BUDDHA_STORY.map((section, index) => (
        <Surface key={section.title} className="mb-3">
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: openStoryIndex === index }}
            onPress={() => setOpenStoryIndex(openStoryIndex === index ? null : index)}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-rose">{String(index + 1).padStart(2, '0')}</Text>
              <Text className="flex-1 font-display text-[20px] leading-7 text-forest">{section.title}</Text>
              <Text className="text-sm font-bold text-rose">{openStoryIndex === index ? '−' : '+'}</Text>
            </View>
          </Pressable>
          {openStoryIndex === index ? section.paragraphs.map((paragraph) => (
            <Text key={paragraph} className="mt-3 text-sm leading-6 text-muted">{paragraph}</Text>
          )) : null}
        </Surface>
      ))}

      <SectionHeading title="Delhi, Varanasi & the Buddhist circuit" subtitle="A 10-day pilgrimage route through Delhi, Varanasi, Bodhgaya, Nalanda, Rajgir, Vaishali, Kushinagar, Sravasti, Sankisa and Agra. Tap a day to see its schedule." />
      <Text className="mb-4 text-sm leading-6 text-muted">Travel times and visits can be adjusted to suit your dates and confirmed arrangements.</Text>
      {ITINERARY.map((day, index) => (
        <Surface key={day.title} className="mb-3">
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: openDayIndex === index }}
            onPress={() => setOpenDayIndex(openDayIndex === index ? null : index)}
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-rose">Day {String(index + 1).padStart(2, '0')}</Text>
              <Text className="flex-1 font-display text-[20px] leading-7 text-forest">{day.title}</Text>
              <Text className="text-sm font-bold text-rose">{openDayIndex === index ? '−' : '+'}</Text>
            </View>
          </Pressable>
          {openDayIndex === index ? (
            <>
              {day.paragraphs.map((paragraph) => (
                <Text key={paragraph} className="mt-3 text-sm leading-6 text-muted">{paragraph}</Text>
              ))}
              {day.overnight ? (
                <Text className="mt-4 border-t border-line pt-3 text-xs font-semibold text-forest">
                  Overnight stay in {day.overnight}
                </Text>
              ) : null}
            </>
          ) : null}
        </Surface>
      ))}

      <SectionHeading title="Six sacred stops" subtitle="Open a place for its own guide and travel notes." />
      {BUDDHIST_PLACES.map((slug) => <DestinationCard key={slug} destination={DESTINATION_DETAILS[slug]} />)}

      <Surface className="mt-2 bg-[#EDE6D9]">
        <Text className="font-display text-[22px] text-forest">Add Lumbini in Nepal</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">The published 10-day route stays in India. Lumbini is available as a cross-border extension, with extra time and travel documents planned separately.</Text>
        <Link href="/destination/lumbini" asChild>
          <Pressable className="mt-4 self-start rounded-full bg-white px-4 py-3"><Text className="text-sm font-bold text-forest">Explore Lumbini</Text></Pressable>
        </Link>
      </Surface>

      <SectionHeading title="Plan a pilgrimage" subtitle="Share your dates and the places you hope to visit." />
      <View className="mb-5"><ActionButton title="Plan a Buddhist journey" href="/plan-trip?destination=Buddhist%20Circuit" icon="arrow" /></View>
    </PageFrame>
  );
}
