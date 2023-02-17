import { useFormik } from "formik";
import { Form } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";
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
