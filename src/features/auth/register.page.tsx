import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

function RegisterPage() {
  return (
    <AuthLayout
      cardTitle="Регистрация"
      cardDescription="Введите ваш email и пароль для регистрации в системе"
      form={<RegisterForm />}
      footer={
        <>
          Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Вход</Link>
        </>
      }
    />
  );
}

export default RegisterPage;
