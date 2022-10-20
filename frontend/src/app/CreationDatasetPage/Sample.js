import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import * as samplesApi from "../../api/samples";
import { SampleForm, validationSchema, defaultValues } from "../CreationSamplePage/SampleForm";

export const Sample = ({ formRef, onCreate }) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    samplesApi.createSample(data).then(onCreate);
  };

  return (
    <form noValidate ref={formRef} onSubmit={preventDefault(form.handleSubmit(handleSubmit))}>
      <FormProvider {...form}>
        <SampleForm />
      </FormProvider>
    </form>
  );
};
