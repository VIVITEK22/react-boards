import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { LoginForm } from "./ui/login-form";
import { ROUTES } from "@/shared/model/routes";

function LoginPage() {
  return <AuthLayout
    cardTitle="Вход в систему"
    cardDescription="Введите ваш email и пароль для входа в систему"
    form={<LoginForm />}
    footer={<>Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link></>}
  />;
}

export default LoginPage;
