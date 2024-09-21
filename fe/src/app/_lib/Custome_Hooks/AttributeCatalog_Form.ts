'use client'

import { Mutation_AttributeCatalog } from "../Tanstack_Query/Attribute_catalog/Query_attribute_catalog"
import { useForm } from 'react-hook-form';

export default function useFormAttributeCatalog(mode: 'CREATE' | 'CREATE_VALUE') {
    const form_attributeCatalog = useForm();
    const { mutate, ...rest } = Mutation_AttributeCatalog(mode);

    const onSubmit = (dataForm: any) => {
        console.log(dataForm)
        // mutate(dataForm);
    }
    return { form_attributeCatalog, onSubmit, ...rest }
}
