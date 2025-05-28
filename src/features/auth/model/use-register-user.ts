import { publicRqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { useSession } from "@/shared/model/session";
import { toast } from "sonner";

export function useRegisterUser() {
  const { login } = useSession();

  const registerUserMutation = publicRqClient.useMutation("post", "/auth/register", {
    onSuccess(data) {
      login(data.accessToken);
    }
  });

  const handleSubmit = (data: ApiSchemas["RegisterRequest"]) => {
    registerUserMutation.mutate({ body: data });
  };

  if (registerUserMutation.error?.message) {
    if (toast.getToasts().length < 1) {
      toast.error(registerUserMutation.error?.message);
    }
  }

  return {
    handleSubmit,
    isPending: registerUserMutation.isPending,
  }
}