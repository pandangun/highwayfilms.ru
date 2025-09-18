export default function PageTitle({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-semibold">{title}</h1>
      {lead ? <p className="mt-4 text-muted max-w-3xl">{lead}</p> : null}
    </section>
  );
}
