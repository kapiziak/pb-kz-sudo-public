"use client";

import { useAuthRegister } from "@/src/api/hooks/auth/register";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCw } from "lucide-react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface Props {
    children: ReactNode;
    defaultOpen?: boolean;
}

const formSchema = z.object({
    email: z.string().email(),
    role: z.enum(["VISITOR", "ADMIN", "EMPLOYEE"]),
    firstName: z.string().optional(),
    surname: z.string().optional(),
    password: z.string().optional(),
});

export default function NewUserModal({ children, defaultOpen = false }: Props) {
    const [open, setOpen] = useState<boolean>(defaultOpen);
    const [isManualPasswordChosen, setIsManualPasswordChosen] =
        useState<boolean>(false);

    const { mutate: registerMutate, isLoading } = useAuthRegister();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { toast } = useToast();

    const toastTranslations = {
        success: useTranslation({
            name: "features.user.newUserModal.toast.success",
        }),
        error: useTranslation({
            name: "features.user.newUserModal.toast.error",
        }),
    };

    const emailPlaceholder = useTranslation({
        name: "features.user.newUserModal.inputs.email.placeholder",
    });

    const passwordPlaceholder = useTranslation({
        name: "features.user.newUserModal.inputs.password.placeholder",
    });

    const firstNamePlaceholder = useTranslation({
        name: "features.user.newUserModal.inputs.firstName.label",
    });

    const surnamePlaceholder = useTranslation({
        name: "features.user.newUserModal.inputs.surname.label",
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        registerMutate(
            {
                username: data.email,
                password: data.password,
            },
            {
                onSuccess: (data) => {
                    if (data.error) {
                        toast({
                            variant: "destructive",
                            title: toastTranslations.error,
                        });
                        return;
                    }

                    toast({
                        variant: "default",
                        title: toastTranslations.success,
                    });

                    setOpen(false);
                },
                onError: (error) => {
                    toast({
                        variant: "destructive",
                        title: toastTranslations.error,
                    });
                    console.error(`[useAuthRegister] Api Error => ${error}`);
                },
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <Translation name="features.user.newUserModal.cardHeading" />
                    </DialogTitle>
                    <DialogDescription>
                        <Translation name="features.user.newUserModal.cardDesc" />
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="flex flex-col gap-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Translation name="features.user.newUserModal.inputs.email.label" />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        emailPlaceholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox
                                    id="manualPasswordCheck"
                                    onCheckedChange={() => {
                                        setIsManualPasswordChosen(
                                            !isManualPasswordChosen
                                        );
                                        form.setValue("password", "");
                                    }}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="manualPasswordCheck"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        <Translation name="features.user.newUserModal.manualCheck" />
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        {isManualPasswordChosen ? (
                                            <></>
                                        ) : (
                                            <Translation name="features.user.newUserModal.manualCheckText" />
                                        )}
                                    </p>
                                </div>
                            </div>
                            {isManualPasswordChosen ? (
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <Translation name="features.user.newUserModal.inputs.password.label" />
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={
                                                            passwordPlaceholder
                                                        }
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ) : null}
                            <div>
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Translation name="features.user.newUserModal.inputs.role.label" />
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Zaznacz role uzytkownika" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="VISITOR">
                                                            Visitor
                                                        </SelectItem>
                                                        <SelectItem value="EMPLOYEE">
                                                            Employee
                                                        </SelectItem>
                                                        <SelectItem value="ADMIN">
                                                            Admin
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-2">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Translation name="features.user.newUserModal.inputs.firstName.label" />{" "}
                                                <span className="text-slate-400">
                                                    (
                                                    <Translation name="common.inputsOptional" />
                                                    )
                                                </span>
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
                                <FormField
                                    control={form.control}
                                    name="surname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Translation name="features.user.newUserModal.inputs.surname.label" />{" "}
                                                <span className="text-slate-400">
                                                    (
                                                    <Translation name="common.inputsOptional" />
                                                    )
                                                </span>
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
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <RefreshCw className="animate-spin w-4 me-2" />
                                ) : null}
                                <Translation name="features.user.newUserModal.createBtn" />
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
