import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Sign_In } from "../../Fn_Auth/Login";
import { Create_Account } from "../../Fn_Auth/Register";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidateRegister } from "@/src/app/(Auth)/validate";


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
                    return await Sign_In(dataForm);
                case "REGISTER":
                    return await Create_Account(dataForm);
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