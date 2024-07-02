"use client";

import { useCreateSuperId } from "@/src/api/hooks/superId/create-super-id";
import AppRouter from "@/src/application/routing/app-router";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { TypographyP } from "@/src/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
    pin: z
        .string()
        .min(4, {
            message: "PIN must be at 4 numbers long.",
        })
        .max(4, {
            message: "PIN must be at 4 numbers long.",
        }),
    studentId: z.string(),
    identityCardId: z.string(),
});

export default function CreateSuperIdForm() {
    const lang = useSelector(appSelectLanguage);

    const { mutate, isLoading } = useCreateSuperId();
    const { push } = useRouter();

    const appRouter = new AppRouter(lang);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pin: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        mutate(
            { ...data, validTo: new Date().getTime() },
            {
                onSuccess: () => {
                    push(appRouter.superId("list"));
                },
            }
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PIN</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={"Wpisz 4 cyfrowy kod"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numer legitymacji studenckiej</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={
                                        "Numer legitymacji studenckiej"
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
                    name="identityCardId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numer dokumentu tozsamosci</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={
                                        "Wpisz numer dokumentu tozsamosci"
                                    }
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
                    Zapisz
                </Button>
            </form>
        </Form>
    );
}
