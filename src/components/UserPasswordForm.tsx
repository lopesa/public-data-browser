import * as Form from "@radix-ui/react-form";
import styles from "styles/UserPasswordForm.module.scss";
import { useLazyLoginUserQuery } from "services/apiSlice";
import { useState } from "react";

interface UserPasswordFormProps {
  onSuccess: () => void;
}

const UserPasswordForm = ({ onSuccess }: UserPasswordFormProps) => {
  const [
    loginUser,
    { data: userData, error: loginError, isLoading: loginIsLoading },
  ] = useLazyLoginUserQuery();
  const [serverErrors, setServerErrors] = useState({
    email: false,
    password: false,
  });
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitType = (event.nativeEvent as SubmitEvent).submitter?.dataset
      .submitType;
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as {
      email: string;
      password: string;
    };
    const method = submitType === "login" ? loginUser : loginUser;
    const result = await method(formData)
      .unwrap()
      .catch((error) => {
        // @TODO: setServerErrors, after getting a better response back from the server
      });
    if (result?.token) {
      onSuccess();
    }
  };
  return (
    <Form.Root className={styles.FormRoot} onSubmit={onSubmit}>
      {loginIsLoading && <div>Loading...</div>}
      {loginError && <div>Error: </div>}
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
        <button
          data-submit-type="login"
          className={styles.Button}
          style={{ marginTop: 10 }}
        >
          Login
        </button>
      </Form.Submit>
      <div style={{ width: "100%", textAlign: "center" }}>- or -</div>
      <Form.Submit asChild>
        <button
          data-submit-type="createAccount"
          className={styles.Button}
          style={{ marginTop: 10 }}
        >
          Create Account
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default UserPasswordForm;
