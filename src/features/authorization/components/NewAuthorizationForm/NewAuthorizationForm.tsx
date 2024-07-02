"use client";

import { useAddAuthorization } from "@/src/api/hooks/authorizations/add-new-authorization";
import useTranslation from "@/src/application/lang/client/useTranslation";
import AppRouter from "@/src/application/routing/app-router";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { DatePickerWithRange } from "@/src/common/DateRangePicker/DateRangePicker";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import {
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyP,
} from "@/src/components/ui/typography";
import { useToast } from "@/src/components/ui/use-toast";
import SelectFacilities from "@/src/features/facility/components/SelectFacilities/SelectFacilities";
import SelectUsers from "@/src/features/user/components/SelectUsers/SelectUsers";
import { current } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { isError } from "react-query";
import { useSelector } from "react-redux";
import FormSteps from "./FormSteps";
import useStage1 from "./Stages/useStage1";
import useStage2 from "./Stages/useStage2";
import useStage3 from "./Stages/useState3";

interface Props {
    haveSteps?: boolean;
}

export default function NewAuthorizationForm({ haveSteps }: Props) {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

    const { toast } = useToast();
    const { push } = useRouter();

    const lang = useSelector(appSelectLanguage);
    const appRouter = useMemo(() => new AppRouter(lang), [lang]);

    const {
        mutate: addAuthorization,
        data,
        isIdle,
        isLoading,
        isSuccess,
    } = useAddAuthorization();

    const [Stage1, dataStage1] = useStage1();
    const [Stage2] = useStage2({
        dates: dataStage1.dates,
        selectedFacilities: dataStage1.selectedFacilities || [],
        selectedUsers: dataStage1.selectedUsers || [],
    });
    const [Stage3] = useStage3(
        isIdle || isLoading
            ? {
                  status: "pending",
              }
            : isSuccess &&
              data.data?.status === "success" &&
              data?.data?.data.authorization?.id
            ? {
                  status: "success",
                  newAuthorizationId: data.data.data.authorization.id,
              }
            : data?.data?.status === "error"
            ? {
                  status: "error",
                  error: JSON.stringify(data.data.data),
              }
            : {
                  status: "error",
                  error: "#1000",
              }
    );

    const step1Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.steps.step1",
    });
    const step2Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.steps.step2",
    });
    const step3Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.steps.step3",
    });
    const nextButtonCaption1Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.nextButton.step1",
    });
    const nextButtonCaption2Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.nextButton.step2",
    });
    const nextButtonCaption3Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.nextButton.step3",
    });
    const toastSuccessTranslation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.toast.success",
    });
    const toastErrorTranslation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.toast.error",
    });

    const translations = useMemo(
        () => ({
            step1: step1Translation,
            step2: step2Translation,
            step3: step3Translation,
            nextButtonCaption1: nextButtonCaption1Translation,
            nextButtonCaption2: nextButtonCaption2Translation,
            nextButtonCaption3: nextButtonCaption3Translation,
            toastSuccess: toastSuccessTranslation,
            toastError: toastErrorTranslation,
        }),
        [
            step1Translation,
            step2Translation,
            step3Translation,
            nextButtonCaption1Translation,
            nextButtonCaption2Translation,
            nextButtonCaption3Translation,
            toastSuccessTranslation,
            toastErrorTranslation,
        ]
    );

    const handleAddAuthorization = useCallback(() => {
        if (
            !dataStage1.selectedUsers ||
            !dataStage1.selectedFacilities ||
            !dataStage1.dates?.to
        )
            return;

        addAuthorization(
            {
                assignedUsers: dataStage1.selectedUsers || [],
                scopeFacility: dataStage1.selectedFacilities || [],
                expireAt: dataStage1.dates.to.getTime().toString(),
            },
            {
                onSuccess: (data) => {
                    if (data.error || data.data.status === "error") {
                        toast({
                            variant: "destructive",
                            title: translations.toastError.replace(
                                "{0}",
                                JSON.stringify(data)
                            ),
                        });
                        return;
                    }
                    toast({
                        variant: "default",
                        title: translations.toastSuccess.replace(
                            "{0}",
                            `${data.data.data.authorization?.id}`
                        ),
                    });
                },
            }
        );
    }, [dataStage1, addAuthorization, toast, translations]);

    const renderCurrentStage = useCallback(() => {
        switch (currentStep) {
            case 1:
                return Stage1;
            case 2:
                return Stage2;
            case 3:
                return Stage3;
        }
    }, [Stage1, currentStep, Stage2, Stage3]);

    const handleClickNextBtn = useCallback(() => {
        switch (currentStep) {
            case 1:
                console.log("[NewAuthorizationForm] dataStage1", dataStage1);
                // TODO: Validation
                setCurrentStep(2);
                break;
            case 2:
                setCurrentStep(3);
                handleAddAuthorization();
                break;
            case 3:
                push(appRouter.authorizations("list"));
                break;
        }
    }, [currentStep, dataStage1, handleAddAuthorization, appRouter, push]);

    function handleStepClick(step: 1 | 2 | 3) {
        if (step > currentStep) return;
        setCurrentStep(step);
    }

    const headerTitle = useMemo(() => {
        switch (currentStep) {
            case 1:
                return translations.step1;
            case 2:
                return translations.step2;
            case 3:
                return translations.step3;
        }
    }, [currentStep, translations]);

    const nextButtonCaption = useMemo(() => {
        switch (currentStep) {
            case 1:
                return translations.nextButtonCaption1;
            case 2:
                return translations.nextButtonCaption2;
            case 3:
                return translations.nextButtonCaption3;
        }
    }, [currentStep, translations]);

    return (
        <div>
            {haveSteps ? (
                <div className="py-4 lg:py-14">
                    <FormSteps
                        activeStep={currentStep}
                        onStepClick={handleStepClick}
                    />
                </div>
            ) : null}
            <div className="flex justify-center">
                <div className="min-w-[400px] flex flex-col gap-4">
                    <TypographyH3>{headerTitle}</TypographyH3>
                    {renderCurrentStage()}
                    <div className="mt-4">
                        <Button className="w-full" onClick={handleClickNextBtn}>
                            {nextButtonCaption}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
