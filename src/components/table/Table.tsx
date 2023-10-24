import { User } from "@/types";
import React, { FC } from "react";
import { UserCard } from "@/components/table/UserCard";

type TableProps = {
  users: User[];
};

export const Table: FC<TableProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-5 border border-dark-60 rounded-md overflow-hidden w-full mb-6">
      <p className="text-dark-80 text-parM font-bold bg-green-10 p-2 border-[2px] border-dark-60">
        Name
      </p>
      <p className="text-dark-80 text-parM font-bold  bg-green-10 p-2 border-[2px] border-dark-60">
        Email
      </p>
      <p className="text-dark-80 text-parM font-bold bg-green-10 p-2 border-[2px] border-dark-60">
        Address
      </p>
      <p className="text-dark-80 text-parM font-bold bg-green-10 p-2 border-[2px] border-dark-60">
        Phone
      </p>
      <p className="text-dark-80 text-parM font-bold bg-green-10 p-2 border-[2px] border-dark-60">
        Birthdate
      </p>
      {users.map((user) => {
        return (
          <React.Fragment key={user.id}>
            <UserCard user={user} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
