import type { Locale } from "@/components/siteNavigation";
import type { Meta, Pair, Qa, Step } from "@/content/types";
import { weddingPrices } from "@/lib/pricing";

type Package = {
  id: keyof typeof weddingPrices;
  title: string;
  fit: string;
  result: string;
};

type Extra = {
  title: string;
  text: string;
  /** Цена из pricing.ts или null — «по запросу». */
  price: number | null;
};

export type WeddingsContent = {
  meta: Meta;
  hero: { title: string; lead: string; facts: Pair[] };
  packages: { title: string; lead: string; items: Package[]; priceOnRequest: string };
  extras: { title: string; items: Extra[] };
  process: { title: string; items: Step[] };
  form: {
    title: string;
    text: string;
    submit: string;
    consentBefore: string;
    consentLink: string;
    optional: string;
    required: string;
    fields: {
      date: { label: string; placeholder: string };
      city: { label: string; placeholder: string };
      format: { label: string; placeholder: string; options: string[] };
      guests: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
    };
  };
  faq: { title: string; items: Qa[] };
};

export const weddingsContent: Record<Locale, WeddingsContent> = {
  ru: {
    meta: {
      title: "Свадебная видеосъёмка в Санкт-Петербурге и Москве | Highway Films",
      description:
        "Свадебные фильмы и тизеры. Три пакета: от 60 000, 95 000 и 140 000 ₽. Тизер через несколько дней, фильм через 3–4 недели.",
    },
    hero: {
      title: "Свадебные фильмы",
      lead: "Снимаем день как он идёт. Подсказываем только там, где это нужно свету и портретам.",
      facts: [
        { label: "Тизер", value: "через несколько дней" },
        { label: "Фильм", value: "через 3–4 недели" },
      ],
    },
    packages: {
      title: "Пакеты",
      lead: "Цена зависит от длины дня и числа локаций. Точную сумму назовём после короткого разговора о вашем плане.",
      priceOnRequest: "по запросу",
      items: [
        {
          id: "episode",
          title: "Эпизод",
          fit: "Роспись, камерная церемония или короткий день.",
          result: "Тизер и короткий фильм.",
        },
        {
          id: "film",
          title: "Фильм",
          fit: "Полный день: сборы, церемония, прогулка, вечер.",
          result: "Тизер, фильм и полные записи главных моментов: клятв, речей, первого танца.",
        },
        {
          id: "saga",
          title: "Сага",
          fit: "Несколько локаций и насыщенная программа.",
          result: "Расширенный фильм, тизер, полные записи и вертикальные версии.",
        },
      ],
    },
    extras: {
      title: "Можно добавить",
      items: [
        {
          title: "Мобильная съёмка",
          text: "Вертикальные ролики на телефон, чтобы выложить в соцсети в тот же день.",
          price: weddingPrices.mobile,
        },
        {
          title: "Монтаж в день свадьбы",
          text: "Короткий фильм к вечеру, чтобы показать гостям на банкете.",
          price: null,
        },
      ],
    },
    process: {
      title: "Как всё проходит",
      items: [
        { title: "Созвон и дата", text: "Узнаём план дня, площадку и формат, бронируем дату." },
        {
          title: "План по часам",
          text: "За одну-две недели до свадьбы проходим тайминг: где лучше свет, когда портреты, что нельзя пропустить.",
        },
        {
          title: "Съёмка",
          text: "Работаем тихо, не выстраиваем гостей и не останавливаем программу.",
        },
        { title: "Тизер", text: "Короткий ролик для соцсетей.", time: "через несколько дней" },
        { title: "Фильм", text: "Фильм и все файлы по пакету.", time: "через 3–4 недели" },
      ],
    },
    form: {
      title: "Расскажите о вашем дне",
      text: "Дата, город и примерный план. Ответим в течение дня и скажем, свободна ли дата.",
      submit: "Отправить заявку",
      consentBefore: "Даю согласие на обработку данных по ",
      consentLink: "политике конфиденциальности",
      optional: "необязательно",
      required: "обязательно",
      fields: {
        date: { label: "Дата свадьбы", placeholder: "14 августа 2027" },
        city: { label: "Город и площадка", placeholder: "Петербург, загородный отель" },
        format: {
          label: "Формат",
          placeholder: "Выберите формат",
          options: ["Роспись или камерная свадьба", "Полный свадебный день", "Большой банкет", "Нужна помощь с выбором"],
        },
        guests: { label: "Сколько гостей", placeholder: "Около 40" },
        message: { label: "Что важно снять", placeholder: "Сборы, церемония, речи близких, первый танец" },
        phone: { label: "Телефон или Telegram", placeholder: "+7 999 123-45-67 или @username" },
        name: { label: "Как к вам обращаться", placeholder: "Имя" },
        email: { label: "Почта", placeholder: "you@example.com" },
      },
    },
    faq: {
      title: "Вопросы о свадьбах",
      items: [
        {
          q: "Когда будет готово видео?",
          a: "Тизер — через несколько дней после свадьбы, фильм — через 3–4 недели. Точную дату называем заранее.",
        },
        {
          q: "Будет много постановки?",
          a: "Нет. Подсказываем только там, где это помогает свету и портретам. Остальное время день идёт своим ходом.",
        },
        {
          q: "Вы выезжаете за пределы Петербурга и Москвы?",
          a: "Да, по всей России. Дорогу и проживание считаем отдельной строкой.",
        },
        {
          q: "Когда бронировать дату?",
          a: "Как только она у вас появилась. Летние субботы разбирают первыми.",
        },
        {
          q: "Что если в день свадьбы плохая погода?",
          a: "Заранее продумываем запасные места для прогулки и портретов. Дождь не отменяет съёмку, если к нему готовы.",
        },
        {
          q: "Можно добавить вертикальные ролики?",
          a: "Да. Они входят в пакет «Сага», к остальным пакетам их можно добавить.",
        },
      ],
    },
  },
  en: {
    meta: {
      title: "Wedding videography in Saint Petersburg and Moscow | Highway Films",
      description:
        "Wedding films and teasers. Three packages from RUB 60,000, 95,000 and 140,000. A teaser in a few days, the film in 3–4 weeks.",
    },
    hero: {
      title: "Wedding films",
      lead: "We film the day as it happens and only step in where light and portraits need it.",
      facts: [
        { label: "Teaser", value: "in a few days" },
        { label: "Film", value: "in 3–4 weeks" },
      ],
    },
    packages: {
      title: "Packages",
      lead: "The price depends on how long the day is and how many locations there are. We name the exact sum after a short call about your plan.",
      priceOnRequest: "on request",
      items: [
        { id: "episode", title: "Episode", fit: "A registry ceremony, an intimate wedding or a short day.", result: "Teaser and a short film." },
        {
          id: "film",
          title: "Film",
          fit: "A full day: getting ready, ceremony, walk, evening.",
          result: "Teaser, film and full recordings of the key moments: vows, speeches, first dance.",
        },
        {
          id: "saga",
          title: "Saga",
          fit: "Several locations and a busy programme.",
          result: "Extended film, teaser, full recordings and vertical versions.",
        },
      ],
    },
    extras: {
      title: "Add-ons",
      items: [
        {
          title: "Phone-first shoot",
          text: "Vertical videos shot on a phone, ready to post on the same day.",
          price: weddingPrices.mobile,
        },
        { title: "Same-day edit", text: "A short film by the evening to show your guests at the reception.", price: null },
      ],
    },
    process: {
      title: "How it goes",
      items: [
        { title: "Call and date", text: "We learn the plan, venue and format, then book the date." },
        {
          title: "Hour-by-hour plan",
          text: "One or two weeks before the wedding we go through the timing: where the light is best, when to do portraits, what not to miss.",
        },
        { title: "Shoot", text: "We work quietly, don't line up guests and don't stop the programme." },
        { title: "Teaser", text: "A short video for social media.", time: "in a few days" },
        { title: "Film", text: "The film and every file in your package.", time: "in 3–4 weeks" },
      ],
    },
    form: {
      title: "Tell us about your day",
      text: "Date, city and a rough plan. We reply within a day and tell you if the date is free.",
      submit: "Send request",
      consentBefore: "I agree to data processing under the ",
      consentLink: "privacy policy",
      optional: "optional",
      required: "required",
      fields: {
        date: { label: "Wedding date", placeholder: "14 August 2027" },
        city: { label: "City and venue", placeholder: "Saint Petersburg, country hotel" },
        format: {
          label: "Format",
          placeholder: "Choose a format",
          options: ["Registry or intimate wedding", "Full wedding day", "Large reception", "Need help choosing"],
        },
        guests: { label: "Number of guests", placeholder: "About 40" },
        message: { label: "What matters to film", placeholder: "Getting ready, ceremony, speeches, first dance" },
        phone: { label: "Phone or Telegram", placeholder: "+7 999 123-45-67 or @username" },
        name: { label: "Your name", placeholder: "Name" },
        email: { label: "Email", placeholder: "you@example.com" },
      },
    },
    faq: {
      title: "About weddings",
      items: [
        { q: "When will the video be ready?", a: "The teaser comes a few days after the wedding, the film in 3–4 weeks. We name the exact date in advance." },
        {
          q: "Will there be a lot of staging?",
          a: "No. We step in only where it helps light and portraits. The rest of the day runs its own course.",
        },
        { q: "Do you travel outside Saint Petersburg and Moscow?", a: "Yes, across Russia. Travel and accommodation are a separate line." },
        { q: "When should we book?", a: "As soon as you have a date. Summer Saturdays go first." },
        {
          q: "What if the weather is bad?",
          a: "We plan backup spots for the walk and portraits in advance. Rain doesn't cancel the shoot if you're ready for it.",
        },
        { q: "Can we add vertical videos?", a: "Yes. They come with the Saga package and can be added to the others." },
      ],
    },
  },
};
