import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidateRegister } from "@/src/app/(Auth)/validate";
import { create_Account, sign_In } from "../../Services/Services_Auth/Authen";


type Actions = "LOGIN" | "REGISTER";

export function Mutation_Auth({ action }: { action: Actions }) {
    let check_validate_register : any;
    if (action === 'REGISTER') {
        check_validate_register = yupResolver(schemaValidateRegister)
    }
    const [status_Loading, setStatus_Loading] = useState('no_call');
    const my_form = useForm({
        resolver: yupResolver(schemaValidateRegister)
    });
    const querry_Client = useQueryClient();

    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataForm: any) => {
            setStatus_Loading('pending_call')
            switch (action) {
                case "LOGIN":
                    return await sign_In(dataForm);
                case "REGISTER":
                    return await create_Account(dataForm);
                default: return
            }
        }, onSuccess: (res: any) => {
            querry_Client.invalidateQueries({
                queryKey: ['Auth_Key']
            });
            if (res.status === 201 || res.status === 200) {
                setStatus_Loading('call_ok');
            }
            else {
                setStatus_Loading('call_error');
            }
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        mutate(data)
    }
    return { status_Loading, my_form, onSubmit, ...rest };
}