'use client'

import { Mutation_AttributeCatalog } from "../Tanstack_Query/Attribute_catalog/Query_attribute_catalog"
import { useForm } from 'react-hook-form';

export default function useFormAttributeCatalog(mode: 'CREATE_or_REMOVE_NAME_VARRIANT' | 'CREATE_VALUE') {
    const form_attributeCatalog = useForm();
    const { mutate, ...rest } = Mutation_AttributeCatalog(mode);
    const onSubmit = (dataForm: any) => {
        mutate(dataForm);
    }
    return { form_attributeCatalog, onSubmit, ...rest }
}
