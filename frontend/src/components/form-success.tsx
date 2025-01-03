import { cn } from "@/lib/utils";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: string;
}

const FormSuccess = ({
    message
}:FormSuccessProps) => {
    if (!message) return null;
    return (
        <div 
            className={cn(
                "text-sm",
                "rounded-md items-center gap-x-2 flex flex-row",
                "bg-emerald-500/15 text-emerald-500",
                "p-2"
            )}
        >
            <CheckCircledIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
}

export default FormSuccess;