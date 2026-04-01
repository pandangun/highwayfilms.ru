import { CalendarDays, Clock3, FolderOpen } from "lucide-react";

type ArticleMetaProps = {
  category: string;
  date: string;
  readingTime: string;
};

export function ArticleMeta({ category, date, readingTime }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="meta-chip">
        <FolderOpen className="h-3.5 w-3.5" />
        {category}
      </span>
      <span className="meta-chip">
        <CalendarDays className="h-3.5 w-3.5" />
        {date}
      </span>
      <span className="meta-chip">
        <Clock3 className="h-3.5 w-3.5" />
        {readingTime}
      </span>
    </div>
  );
}
