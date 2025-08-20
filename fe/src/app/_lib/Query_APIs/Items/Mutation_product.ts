import {
  create_product,
  update_product_dashboard,
  hidden_or_restore_product,
} from "../../Services/Services_Items/Product";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Action = "ADD" | "EDIT" | "HIDDEN_OR_RESTORE";

export function Mutation_Items({
  action,
  onSuccess,
  onError,
}: {
  action: Action;
  onSuccess?: any;
  onError?: any;
}) {
  // create form
  // const my_Form = useForm({
  //     resolver: yupResolver(schemaValidateFormProduct)
  // });
  const my_form = useForm();

  const query_client = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    // retry: 3,
    mutationFn: async (dataClient: any) => {
      switch (action) {
        case "ADD":
          return await create_product(dataClient);
        case "EDIT":
          return await update_product_dashboard(dataClient);
        case "HIDDEN_OR_RESTORE":
          return await hidden_or_restore_product(dataClient);
        default:
          return;
      }
    },
    onSuccess: () => {
      query_client.invalidateQueries({
        queryKey: ["Product_Key"],
      });
    },
    onSettled: () => {
      query_client.invalidateQueries({
        queryKey: ["Product_Key"],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // form
  const on_Submit: SubmitHandler<any> = async (data) => {
    return await mutateAsync(data);
  };

  return {
    mutateAsync,
    my_form,
    on_Submit,
    query_client,
    onSuccess,
    onError,
    ...rest,
  };
}
