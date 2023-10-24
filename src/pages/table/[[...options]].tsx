import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import DropdownIcon from "../../../public/IconsSet/dropdown.svg";
import DropDownUpIcon from "../../../public/IconsSet/dropdown-up.svg";
import { GeneralLayout } from "@/components/layouts/General/Layout";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";
import { Spinner } from "@/components/ui/Spinner";
import { useGetTableQuery } from "@/redux/api/table.api";
import { useRouter } from "next/router";
import { Table } from "@/components/table/Table";
import { ModalEditUser } from "@/components/table/ModalEditUser";
import MdArrowBack from "../../../public/IconsSet/arrow-left.svg";
import MdArrowForward from "../../../public/IconsSet/arrow-right.svg";
import { useAppSelector } from "@/redux/hooks";
import { Pagination } from "@/components/Pagination";

const TablePage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { page = "1" } = router.query;
  const [limit, setLimit] = useState("10");
  const { data: table, isSuccess } = useGetTableQuery({
    limit,
    offset: page === "1" ? "0" : `${(+page - 1) * +limit}`,
  });

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);
  return (
    <GeneralLayout currentPage={"table"}>
      <div className="flex flex-col gap-8   tablet:gap-6 items-end">
        <Button
          text={"Add user"}
          onClick={() => setIsOpenModal(true)}
          className={"w-fit"}
        />
        {isSuccess ? (
          <Table users={table.results} />
        ) : (
          <div className="flex h-screen flex-col justify-center items-center self-center">
            <Spinner className="fill-green-20 text-green-60 w-20 h-20 tablet:w-40 tablet:h-40" />
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center mb-6">
        <Button
          size={"xs"}
          variant={"yellow"}
          icon={{ svg: <MdArrowBack /> }}
          disabled={table?.previous === null}
          className={clsx(
            table?.previous === null ? "shadow-sm !bg-white" : "",
          )}
          onClick={() => router.push(`/table?page=${+page - 1}`)}
        />
        {table?.count ? (
          <Pagination
            currentPage={+page}
            countOfPages={Math.ceil(table?.count / +limit)}
          />
        ) : null}
        <Button
          size={"xs"}
          variant={"yellow"}
          icon={{ svg: <MdArrowForward /> }}
          disabled={table?.next === null}
          className={clsx(table?.next === null ? "shadow-sm !bg-white" : "")}
          onClick={() => router.push(`/table?page=${+page + 1}`)}
        />
        <Menu>
          <div className="relative flex justify-end p-0 ml-10">
            <Menu.Button
              onClick={toggleMenu}
              className={
                "flex h-[38px]  w-full cursor-pointer items-center shadow-md shadow-dark-60 hover:shadow-sm hover:shadow-dark-60 justify-between rounded-md bg-yellow-10 border border-stroke py-[9px] px-[13px] text-parS font-normal text-darkSkyBlue-80 tablet:w-[130px] tablet:py-2"
              }
            >
              <p>{limit} / page</p>
              {!isOpenMenu ? (
                <DropdownIcon className="h-5 w-5" />
              ) : (
                <DropDownUpIcon className="h-5 w-5" />
              )}
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute top-10 z-30 h-[154px] w-full origin-top-right overflow-hidden overflow-y-scroll rounded-md border border-darkSkyBlue-10 bg-yellow-10 shadow-lg tablet:w-[130px]">
                <div className="border-b border-b-[#E7EDEF]">
                  <Menu.Item>
                    <div
                      className="cursor-pointer py-[9px] px-[13px] text-parS font-normal text-darkSkyBlue-80  hover:bg-yellow-20 tablet:py-2 "
                      onClick={() => {
                        setLimit("10");
                        router.push(`/table?page=1`).finally();
                      }}
                    >
                      10
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      className="cursor-pointer py-[9px] px-[13px] text-parS font-normal text-darkSkyBlue-80  hover:bg-yellow-20 tablet:py-2 "
                      onClick={() => {
                        setLimit("25");
                        router.push(`/table?page=1`).finally();
                      }}
                    >
                      25
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      className="cursor-pointer py-[9px] px-[13px] text-parS font-normal text-darkSkyBlue-80  hover:bg-yellow-20 tablet:py-2 "
                      onClick={() => {
                        setLimit("50");
                        router.push(`/table?page=1`).finally();
                      }}
                    >
                      50
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      className="cursor-pointer py-[9px] px-[13px] text-parS font-normal text-darkSkyBlue-80  hover:bg-yellow-20 tablet:py-2 "
                      onClick={() => {
                        setLimit("100");
                        router.push(`/table?page=1`).finally();
                      }}
                    >
                      100
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      className="cursor-pointer py-[9px] px-[13px] text-parS font-normal text-darkSkyBlue-80  hover:bg-yellow-20 tablet:py-2 "
                      onClick={() => {
                        setLimit(`${table?.count}`);
                        router.push(`/table?page=1`).finally();
                      }}
                    >
                      All available
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </div>

      <ModalEditUser
        title={"Add new user"}
        isOpen={isOpenModal}
        handleClose={handleCloseModal}
      />
    </GeneralLayout>
  );
};

export default TablePage;
