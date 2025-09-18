const items = [
  {
    title: "Рекламные ролики",
    desc: "Product/brand films, performance для соцсетей, имиджевые кампании.",
    href: "/commercials",
  },
  {
    title: "Корпоративное видео",
    desc: "Фильмы о компании, презентации для выставок, HR и отчётные видео.",
    href: "/corporate",
  },
  {
    title: "Музыкальные клипы",
    desc: "Кинематографичные клипы с идеей, постановкой и постпродакшном.",
    href: "/music-videos",
  },
  {
    title: "Видеопродакшн",
    desc: "Полный цикл: креатив, препродакшн, съёмка, постпродакшн.",
    href: "/videoproduction",
  },
];

export default function ServiceCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((it) => (
        <a
          key={it.title}
          href={it.href}
          className="card p-5 hover:border-strong transition-colors"
        >
          <h3 className="text-lg font-medium">{it.title}</h3>
          <p className="mt-2 text-muted">{it.desc}</p>
        </a>
      ))}
    </div>
  );
}
