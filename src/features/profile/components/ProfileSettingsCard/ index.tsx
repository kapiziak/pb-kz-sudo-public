"use client";

import { useCreateProfile } from "@/src/api/hooks/profile/create-profile";
import { useGetMyProfile } from "@/src/api/hooks/profile/get-my-profile";
import { useUpdateProfile } from "@/src/api/hooks/profile/update-profile";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileSettingsAvatar from "./Avatar/ProfileAvatar";

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    surname: z.string(),
    description: z.string(),
});

export default function ProfileSettingsCard() {
    const [isNewProfile, setIsNewProfile] = useState<boolean>(false);

    const {
        data: profileData,
        isLoading: profileIsLoading,
        isFetching,
    } = useGetMyProfile();

    const { mutate: createProfileMutate } = useCreateProfile();
    const { mutate: updateProfileMutate } = useUpdateProfile();

    const { toast } = useToast();

    const firstNamePlaceholder = useTranslation({
        name: "features.profile.profileSettings.inputs.firstName.placeholder",
    });

    const surnamePlaceholder = useTranslation({
        name: "features.profile.profileSettings.inputs.surname.placeholder",
    });

    const bioPlaceholder = useTranslation({
        name: "features.profile.profileSettings.inputs.bio.placeholder",
    });

    const toastTranslations = {
        save: useTranslation({
            name: "features.profile.profileSettings.toast.save",
        }),
        create: useTranslation({
            name: "features.profile.profileSettings.toast.create",
        }),
        saveError: useTranslation({
            name: "features.profile.profileSettings.toast.saveError",
        }),
        createError: useTranslation({
            name: "features.profile.profileSettings.toast.createError",
        }),
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (!profileData?.data?.data.profile) {
            setIsNewProfile(true);
        } else {
            setIsNewProfile(false);
        }
    }, [profileData, isFetching]);

    useEffect(() => {
        if (!profileData?.data?.data.profile) {
            form.reset();
            return;
        }

        form.reset({
            firstName: profileData?.data?.data.profile.firstName ?? "",
            surname: profileData?.data?.data.profile.surname ?? "",
            description: profileData?.data?.data.profile.description ?? "",
        });
    }, [form, profileData]);

    function onSubmit(data: z.infer<typeof formSchema>) {
        if (isNewProfile) {
            createProfileMutate(data, {
                onSuccess: (data) => {
                    if (data.error) {
                        toast({
                            variant: "destructive",
                            description: toastTranslations.createError,
                        });
                        return;
                    }

                    toast({
                        variant: "default",
                        title: toastTranslations.create,
                    });
                },
            });
        } else {
            updateProfileMutate(data, {
                onSuccess: (data) => {
                    if (data.error) {
                        toast({
                            variant: "destructive",
                            description: toastTranslations.saveError,
                        });
                        return;
                    }

                    toast({
                        variant: "default",
                        title: toastTranslations.save,
                    });
                },
            });
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <Translation name="features.profile.profileSettings.cardHeading" />
                </CardTitle>
                <CardDescription>
                    <Translation name="features.profile.profileSettings.cardDesc" />
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {profileIsLoading ? (
                    <div className="flex flex-col gap-4">
                        <Skeleton className="w-full h-24" />
                        <Skeleton className="w-full h-24" />
                        <Skeleton className="w-full h-24" />
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="group">
                                    <ProfileSettingsAvatar
                                        avatarUrl={
                                            profileData?.data?.data.profile
                                                ?.avatarUrl
                                        }
                                    />
                                </div>
                                <div className="flex space-x-2 w-full">
                                    <div className="space-y-2 flex-1">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        <Translation name="features.profile.profileSettings.inputs.firstName.label" />
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={
                                                                firstNamePlaceholder
                                                            }
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <FormField
                                            control={form.control}
                                            name="surname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        <Translation name="features.profile.profileSettings.inputs.surname.label" />
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={
                                                                surnamePlaceholder
                                                            }
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Translation name="features.profile.profileSettings.inputs.bio.label" />
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="min-h-[100px]"
                                                    placeholder={bioPlaceholder}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex">
                                <Button
                                    className="ml-auto"
                                    type="submit"
                                    disabled={false}
                                >
                                    {false ? (
                                        <RefreshCw className="animate-spin w-4 me-2" />
                                    ) : null}
                                    {isNewProfile ? (
                                        <Translation name="features.profile.profileSettings.createProfileBtn" />
                                    ) : (
                                        <Translation name="features.profile.profileSettings.saveProfileBtn" />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    );
}
