"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/types/form-schemas";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import useApi from "@/hooks/useApi";
import { fetcher } from "@/lib/fetcher";
import { IUser } from "@/types/interfaces";
import { AxiosError } from "axios";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/useUserStore";

const Login = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const api = useApi();
  const router = useRouter();
  const setToken = useUserStore((state) => state.setToken);
  const hasTokenAlready = useUserStore((state) => state.hasToken);

  const loginUser = api.mutation<
    IUser,
    AxiosError,
    z.infer<typeof loginSchema>
  >({
    mutationKey: ["login"],
    mutationFn: (data: z.infer<typeof loginSchema>) =>
      fetcher({ method: "Post", url: "/auth/login", data: data }),
    onSuccess: (data: { token: string }) => {
      setToken(data.token);
      router.push("/");
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onLogin(data: z.infer<typeof loginSchema>) {
    loginUser.mutate(data);
  }

  if (loginUser.isLoading || loginUser.isSuccess)
    return (
      <div className=" h-screen flex justify-center items-center">
        <CircularProgress size="lg" label="Loading..." />
      </div>
    );

  if (hasTokenAlready()) return router.push("/");

  return (
    <Form {...form}>
      <div className="flex justify-center">
        <form
          onSubmit={form.handleSubmit(onLogin)}
          className=" flex flex-col justify-center  h-screen w-screen max-w-sm mx-auto space-y-4  "
        >
          <div className="flex justify-center mb-5">
            <Image src="/Vector.png" alt="logo" width={250} height={250} />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    label="Email"
                    size="sm"
                    variant="bordered"
                    validationState={
                      form.formState.errors.email ? "invalid" : "valid"
                    }
                    errorMessage={form.formState.errors.email?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    label="password"
                    size="sm"
                    variant="bordered"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <Eye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    validationState={
                      form.formState.errors.password ? "invalid" : "valid"
                    }
                    errorMessage={form.formState.errors.password?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <p className=" text-red-500 font-bold  text-lg flex justify-center">
            {typeof loginUser.error?.response?.data === "string"
              ? loginUser.error?.response?.data
              : ""}
          </p>

          <Button className=" bg-blue-500 text-white" type="submit">
            Login
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default Login;
