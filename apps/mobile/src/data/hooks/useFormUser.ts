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

    if (!name.trim() || !email.trim || !password.trim) {
      errors.name = "Todas as Informações são obrigatórias.";
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email inválido";
      return;
    }
    if (password.length < 8) {
      errors.password = "Senha precisa ter no mínimo 8 caracteres";
      return;
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
