import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as process from "process";
import { LoginRequest, LoginResponse } from "@/types";
import { URI } from "@/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Authentications", "Error"],
  baseQuery: fetchBaseQuery({
    baseUrl: URI,
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "login/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
