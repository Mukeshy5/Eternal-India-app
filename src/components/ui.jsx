import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { forwardRef } from 'react';

import { ASSETS, CONTACT } from '../data/travel';
import { openLink } from '../utils/links';

const ICON_NAMES = {
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  explore: { ios: 'safari.fill', android: 'explore', web: 'explore' },
  tours: { ios: 'suitcase.rolling.fill', android: 'luggage', web: 'luggage' },
  contact: { ios: 'bubble.left.and.bubble.right.fill', android: 'support_agent', web: 'support_agent' },
  profile: { ios: 'person.crop.circle', android: 'person', web: 'person' },
  menu: { ios: 'line.3.horizontal', android: 'menu', web: 'menu' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  chevron: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  back: { ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  pin: { ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  chat: { ios: 'message.fill', android: 'chat', web: 'chat' },
  phone: { ios: 'phone.fill', android: 'call', web: 'call' },
  mail: { ios: 'envelope.fill', android: 'mail', web: 'mail' },
  globe: { ios: 'globe', android: 'language', web: 'language' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  star: { ios: 'sparkle', android: 'auto_awesome', web: 'auto_awesome' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  card: { ios: 'creditcard.fill', android: 'credit_card', web: 'credit_card' },
  arrowUp: { ios: 'arrow.up.right', android: 'north_east', web: 'north_east' },
};

export function Icon({ name, size = 19, color = '#19382F', style }) {
  return <SymbolView name={ICON_NAMES[name] ?? ICON_NAMES.star} size={size} tintColor={color} style={style} />;
}

export function AppHeader() {
  const router = useRouter();
  return (
    <View className="h-[70px] flex-row items-center justify-between border-b border-line bg-paper px-5">
      <Link href="/" asChild>
        <Pressable accessibilityRole="link" accessibilityLabel="Eternal India home" className="h-[54px] justify-center">
          <Image source={ASSETS.logo} contentFit="contain" style={{ width: 162, height: 50 }} />
        </Pressable>
      </Link>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open all sections"
        onPress={() => router.push('/menu')}
        className="h-11 w-11 items-center justify-center rounded-full border border-line bg-white"
      >
        <Icon name="menu" size={21} />
      </Pressable>
    </View>
  );
}

export function PageFrame({ children, tabbed = false, scroll = true, contentClassName = '' }) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-paper">
      <View className="flex-1">
        <AppHeader />
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {scroll ? (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: tabbed ? 132 : 104 }}
            >
              <View className={`mx-auto w-full max-w-[620px] px-5 pb-4 pt-6 ${contentClassName}`}>{children}</View>
            </ScrollView>
          ) : (
            <View className={`mx-auto flex-1 w-full max-w-[620px] px-5 pb-[104px] pt-6 ${contentClassName}`}>{children}</View>
          )}
        </KeyboardAvoidingView>
        <FloatingSupport bottom={tabbed ? Math.max(96, insets.bottom + 88) : Math.max(18, insets.bottom + 14)} />
      </View>
    </SafeAreaView>
  );
}

export function FloatingSupport({ bottom = 18 }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Chat with Eternal India on WhatsApp"
      onPress={() => openLink(CONTACT.whatsapp)}
      className="absolute right-5 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] p-0 shadow-lg"
      style={{ bottom, elevation: 5 }}
    >
      <Icon name="chat" size={24} color="#FFFFFF" />
    </Pressable>
  );
}

export function PageIntro({ eyebrow, title, description, compact = false }) {
  return (
    <View className={`${compact ? 'mb-5' : 'mb-7'} mt-2`}>
      {!!eyebrow && <Text className="mb-2 text-[11px] font-bold uppercase tracking-[2.2px] text-rose">{eyebrow}</Text>}
      <Text className="font-display text-[34px] leading-[40px] text-forest">{title}</Text>
      {!!description && <Text className="mt-3 max-w-[540px] text-[15px] leading-6 text-muted">{description}</Text>}
    </View>
  );
}

