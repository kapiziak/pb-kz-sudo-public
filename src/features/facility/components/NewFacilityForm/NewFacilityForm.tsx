"use client";

import { useAddFacility } from "@/src/api/hooks/facilities/add-new-facility";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useToast } from "@/src/components/ui/use-toast";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function NewFacilityForm() {
    const [name, setName] = useState<string>("");

    const lang = useSelector(appSelectLanguage);

    const { toast } = useToast();
    const { mutate } = useAddFacility();

    const translationNameInputPlaceholder = useTranslation({
        lang,
        name: "features.facilities.newFacilityForm.nameInput.placeholder",
    });

    const translationNameTooShort = useTranslation({
        lang,
        name: "features.facilities.newFacilityForm.messages.nameTooShort",
    });

    const translationErrorMsg = useTranslation({
        lang,
        name: "features.facilities.newFacilityForm.messages.createError",
    });

    const translationSuccessMsg = useTranslation({
        lang,
        name: "features.facilities.newFacilityForm.messages.createSuccess",
    });

    function handleSubmit() {
        if (name.length < 1) {
            toast({
                variant: "destructive",
                title: translationNameTooShort,
            });
            return;
        }

        mutate(
            { name },
            {
                onSuccess: (data) => {
                    if (data.error) {
                        toast({
                            variant: "destructive",
                            title: translationErrorMsg,
                        });
                        return;
                    }
                    toast({
                        variant: "default",
                        title: translationSuccessMsg,
                    });
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: translationErrorMsg,
                    });
                },
            }
        );

        setName("");
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    <Translation name="features.facilities.newFacilityForm.title" />
                </CardTitle>
                <CardDescription>
                    <Translation name="features.facilities.newFacilityForm.description" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">
                                <Translation name="features.facilities.newFacilityForm.nameInput.title" />
                            </Label>
                            <Input
                                id="name"
                                placeholder={translationNameInputPlaceholder}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleSubmit}>
                    <Translation name="features.facilities.newFacilityForm.submitBtn" />
                </Button>
            </CardFooter>
        </Card>
    );
}
