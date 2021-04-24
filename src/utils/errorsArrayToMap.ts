import { FieldErrors } from "../generated/graphql";
export const errorsArrayToMap = (errorsArray: FieldErrors[]) => {
  const errorMap: Record<string, string> = {};
  errorsArray.forEach((error) => {
    errorMap[error.field] = error.error;
  });
  return errorMap;
};
