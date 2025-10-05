interface CTAProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  href?: string;
}

export default function CTA({
  title = "Готовы обсудить проект",
  description = "Отправьте задачу — подготовим коммерческое предложение.",
  ctaLabel = "Получить КП",
  href = "/contacts",
}: CTAProps) {
  return (
    <section className="container py-12">
      <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="mt-1 text-muted">{description}</p>
        </div>
        <a href={href} className="btn btn-primary">{ctaLabel}</a>
      </div>
    </section>
  );
}
