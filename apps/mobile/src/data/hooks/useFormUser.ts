import { useState } from "react";
import useUser from "./useUser";

export default function useFormUser() {
  const { login, register } = useUser();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const validate = () => {
    let errors: any = {};

    if (!name) {
      errors.name = "Nome é obrigatório";
    }
    if (!password) {
      errors.password = "Senha é obrigatória";
    }
    if (!email) {
      errors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "E-mail inválido";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const registerUser = async () => {
    if (validate()) {
      await register({ name, email, password });
    }
  };
  const loginUser = async () => {
    await login({ email, password });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    errors,
    registerUser,
    loginUser,
    validate,
  };
}
