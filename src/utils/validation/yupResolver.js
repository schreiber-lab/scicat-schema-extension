export const yupResolver = (validationSchema) => async (data) => {
    try {
      await validationSchema.validate(data, {
        abortEarly: false
      });
  
      return {
        values: data,
        errors: {}
      };
    } catch (errors) {
      return {
        values: {},
        errors: errors?.inner?.reduce(
          (allErrors, currentError) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? "validation",
              message: currentError.message
            }
          }),
          {}
        )
      };
    }
  };
  