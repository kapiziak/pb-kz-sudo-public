"use client";

import { useAuthChangePassword } from "@/src/api/hooks/auth/change-password";
import { useCurrentUserInfo } from "@/src/api/hooks/auth/me";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { Label } from "@/src/components/ui/label";
import { useToast } from "@/src/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
    .object({
        newPassword: z.string().min(6, {
            message: "Password must be at least 6 characters long",
        }),
        repeatedPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.repeatedPassword, {
        message: "Passwords doesnt not match",
        path: ["repeatedPassword"],
    });

export default function AdditionalSettings() {
    const { data: userData } = useCurrentUserInfo();

    const { mutate: changePasswordMutate } = useAuthChangePassword();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const passwordPlaceholder = useTranslation({
        name: "features.settings.additionalSettings.inputs.password.placeholder",
    });

    const repeatPasswordPlaceholder = useTranslation({
        name: "features.settings.additionalSettings.inputs.repeatPassword.placeholder",
    });

    const changePasswordToastTranslations = {
        success: useTranslation({
            name: "features.settings.additionalSettings.toasts.changePassword.ok",
        }),
        error: useTranslation({
            name: "features.settings.additionalSettings.toasts.changePassword.error",
        }),
    };

    function onSubmit(data: z.infer<typeof formSchema>) {
        changePasswordMutate(
            {
                newPassword: data.newPassword,
            },
            {
                onSuccess: (data) => {
                    if (data.error) {
                        toast({
                            variant: "destructive",
                            title: changePasswordToastTranslations.error,
                        });
                        return;
                    }

                    toast({
                        title: changePasswordToastTranslations.success,
                    });
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: changePasswordToastTranslations.error,
                    });
                },
            }
        );
    }

    return (
        <Card className="w-full mt-8">
            <CardHeader>
                <CardTitle>
                    <Translation name="features.settings.additionalSettings.cardHeading" />
                </CardTitle>
                <CardDescription>
                    <Translation name="features.settings.additionalSettings.cardDesc" />
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                <Translation name="features.settings.additionalSettings.inputs.accountEmail.label" />
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Loading..."
                                value={userData?.data?.data?.user.email ?? ""}
                                disabled
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Translation name="features.settings.additionalSettings.inputs.password.label" />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={
                                                    passwordPlaceholder
                                                }
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {form.getValues("newPassword")?.length > 0 ? (
                                <FormField
                                    control={form.control}
                                    name="repeatedPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Translation name="features.settings.additionalSettings.inputs.repeatPassword.label" />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        repeatPasswordPlaceholder
                                                    }
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : null}
                        </div>
                        <div className="space-y-2">
                            <Label>
                                <Translation name="features.settings.additionalSettings.inputs.role.label" />
                            </Label>
                            <div>
                                <span>Visitor</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="ml-auto">Save Settings</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
