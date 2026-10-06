import Link from "next/link";
import { eq } from "drizzle-orm";
import { requireClientAccess } from "@/cabinet/auth";
import { getDb } from "@/cabinet/db";
import { questionnaires } from "@/cabinet/db/schema";
import { kindOf } from "@/cabinet/kinds";
import { EMPTY_QUESTIONNAIRE, normalizeQuestionnaire } from "@/cabinet/project";
import CabinetBar from "@/components/cabinet/CabinetBar";
import QuestionnaireForm from "@/components/cabinet/QuestionnaireForm";

export const metadata = { title: "Анкета" };

export default async function QuestionnairePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const { project, link } = await requireClientAccess(code);
  const db = await getDb();
  const [row] = await db.select().from(questionnaires).where(eq(questionnaires.projectId, project.id));
  const spec = kindOf(project.kind).questionnaire;

  return (
    <>
      <CabinetBar kind="client" />
      <div className="wrap cab-main">
        <Link href={`/cabinet/${project.code}`} className="link-line text-small">
          К проекту
        </Link>
        <h1 className="display display--h2 mt-6">{spec.title}</h1>
        <p className="lead mt-4 max-w-[38em]">{spec.lead}</p>
        <div className="mt-12">
          <QuestionnaireForm
            code={project.code}
            spec={spec}
            initial={row ? normalizeQuestionnaire(row.data) : EMPTY_QUESTIONNAIRE}
            updatedAt={row?.updatedAt.toISOString() ?? null}
            readOnly={!link}
          />
        </div>
      </div>
    </>
  );
}
