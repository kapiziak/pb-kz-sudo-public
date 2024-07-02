"use client";

import { useGetMyProfile } from "@/src/api/hooks/profile/get-my-profile";
import { useGetSuperId } from "@/src/api/hooks/superId/get-super-id";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import AlertApiError from "@/src/common/AlertApiError";
import { useSelector } from "react-redux";
import CardWithAdditionalAuthForms from "../CardWithAdditionalAuthForms";
import InfoCardWithAction from "../InfoCardWithAction";
import SuperIdQrCodeCard from "../SuperIdQrCodeCard";
import NoSuperIdFound from "./NoSuperIdFound/NoSuperIdFound";

export default function SuperIdMainPanel() {
    const lang = useSelector(appSelectLanguage);
    const { data, isLoading } = useGetSuperId();
    const { data: profileData } = useGetMyProfile();

    const avatarHeadingTranslation = useTranslation({
        lang,
        name: "features.superId.avatarCard.heading",
    });

    const avatarSubheadingTranslation = useTranslation({
        lang,
        name: "features.superId.avatarCard.subheading",
    });

    // TODO: Skeleton
    if (isLoading) return null;

    if (!data || data?.error?.data?.code === "GET_SUPER_ID_NOT_FOUND")
        return <NoSuperIdFound />;

    if (data?.error) return <AlertApiError error={data.error.data} />;

    return (
        <div>
            <div
                className={
                    "flex flex-col xl:flex-row justify-center items-stretch gap-8"
                }
            >
                <div className="w-full xl:w-[300px]">
                    <SuperIdQrCodeCard
                        secret={data.data.data.superId.secret}
                        validTo={data?.data.data.superId.validTo}
                    />
                </div>
                <div className="w-full xl:w-[300px]">
                    <InfoCardWithAction
                        infoHeadingText={avatarHeadingTranslation}
                        infoDateText={avatarSubheadingTranslation}
                        mediaType="image"
                        mediaSrc={
                            profileData?.data?.data?.profile?.avatarUrl ??
                            "/assets/img/av_1.png"
                        }
                        mediaAlt="Avatar"
                        mediaDimensions={{
                            width: 300,
                            height: 300,
                        }}
                    />
                </div>
                <div className="flex">
                    <CardWithAdditionalAuthForms />
                </div>
            </div>
            <div></div>
        </div>
    );
}
