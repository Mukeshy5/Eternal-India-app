import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.mjs';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.mjs';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import Briefcase from 'lucide-react/dist/esm/icons/briefcase.mjs';
import CalendarDays from 'lucide-react/dist/esm/icons/calendar-days.mjs';
import Check from 'lucide-react/dist/esm/icons/check.mjs';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.mjs';
import Clock from 'lucide-react/dist/esm/icons/clock.mjs';
import Compass from 'lucide-react/dist/esm/icons/compass.mjs';
import CreditCard from 'lucide-react/dist/esm/icons/credit-card.mjs';
import Globe from 'lucide-react/dist/esm/icons/globe.mjs';
import Home from 'lucide-react/dist/esm/icons/home.mjs';
import Mail from 'lucide-react/dist/esm/icons/mail.mjs';
import MapPin from 'lucide-react/dist/esm/icons/map-pin.mjs';
import Menu from 'lucide-react/dist/esm/icons/menu.mjs';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle.mjs';
import MessagesSquare from 'lucide-react/dist/esm/icons/messages-square.mjs';
import Phone from 'lucide-react/dist/esm/icons/phone.mjs';
import Search from 'lucide-react/dist/esm/icons/search.mjs';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.mjs';
import X from 'lucide-react/dist/esm/icons/x.mjs';

const ICONS = {
  home: Home,
  explore: Compass,
  tours: Briefcase,
  contact: MessagesSquare,
  menu: Menu,
  search: Search,
  arrow: ArrowRight,
  chevron: ChevronRight,
  back: ArrowLeft,
  calendar: CalendarDays,
  pin: MapPin,
  clock: Clock,
  chat: MessageCircle,
  phone: Phone,
  mail: Mail,
  globe: Globe,
  check: Check,
  star: Sparkles,
  close: X,
  card: CreditCard,
  arrowUp: ArrowUpRight,
};

export function Icon({ name, size = 19, color = '#19382F', style }) {
  const IconComponent = ICONS[name] ?? Sparkles;
  return <IconComponent size={size} color={color} strokeWidth={2} style={style} />;
}
