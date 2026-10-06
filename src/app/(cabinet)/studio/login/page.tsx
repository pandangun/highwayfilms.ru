import { redirect } from "next/navigation";
import { isStudio } from "@/cabinet/auth";
import { StudioLogin } from "@/components/cabinet/small";

export const metadata = { title: "Вход студии" };

export default async function StudioLoginPage() {
  if (await isStudio()) redirect("/studio");
  return (
    <div className="wrap cab-main grid min-h-[80svh] place-items-center">
      <div className="w-full max-w-[24rem]">
        <p className="cab-bar__brand">
          Highway Films <span>студия</span>
        </p>
        <h1 className="display display--h3 mt-6 mb-8">Вход в кабинет студии</h1>
        <StudioLogin />
      </div>
    </div>
  );
}
