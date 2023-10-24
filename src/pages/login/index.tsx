import React, { useState, FC } from "react";
import { ModalAuth } from "@/components/auth/modal/ModalAuth";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/redux/api/auth.api";
import EyeIcon from "../../../public/IconsSet/eye.svg";
import EyeOffIcon from "../../../public/IconsSet/eye-off.svg";
import { Button } from "@/components/ui/Button";
import { AuthorizationLayout } from "@/components/layouts/authorization/Layout";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { LoginRequest } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { setLoginSuccess } from "@/redux/slices/auth.slice";

type FormRequiredFields = {
  username: string;
  password: string;
};
const LoginPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormRequiredFields>();

  const handleClose = () => {
    setOpenModal(false);
    setMessage("");
  };
  const handleError = (errors: object) => {
    console.warn(errors);
  };
  const onSubmit = async (values: LoginRequest) => {
    const response = await login(values);
    if ("error" in response) {
      // @ts-ignore
      setMessage(response.error.data.error);
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 3000);
    } else {
      setMessage(response.data.message);
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
        dispatch(setLoginSuccess(true));
        router.push("/table?page=1");
      }, 3000);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <AuthorizationLayout page={"login"}>
      <ModalAuth open={openModal} handleClose={handleClose} message={message} />
      <form
        onSubmit={handleSubmit(onSubmit, handleError)}
        noValidate
        method="post"
        className="flex flex-col gap-6 justify-between tablet:justify-start h-full w-full tablet:w-fit"
      >
        <div className="flex flex-col gap-6">
          <p className="text-dispL text-dark-100 font-bold mb-6">Sign-In</p>

          <Input
            label={"Enter your username"}
            isRequired={true}
            type="username"
            id="username"
            control={control}
            errorText={errors?.username?.message}
            {...register("username", {
              required: "Username is required",
            })}
          />
          <div className="relative tablet:w-[390px]">
            <Input
              label={"Enter your password"}
              isRequired={true}
              type={showPassword ? "text" : "password"}
              id="password"
              control={control}
              errorText={errors?.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />
            <div
              className="w-4 h-4 text-gray-80 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {!showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </div>
          </div>
        </div>
        <Button
          text={"Login"}
          variant={"primary"}
          size={"base"}
          type={"submit"}
          className="w-full tablet:w-[180px] mb-6"
        />
      </form>
    </AuthorizationLayout>
  );
};

export default LoginPage;
