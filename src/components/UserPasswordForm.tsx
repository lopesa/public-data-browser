import * as Form from "@radix-ui/react-form";
import styles from "styles/UserPasswordForm.module.scss";
import {
  useLazyLoginUserQuery,
  useCreateUserMutation,
} from "services/apiSlice";
import { useState } from "react";
import PDBButton from "./PDBButton";

interface UserPasswordFormProps {
  onSuccess: () => void;
}

const UserPasswordForm = ({ onSuccess }: UserPasswordFormProps) => {
  const [
    loginUser,
    { data: userData, error: loginError, isLoading: loginIsLoading },
  ] = useLazyLoginUserQuery();
  const [createUser, { isLoading: createIsLoading, error: createError }] =
    useCreateUserMutation();
  const [serverError, setServerError] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitType = (event.nativeEvent as SubmitEvent).submitter?.dataset
      .submitType;
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as {
      email: string;
      password: string;
    };
    const method = submitType === "login" ? loginUser : createUser;
    const result = await method(formData)
      .unwrap()
      .catch((error) => {
        setServerError(true);
        // @TODO: setServerErrors, after getting a better response back from the server
        // actually, keeping this simple for now, just showing a generic error message
      });
    if (result?.token) {
      onSuccess();
    }
  };
  return (
    <Form.Root className={styles.FormRoot} onSubmit={onSubmit}>
      {loginIsLoading && <div>Loading...</div>}
      {loginError && <div>Error: </div>}
      {createIsLoading && <div>Loading...</div>}
      {createError && <div>Error: </div>}
      <Form.Field
        className={styles.FormField}
        name="email"
        serverInvalid={serverError}
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

      {serverError && (
        <div className={styles.FormMessage}>
          Sorry, there was a problem creating your account. Consider trying
          logging in with the email you are trying, in case you already have an
          account, or just trying again.
        </div>
      )}

      <Form.Submit asChild>
        <PDBButton dataSubmitType="login" style={{ marginTop: 10 }}>
          Login
        </PDBButton>
      </Form.Submit>
      <div className={styles.OrDivider}>- or -</div>
      <Form.Submit asChild>
        <PDBButton dataSubmitType="createAccount" style={{ marginTop: 10 }}>
          Create Account
        </PDBButton>
      </Form.Submit>
    </Form.Root>
  );
};

export default UserPasswordForm;
