import useTranslation from "@/src/application/lang/client/useTranslation";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { BookOpenCheck, CheckCircle, PenSquare } from "lucide-react";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

interface StepProps {
    icon: ReactNode;
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}

function Step({ icon, title, isActive, onClick }: StepProps) {
    return (
        <div
            className={`w-72 lg:w-auto transition-opacity py-3 px-4 gap-4 flex justify-between items-center rounded-lg bg-primary text-primary-foreground font-light ${
                !isActive ? "opacity-60" : "cursor-pointer"
            } `}
            onClick={onClick}
        >
            <div>{icon}</div>
            <div>{title}</div>
        </div>
    );
}

interface Props {
    activeStep?: number;
    onStepClick?: (step: 1 | 2 | 3) => void;
}

export default function FormSteps({ activeStep = 1, onStepClick }: Props) {
    const lang = useSelector(appSelectLanguage);

    const step1Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.stepsCards.step1",
    });
    const step2Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.stepsCards.step2",
    });
    const step3Translation = useTranslation({
        lang,
        name: "features.authorizations.newAuthorizationForm.stepsCards.step3",
    });

    function handleStepClick(step: 1 | 2 | 3) {
        onStepClick?.(step);
    }

    return (
        <div className="flex justify-center items-center gap-4 lg:gap-8 flex-col lg:flex-row">
            <Step
                icon={<PenSquare width={32} height={32} />}
                title={step1Translation}
                isActive={activeStep >= 1}
                onClick={() => handleStepClick(1)}
            />
            <Step
                icon={<BookOpenCheck width={32} height={32} />}
                title={step2Translation}
                isActive={activeStep >= 2}
                onClick={() => handleStepClick(2)}
            />
            <Step
                icon={<CheckCircle width={32} height={32} />}
                title={step3Translation}
                isActive={activeStep >= 3}
                onClick={() => handleStepClick(3)}
            />
        </div>
    );
}
