import * as Form from "@radix-ui/react-form";
import styles from "styles/UserPasswordForm.module.scss";
import { useLoginUserMutation } from "services/apiSlice";
import { useState } from "react";

const UserPasswordForm = () => {
  const [loginUser, { data, error: loginError }] = useLoginUserMutation();
  const [serverErrors, setServerErrors] = useState({
    email: false,
    password: false,
  });
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as {
      email: string;
      password: string;
    };
    debugger;
    loginUser(formData);
    debugger;
  };
  return (
    <Form.Root className={styles.FormRoot} onSubmit={onSubmit}>
      <Form.Field
        className={styles.FormField}
        name="email"
        serverInvalid={serverErrors.email}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Email</Form.Label>
          <Form.Message className={styles.FormMessage} match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className={styles.FormMessage} match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={styles.Input} type="email" required />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.FormField} name="password">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className={styles.FormLabel}>Password</Form.Label>
          <Form.Message className={styles.FormMessage} match="valueMissing">
            Please enter your password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className={styles.Input} type="password" required />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className={styles.Button} style={{ marginTop: 10 }}>
          Login
        </button>
      </Form.Submit>
      <Form.Submit asChild>
        <button className={styles.Button} style={{ marginTop: 10 }}>
          Create Account
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default UserPasswordForm;
