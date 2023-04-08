import { useFormik } from "formik";
//import { FormGroup, Label, Input, Form } from "reactstrap";
import { Form, Label, Input, FormGroup } from "reactstrap";
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export default function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validate,
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="with a placeholder"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="password placeholder"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Your First Name"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Your Last Name"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
      </FormGroup>
    </Form>
  );
}
