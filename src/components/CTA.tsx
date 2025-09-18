export default function CTA(){
  return (
    <section className="container py-12">
      <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium">Готовы обсудить проект</h3>
          <p className="mt-1 text-muted">Отправьте задачу — подготовим коммерческое предложение.</p>
        </div>
        <a href="/contacts" className="btn btn-primary">Получить КП</a>
      </div>
    </section>
  );
}
