import { useFormik } from "formik";
export default function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {},
  });
}
