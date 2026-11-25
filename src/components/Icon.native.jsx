import { SymbolView } from 'expo-symbols';

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
