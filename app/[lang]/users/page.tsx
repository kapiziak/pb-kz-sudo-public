import { getLangDictionary } from "@/src/application/lang/dictonaries";
import { locales } from "@/src/application/lang/locales";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TLangParam } from "@/src/application/types/langParam";
import { Button } from "@/src/components/ui/button";
import { TypographyH2, TypographyP } from "@/src/components/ui/typography";
import NewUserModal from "@/src/features/user/components/NewUserModal";
import UsersTable from "@/src/features/user/components/UsersTable/UsersTable";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function Users({ params: { lang } }: TLangParam) {
    const dict = await getLangDictionary(lang);

    return (
        <ApplicationLayout>
            <div>
                <TypographyH2 as={"h1"} className={"pb-0"}>
                    {dict.usersPage.title}
                </TypographyH2>
                <TypographyP>{dict.usersPage.subtitle}</TypographyP>
            </div>
            <div className={"mt-4"}>
                <NewUserModal>
                    <Button className="mb-4">
                        {dict.features.user.newUserModal.createBtn}
                    </Button>
                </NewUserModal>
                <UsersTable />
            </div>
        </ApplicationLayout>
    );
}
