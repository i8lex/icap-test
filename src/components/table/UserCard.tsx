import { ModalEditUser } from "@/components/table/ModalEditUser";
import React, { FC, useState } from "react";
import { User } from "@/types";
import EditIcon from "../../../public/IconsSet/edit-05.svg";
import { Button } from "@/components/ui/Button";

type UserCardProps = {
  user: User;
};

export const UserCard: FC<UserCardProps> = ({ user }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <p
        className="text-parS text-dark-100 p-2 border border-dark-60 truncate"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {user.name}
      </p>
      <p
        className="text-parS text-dark-100 p-2 border border-dark-60 truncate"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {user.email}
      </p>
      <p
        className="text-parS text-dark-100 p-2 border border-dark-60 truncate"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {user.address}
      </p>
      <p
        className="text-parS text-dark-100 p-2 border border-dark-60 truncate"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {user.phone_number}
      </p>
      <div
        className="text-parS text-dark-100 p-2 border border-dark-60 truncate relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <div className="flex gap-2 absolute top-0 right-4">
            <Button
              size={"xs"}
              variant={"yellow"}
              onClick={() => setIsOpenModal(true)}
              icon={{ svg: <EditIcon /> }}
            />
          </div>
        ) : null}
        <p>{user.birthday_date}</p>
      </div>

      <ModalEditUser
        user={user}
        title={"Edit user"}
        isOpen={isOpenModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};