export function SectionHeading({ title, subtitle, href, linkLabel = 'View all' }) {
  return (
    <View className="mb-4 mt-8 flex-row items-end justify-between gap-3">
      <View className="flex-1">
        <Text className="font-display text-[25px] leading-8 text-forest">{title}</Text>
        {!!subtitle && <Text className="mt-1 text-sm leading-5 text-muted">{subtitle}</Text>}
      </View>
      {href ? (
        <Link href={href} asChild>
          <Pressable accessibilityRole="link" className="mb-1 flex-row items-center gap-1">
            <Text className="text-xs font-bold text-rose">{linkLabel}</Text>
            <Icon name="chevron" size={14} color="#C33982" />
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
}

export function ActionButton({ title, href, onPress, variant = 'primary', icon, compact = false, disabled = false, loading = false }) {
  const isDisabled = disabled || loading;
  const classes = variant === 'outline'
    ? 'border border-forest bg-transparent'
    : variant === 'light'
      ? 'bg-white'
      : variant === 'glass'
        ? 'border border-white/55 bg-white/10'
      : 'bg-forest';
  const textClass = variant === 'outline' || variant === 'light' ? 'text-forest' : 'text-white';
  const child = (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      className={`min-h-[48px] flex-row items-center justify-center gap-2 rounded-full px-5 ${compact ? 'min-h-[42px] px-4' : ''} ${classes} ${isDisabled ? 'opacity-50' : ''}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.82 : isDisabled ? 0.5 : 1 })}
    >
      <Text className={`text-sm font-bold ${textClass}`}>{title}</Text>
      {loading ? <ActivityIndicator size="small" color={textClass === 'text-white' ? '#FFFFFF' : '#19382F'} /> : icon ? <Icon name={icon} size={16} color={textClass === 'text-white' ? '#FFFFFF' : '#19382F'} /> : null}
    </Pressable>
  );
  return href ? <Link href={href} asChild>{child}</Link> : child;
}

export function Pill({ children, tone = 'default' }) {
  const toneClass = tone === 'rose' ? 'bg-[#F9E9F1] text-rose' : tone === 'green' ? 'bg-[#E8EFEA] text-forest' : 'bg-[#F0EBE1] text-muted';
  return <Text className={`self-start rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[1.1px] ${toneClass}`}>{children}</Text>;
}

export function TourCard({ tour, horizontal = false }) {
  return (
    <Link href={`/tour/${tour.slug}`} asChild>
      <Pressable className={`overflow-hidden rounded-[24px] border border-line bg-white ${horizontal ? 'w-[280px] mr-3' : 'mb-4'}`}>
        <Image
          source={tour.image}
          contentFit="cover"
          transition={180}
          style={{ height: horizontal ? 158 : 190, width: '100%' }}
        />
        <View className="p-4">
          <View className="mb-2 flex-row items-center justify-between gap-2">
            <Pill tone={tour.category === 'Buddhist' || tour.category === 'Pilgrimage' ? 'rose' : 'green'}>{tour.category}</Pill>
            <Text className="text-xs font-semibold text-muted">{tour.duration}</Text>
          </View>
          <Text className="font-display text-[21px] leading-7 text-forest">{tour.name}</Text>
          <Text className="mt-1 text-xs font-medium text-muted" numberOfLines={1}>{tour.route}</Text>
          {!horizontal ? <Text className="mt-3 text-sm leading-5 text-muted" numberOfLines={2}>{tour.summary}</Text> : null}
          <View className="mt-4 flex-row items-center justify-between border-t border-line pt-3">
            <Text className="text-xs font-bold text-rose">Explore itinerary</Text>
            <Icon name="arrow" size={16} color="#C33982" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function DestinationCard({ destination, horizontal = false }) {
  return (
    <Link href={`/destination/${destination.slug}`} asChild>
      <Pressable className={`overflow-hidden rounded-[22px] border border-line bg-white ${horizontal ? 'w-[200px] mr-3' : 'mb-3 flex-row'}`}>
        <Image
          source={destination.image}
          contentFit="cover"
          transition={160}
          style={horizontal ? { width: '100%', height: 132 } : { width: 104, height: 112 }}
        />
        <View className={`${horizontal ? 'p-3' : 'flex-1 justify-center p-3'}`}>
          <Text className="font-display text-[18px] leading-6 text-forest" numberOfLines={1}>{destination.name}</Text>
          <Text className="mt-1 text-xs text-muted" numberOfLines={1}>{destination.region}</Text>
          <View className="mt-3 flex-row items-center gap-1">
            <Text className="text-xs font-bold text-rose">Discover</Text>
            <Icon name="chevron" size={13} color="#C33982" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function RegionCard({ region, horizontal = false }) {
  return (
    <Link href={`/destination/${region.slug}`} asChild>
      <Pressable className={`overflow-hidden rounded-[24px] bg-forest ${horizontal ? 'w-[252px] mr-3' : 'mb-4'}`}>
        <Image source={region.image} contentFit="cover" transition={180} style={{ width: '100%', height: horizontal ? 168 : 200 }} />
        <View className="px-4 pb-4 pt-3">
          <Text className="font-display text-[21px] text-white">{region.name}</Text>
          <Text className="mt-1 text-xs leading-5 text-white/75">{region.subtitle}</Text>
          {!horizontal ? <Text className="mt-2 text-[11px] leading-5 text-white/60">{region.places}</Text> : null}
        </View>
      </Pressable>
    </Link>
  );
}

export const InputField = forwardRef(function InputField({ label, error, multiline = false, className = '', ...props }, ref) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[12px] font-bold text-forest">{label}</Text>
      <TextInput
        ref={ref}
        {...props}
        multiline={multiline}
        placeholderTextColor="#9A9A90"
        textAlignVertical={multiline ? 'top' : 'center'}
        className={`min-h-[50px] rounded-2xl border px-4 py-3 text-[15px] text-ink ${error ? 'border-rose bg-[#FFF8FB]' : 'border-line bg-white'} ${multiline ? 'min-h-[116px]' : ''} ${className}`}
      />
      {error ? <Text className="mt-1.5 text-xs text-rose">{error}</Text> : null}
    </View>
  );
});

export function InlineNotice({ tone = 'info', children }) {
  const colors = tone === 'success'
    ? 'border-[#B9D4C0] bg-[#EDF6EF] text-forest'
    : tone === 'error'
      ? 'border-[#E6BFCB] bg-[#FFF3F7] text-rose'
      : 'border-[#D9D2C4] bg-[#F5F0E7] text-forest';
  return (
    <View accessibilityRole="status" className={`mt-4 rounded-2xl border px-4 py-3 ${colors}`}>
      <Text className={`text-sm leading-5 ${tone === 'error' ? 'text-rose' : 'text-forest'}`}>{children}</Text>
    </View>
  );
}

export function Surface({ children, className = '' }) {
  return <View className={`rounded-[24px] border border-line bg-white p-5 ${className}`}>{children}</View>;
}

export function InfoRow({ icon, title, detail, href, onPress }) {
  const row = (
    <Pressable onPress={onPress} className="flex-row items-center gap-4 py-3">
      <View className="h-11 w-11 items-center justify-center rounded-full bg-[#F4EEE5]"><Icon name={icon} size={18} color="#B76F51" /></View>
      <View className="flex-1">
        <Text className="text-sm font-bold text-forest">{title}</Text>
        <Text className="mt-1 text-sm leading-5 text-muted">{detail}</Text>
      </View>
      <Icon name="chevron" size={16} color="#777B71" />
    </Pressable>
  );
  return href ? <Link href={href} asChild>{row}</Link> : row;
}

export function SearchInput({ value, onChangeText, placeholder = 'Search destinations or tours', onSubmitEditing }) {
  return (
    <View className="h-[54px] flex-row items-center rounded-full border border-line bg-white px-4">
      <Icon name="search" size={18} color="#777B71" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        placeholder={placeholder}
        placeholderTextColor="#97978E"
        className="ml-3 flex-1 py-2 text-sm text-ink"
      />
    </View>
  );
}
