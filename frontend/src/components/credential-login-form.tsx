"use client";

import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage,
} from "@/components/ui/form";
// import FormSuccess from "@/components/form-success";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import FormError from "@/components/form-error";


const CredentialLoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema)
    });

    const [ errorMessage, setErrorMessage ] = useState<string | undefined>("");
    const [ successMessage, setSuccessMessage ] = useState<string | undefined>("");

    const [ isPending, startTransition ] = useTransition();

    const onSubmit = (values: z.infer<typeof LoginSchema>) => { 
        setErrorMessage("");
        setSuccessMessage("");
        console.log("values ||||||| ", values);

        startTransition(() => {
            login(values)
            .then((data) => {
                // setSuccessMessage(data.success);
                if (data !== undefined){
                    setErrorMessage(data.error as string | undefined);
                }
            })

        });
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            type="text"
                                            placeholder="john.doe"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            type="password"
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={errorMessage} />
                        {/* <FormSuccess message={successMessage} /> */}
                        <Button 
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            Login
                        </Button>
                    </div>
                </form>
                
            </Form>
        </>
    );
}

export default CredentialLoginForm;