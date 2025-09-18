export default function Footer() {
  return (
    <footer className="mt-16 border-t border-base">
      <div className="container py-10 text-sm text-muted flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Highway Films</div>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-fgc">Политика конфиденциальности</a>
          <a href="/contacts" className="hover:text-fgc">Контакты</a>
        </div>
      </div>
    </footer>
  );
}
