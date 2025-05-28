import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/ui/kit/button";
import { useLoginUser } from "../model/use-login-user";

const LoginDtoSchema = z.object({
  email: z
    .string({ required_error: "Email обязателен" })
    .email("Неверный email"),
  password: z
    .string({ required_error: "Пароль обязателен" })
    .min(6, "Пароль должен содержать не менее 6 символов"),
});

export function LoginForm() {
  const form = useForm({ resolver: zodResolver(LoginDtoSchema), defaultValues: { email: "", password: "" } });
  const { handleSubmit, isPending } = useLoginUser();

  const onSubmit = form.handleSubmit((data) => handleSubmit(data));

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@gmail.com" {...field} />
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
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={isPending}
        >
          Вход
        </Button>
      </form>
    </Form>
  );
}
