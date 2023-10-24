import React, { FC, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User } from "@/types";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { useAddUserMutation, usePathUserMutation } from "@/redux/api/table.api";

type ModalEditProjectProps = {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  user?: User;
};

export const ModalEditUser: FC<ModalEditProjectProps> = ({
  title,
  isOpen,
  handleClose,
  user,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>();
  const [pathUser] = usePathUserMutation();
  const [addUser] = useAddUserMutation();

  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
    }
    if (user?.email) {
      setValue("email", user.email);
    }
    if (user?.address) {
      setValue("address", user.address);
    }
    if (user?.phone_number) {
      setValue("phone_number", user.phone_number);
    }
    if (user?.birthday_date) {
      setValue("birthday_date", user.birthday_date);
    }
  }, [
    user?.address,
    user?.birthday_date,
    user?.email,
    user?.name,
    user?.phone_number,
    setValue,
  ]);
  const handleError = (errors: object) => {
    console.warn(errors);
  };
  const onSubmit = async (values: User) => {
    if (user) {
      console.log(user.id);
      await pathUser({ id: user.id, body: values });
    } else {
      await addUser(values);
    }
    reset();
    handleClose();
  };
  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 tablet:bg-[#6B7280BF] tablet:bg-opacity-75"
              aria-hidden="true"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex max-h-[100vh] items-start justify-center overflow-y-auto  tablet:items-center tablet:p-4">
              <Dialog.Panel className="h-full w-screen overflow-hidden overflow-y-auto bg-white text-parL font-medium text-darkSkyBlue-100 tablet:m-auto tablet:h-auto tablet:w-[642px] tablet:rounded-3xl">
                <div className="flex items-center  justify-between border-y border-y-stroke bg-softGreen px-4 py-3.5 tablet:border-t-0 tablet:px-6 tablet:py-4">
                  <Dialog.Title>
                    <div className="flex items-center gap-1">
                      <div>{title}</div>
                    </div>
                  </Dialog.Title>
                </div>
                <div className="shadow-inner shadow-dark-60 h-[90vh] tablet:h-fit p-4 tablet:p-6">
                  <form
                    onSubmit={handleSubmit(onSubmit, handleError)}
                    noValidate
                    method="post"
                    className="flex flex-col  items-stretch  tablet:gap-8 gap-0 w-full h-full"
                  >
                    <div className="flex flex-col gap-6 items-center h-full w-fit">
                      <Input
                        label={"Enter user name"}
                        isRequired={true}
                        type="text"
                        id="name"
                        // defaultValue={data?.name}
                        control={control}
                        errorText={errors?.name?.message}
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 1,
                            message: "Name must be at least 1 characters",
                          },
                          maxLength: {
                            value: 255,
                            message: "Name must be at most 255 characters",
                          },
                        })}
                      />
                      <Input
                        label={"Enter email address"}
                        isRequired={true}
                        // defaultValue={data?.email}
                        type="email"
                        id="email"
                        control={control}
                        errorText={errors?.email?.message}
                        {...register("email", {
                          required: "Email is required",
                          minLength: {
                            value: 1,
                            message: "Email must be at least 1 characters",
                          },
                          maxLength: {
                            value: 254,
                            message: "Email must be at most 254 characters",
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <Input
                        label={"Enter user address"}
                        isRequired={false}
                        type="text"
                        id="address"
                        // defaultValue={data?.name}
                        control={control}
                        errorText={errors?.address?.message}
                        {...register("address", {
                          required: "Address is required",
                          minLength: {
                            value: 1,
                            message: "Address must be at least 1 characters",
                          },
                        })}
                      />
                      <Input
                        label={"Enter phone number"}
                        isRequired={true}
                        // defaultValue={data?.email}
                        type="tel"
                        id="phone_number"
                        control={control}
                        errorText={errors?.phone_number?.message}
                        {...register("phone_number", {
                          required: "Phone number is required",
                          minLength: {
                            value: 1,
                            message:
                              "Phone number must be at least 1 characters",
                          },
                          maxLength: {
                            value: 20,
                            message:
                              "Phone number must be at most 20 characters",
                          },
                          pattern: {
                            value: /^[0-9+]+$/,
                            message: "Invalid phone number",
                          },
                        })}
                      />
                      <Input
                        label={"Enter user birthday date"}
                        isRequired={true}
                        type="text"
                        id="birthday_date"
                        control={control}
                        errorText={errors?.birthday_date?.message}
                        {...register("birthday_date", {
                          required: "Birthday date is required",
                          pattern: {
                            value:
                              /^\d{4}-(?:(0[1-9]|1[0-2])-(0[1-9]|1\d|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-(31))$/,
                            message: "Invalid date format (yyyy-mm-dd)",
                          },
                        })}
                      />
                    </div>

                    <div className="flex gap-4 tablet:justify-end justify-between w-full">
                      <Button
                        text={"Cancel"}
                        type="button"
                        variant={"white"}
                        className="w-full tablet:w-[140px]"
                        onClick={handleClose}
                      />
                      <Button text="Confirm" type="submit" />
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
