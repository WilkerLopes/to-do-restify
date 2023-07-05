import Yup from "yup";

export const todoCreateSchema = Yup.object().shape(
  {
    title: Yup.string().max(100).min(3).required().trim(),
    completed: Yup.boolean(),
  },
  { strict: true }
);

export const todoUpdateSchema = Yup.object().shape(
  {
    title: Yup.string().max(100).min(3).trim(),
    completed: Yup.boolean(),
  },
  { strict: true }
);
