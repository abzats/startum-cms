import { PriceItem, ScheduleItem } from './firebase.service';

export const defaultSchedule: ScheduleItem[] = [
  { time: '9:30-10:15', ru: 'Подготовка к школе \nРусский язык 2 класс \nРисование' },
  { ru: 'Мамина школа \nЧтение 2 класс \nРисование \nШахматы \nМатематика 3-4 класс', time: '10:25-11:10' },
  { ru: 'Русский язык 0 класс \nРусский язык 1 класс \nРисование \nШахматы \nМатематика 5-6 класс', time: '11:20-12:05' },
  { ru: 'Кукольный театр \nРусский язык 5-6 класс \nГрафический дизайн \nШахматы \nМатематика 5-6 класс', time: '12:25-13:05' },
  { ru: 'Русский язык \nЛитература 5-6 класс', time: '13:15-14:00' },
] as any;

export const defaultPrices: PriceItem[] = [
  {
    main: '80',
    ru: {
      description: '1 урок',
      extension: 'кронн',
    },
    en: {
      description: '1 lessons',
      extension: 'dkk',
    },
    da: {
      description: '1 time',
      extension: 'dkk',
    },
  },
  {
    main: '25',
    ru: {
      description: 'скидка на 2 урок',
      extension: '%',
    },
    en: {
      description: '2nd lesson discount',
      extension: '%',
    },
    da: {
      description: 'rabat på 2. time',
      extension: '%',
    },
  },
  {
    main: '50',
    ru: {
      description: 'скидка на 3 урок',
      extension: '%',
    },
    en: {
      description: '3rd lesson discount',
      extension: '%',
    },
    da: {
      description: 'rabat på 3. time',
      extension: '%',
    },
  },
  {
    main: '4',
    ru: {
      description: 'урок \nбесплатно',
      extension: '',
    },
    en: {
      description: 'lesson \nis free',
      extension: '',
    },
    da: {
      description: 'time \ngratis',
      extension: '',
    },
  },
] as any;
