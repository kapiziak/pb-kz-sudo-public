"use client";

import LangDict from "@/dictionaries/dist/locale-dict-type";
import { useAuthLogin } from "@/src/api/hooks/auth/login";
import AppRouter from "@/src/application/routing/app-router";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { Button } from "@/src/components/ui/button";
import { CardContent } from "@/src/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useToast } from "@/src/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCw } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as z from "zod";

interface LoginFormProps {
    translations: LangDict["loginPage"]["form"];
}

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});

export function LoginForm({ translations }: LoginFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const lang = useSelector(appSelectLanguage);

    const appRouter = new AppRouter(lang);
    const homeUrl = appRouter.home();

    const { toast } = useToast();
    const {
        mutate: loginMutate,
        data,
        isSuccess,
        isError,
        isLoading,
    } = useAuthLogin();

    useEffect(() => {
        function processData() {
            if (!data || data?.error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Invalid username or password.",
                });
                return;
            }

            console.log("USER DATA: ", data.data.data);

            toast({
                variant: "default",
                title: "Success!",
                description: "You have successfully logged in.",
            });

            redirect(homeUrl);
        }

        if (isSuccess) processData();
    }, [homeUrl, toast, isSuccess, data]);

    useEffect(() => {
        if (!isError) return;

        toast({
            variant: "destructive",
            title: "Error",
            description: "There is an unknown error. Check your connection.",
        });
    }, [isError, toast]);

    function onSubmit(data: z.infer<typeof formSchema>) {
        loginMutate({
            username: data.username,
            password: data.password,
        });
    }

    return (
        <>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {translations.emailInput.title}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                translations.emailInput
                                                    .placeholder
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {translations.passwordInput.title}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                translations.passwordInput
                                                    .placeholder
                                            }
                                            type={"password"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <RefreshCw className="animate-spin w-4 me-2" />
                            ) : null}
                            {translations.submitBtn}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </>
    );
}
