import { publicRqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { useSession } from "@/shared/model/session";
import { toast } from "sonner";

export function useLoginUser() {
  const { login } = useSession();
  const loginUserMutation = publicRqClient.useMutation("post", "/auth/login", {
    onSuccess(data) {
      login(data.accessToken);
    },
  });

  const handleSubmit = (data: ApiSchemas["LoginRequest"]) => {
    loginUserMutation.mutate({ body: data });
  };

  if (loginUserMutation.error?.message) {
    if (toast.getToasts().length < 1) {
      toast.error(loginUserMutation.error?.message);
    }
  }

  return {
    handleSubmit,
    isPending: loginUserMutation.isPending,
  };
}
