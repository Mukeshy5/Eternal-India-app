import { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { Icon } from './ui';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}

function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export default function DatePickerField({ label, value, onChange, error }) {
  const selectedDate = parseDate(value);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const initialDate = selectedDate || getToday();
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const dayCount = new Date(year, month + 1, 0).getDate();
    const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: dayCount }, (_, index) => index + 1)];
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [visibleMonth]);

  const openPicker = () => {
    const date = selectedDate || getToday();
    setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setIsOpen(true);
  };

  const moveMonth = (offset) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  const chooseDay = (day) => {
    const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    if (date < getToday()) return;
    onChange(toDateValue(date));
    setIsOpen(false);
  };

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Choose a travel date';

  return (
    <View className="mb-4">
      <Text className="mb-2 text-[12px] font-bold text-forest">{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${displayValue}`}
        accessibilityState={{ expanded: isOpen }}
        onPress={openPicker}
        className={`min-h-[50px] flex-row items-center justify-between rounded-2xl border bg-white px-4 py-3 ${error ? 'border-rose bg-[#FFF8FB]' : 'border-line'}`}
      >
        <Text className={`text-[15px] ${selectedDate ? 'text-ink' : 'text-[#9A9A90]'}`}>{displayValue}</Text>
        <Icon name="calendar" size={18} color="#B76F51" />
      </Pressable>
      {error ? <Text className="mt-1.5 text-xs text-rose">{error}</Text> : null}

      <Modal transparent visible={isOpen} animationType="fade" onRequestClose={() => setIsOpen(false)} statusBarTranslucent>
        <View className="flex-1 items-center justify-center px-5">
          <Pressable accessibilityRole="button" accessibilityLabel="Close date picker" onPress={() => setIsOpen(false)} className="absolute inset-0 bg-black/45" />
          <View className="w-full max-w-[420px] rounded-[28px] border border-line bg-paper p-5 shadow-xl">
            <View className="mb-5 flex-row items-center justify-between">
              <View>
                <Text className="text-[11px] font-bold uppercase tracking-[1.6px] text-rose">Travel dates</Text>
                <Text className="mt-1 font-display text-2xl text-forest">Choose a date</Text>
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel="Close date picker" onPress={() => setIsOpen(false)} className="h-10 w-10 items-center justify-center rounded-full bg-white">
                <Icon name="close" size={17} />
              </Pressable>
            </View>

            <View className="mb-3 flex-row items-center justify-between">
              <Pressable accessibilityRole="button" accessibilityLabel="Previous month" onPress={() => moveMonth(-1)} className="h-10 w-10 items-center justify-center rounded-full border border-line bg-white">
                <Icon name="back" size={16} />
              </Pressable>
              <Text accessibilityLiveRegion="polite" className="font-display text-lg text-forest">
                {visibleMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </Text>
              <Pressable accessibilityRole="button" accessibilityLabel="Next month" onPress={() => moveMonth(1)} className="h-10 w-10 items-center justify-center rounded-full border border-line bg-white">
                <Icon name="chevron" size={16} />
              </Pressable>
            </View>

            <View className="mb-1 flex-row">
              {WEEKDAYS.map((day, index) => (
                <View key={`${day}-${index}`} className="h-9 flex-1 items-center justify-center">
                  <Text className="text-xs font-bold text-muted">{day}</Text>
                </View>
              ))}
            </View>

            <View className="flex-row flex-wrap">
              {calendarDays.map((day, index) => {
                if (!day) return <View key={`empty-${index}`} className="h-11 w-[14.285%]" />;
                const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
                date.setHours(0, 0, 0, 0);
                const dateValue = toDateValue(date);
                const isDisabled = date < getToday();
                const isSelected = value === dateValue;
                return (
                  <View key={dateValue} className="h-11 w-[14.285%] p-0.5">
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      accessibilityState={{ disabled: isDisabled, selected: isSelected }}
                      disabled={isDisabled}
                      onPress={() => chooseDay(day)}
                      className={`flex-1 items-center justify-center rounded-full ${isSelected ? 'bg-forest' : isDisabled ? 'bg-transparent' : 'bg-white'}`}
                    >
                      <Text className={`text-sm font-semibold ${isSelected ? 'text-white' : isDisabled ? 'text-[#B9B6AF]' : 'text-forest'}`}>{day}</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>

            <Text className="mt-4 text-center text-xs text-muted">Past dates can’t be selected.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
