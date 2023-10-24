import {
  createApi,
  fetchBaseQuery,
  TagDescription,
} from "@reduxjs/toolkit/query/react";
import { Table, User } from "@/types";
import { URI } from "@/constants";
import { HYDRATE } from "next-redux-wrapper";

export const tableApi = createApi({
  reducerPath: "tableApi",
  tagTypes: ["Table"],
  baseQuery: fetchBaseQuery({
    baseUrl: URI,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getTable: build.query<Table, { offset: string; limit: string }>({
      query: (query) => `table/?limit=${query.limit}&offset=${query.offset}`,
      providesTags: (result: Table | undefined): TagDescription<"Table">[] =>
        result
          ? [
              ...result.results.map(({ id }: { id: string }) => ({
                type: "Table" as const,
                id,
              })),
              { type: "Table" as const, id: "LIST" },
            ]
          : [{ type: "Table" as const, id: "LIST" }],
    }),

    addUser: build.mutation<void, User>({
      query: (body) => ({
        url: "table/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Table", id: "LIST" }],
    }),
    pathUser: build.mutation<void, { id: string; body: User }>({
      query: ({ id, body }) => ({
        url: `table/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Table", id: "LIST" }],
    }),
  }),
});

export const { useGetTableQuery, useAddUserMutation, usePathUserMutation } =
  tableApi;
