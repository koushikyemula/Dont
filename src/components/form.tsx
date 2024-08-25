"use client";

import { CACHE_END, CACHE_URL } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronsRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

const formSchema = z.object({
  value: z
    .string()
    .min(2, {
      message: "URL must be at least 2 characters.",
    })
    .regex(/^https:\/\/medium\.com\//, {
      message: "URL must be a medium article.",
    }),
});

type UrlType = z.infer<typeof formSchema>;

export const FormComponent = () => {
  const router = useRouter();

  const onSubmit = useCallback(
    (value: UrlType) => {
      const redirectValue = CACHE_URL + value + CACHE_END;
      router.push(`${redirectValue}`);
    },
    [router]
  );

  const form = useForm<UrlType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center h-full w-full max-w-4xl gap-4 px-6 md:px-14 lg:px-0">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Dont. do it..." className="h-14" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="h-14 text-lg" size="lg">
          Go <ChevronsRight className="w-6 h-6 ml-[2px]" />
        </Button>
      </form>
    </Form>
  );
};
