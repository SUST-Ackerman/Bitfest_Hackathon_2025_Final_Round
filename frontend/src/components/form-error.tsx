import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
}

const FormError = ({
    message
}:FormErrorProps) => {
    if (!message) return null;
    
    return (
        <div 
            className={cn(
                "text-sm",
                "rounded-md items-center gap-x-2 flex flex-row",
                "bg-destructive/15 text-destructive",
                "p-2"
            )}
        >
            <ExclamationTriangleIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
}

export default FormError;