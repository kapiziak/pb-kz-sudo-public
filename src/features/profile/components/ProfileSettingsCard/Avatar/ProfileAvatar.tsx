import { useUploadProfileAvatar } from "@/src/api/hooks/profile/upload-avatar";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/src/components/ui/avatar";
import { useToast } from "@/src/components/ui/use-toast";
import { ChangeEvent, useRef } from "react";

interface Props {
    avatarUrl?: string;
}

export default function ProfileSettingsAvatar({ avatarUrl }: Props) {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const { mutate, isLoading } = useUploadProfileAvatar();
    const { toast } = useToast();

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        mutate(
            {
                file,
            },
            {
                onSuccess: (data) => {
                    toast({
                        description: JSON.stringify(data),
                    });
                },
            }
        );
    }

    function handleClick() {
        inputFileRef.current?.click();
    }

    return isLoading ? (
        <>Loading....</>
    ) : (
        <Avatar className="h-16 w-16" onClick={handleClick}>
            <AvatarImage alt="User Avatar" src={avatarUrl} />
            <AvatarFallback>UP</AvatarFallback>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-white text-center">Hover to Change</span>
            </div>
            <input
                ref={inputFileRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
        </Avatar>
    );
}
