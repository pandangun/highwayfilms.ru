import Link from "next/link";
import { requireStudio } from "@/cabinet/auth";
import CabinetBar from "@/components/cabinet/CabinetBar";
import NewProjectForm from "@/components/cabinet/NewProjectForm";

export const metadata = { title: "Новый проект" };

export default async function NewProjectPage() {
  await requireStudio();
  return (
    <>
      <CabinetBar kind="studio" />
      <div className="wrap cab-main max-w-[760px]">
        <Link href="/studio" className="link-line text-small">
          К проектам
        </Link>
        <h1 className="display display--h2 mt-6">Новый проект</h1>
        <NewProjectForm />
      </div>
    </>
  );
}
