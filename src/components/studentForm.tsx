"use client"

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "./ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

const phoneRegex = /^[6-9]\d{9}$/;

const FormSchema = z.object({
    name: z.string({
        required_error: "Name is required.",
    }),
    class: z.string({
        required_error: "Class is required",
    }),
    phone: z.string({
        required_error: "Phone number is required."
    }).regex(phoneRegex, {
        message: "Phone number is invalid"
    }),
    whatsapp: z.string({
        required_error: "Whatsapp number is required."
    }).regex(phoneRegex, {
        message: "Whatsapp number is invalid"
    }),
    date_of_joining: z.date({
        required_error: "Date of joining is required.",
    }),
})

interface StudentFormProps {
    onClose: () => void;
    handleFormSubmit: () => void;
}

export default function StudentForm({ onClose, handleFormSubmit }: StudentFormProps) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const { toast } = useToast();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        try {
            const supabase = createClient();
            const { data: userData, error } = await supabase.auth.getUser();
            if (error || !userData?.user) {
                toast({
                    title: "An error occurred",
                    description: "User not found",
                    variant: "destructive"
                })
            }
            const userId = userData?.user?.id;
            const studentData = {
                name: data.name,
                class: data.class,
                phone: data.phone,
                whatsapp: data.whatsapp,
                date: format(data.date_of_joining, "yyyy-MM-dd"),
                user_id: userId
            };
            const { error: studentError } = await supabase.from('Students').insert(studentData);
            if (studentError) {
                toast({
                    title: "Failed to add student",
                    description: studentError.message,
                    variant: "destructive"
                })
            }
            onClose();
            handleFormSubmit();
            toast({
                title: "Student added successfully",
                description: "The student has been added successfully",
            })
        } catch (error) {
            const errorMessage = (error as Error).message ?? "An unknown error occurred";
            toast({
                title: "An error occurred",
                description: errorMessage,
            })
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Name</FormLabel>
                            <Input
                                {...field}
                                placeholder="Enter student name"
                                disabled={loading}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Class</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                disabled={loading}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue 
                                        placeholder="Select a class" 
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="9">
                                        9
                                    </SelectItem>
                                    <SelectItem value="10">
                                        10
                                    </SelectItem>
                                    <SelectItem value="11">
                                        11
                                    </SelectItem>
                                    <SelectItem value="12">
                                        12
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Phone number</FormLabel>
                            <Input
                                {...field}
                                placeholder="Enter phone number"
                                disabled={loading}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Whatsapp number</FormLabel>
                            <Input
                                {...field}
                                placeholder="Enter whatsapp number"
                                disabled={loading}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date_of_joining"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of joining</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            disabled={loading}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? "Adding student..." : "Add student"}
                </Button>
            </form>
        </Form>
    )
}