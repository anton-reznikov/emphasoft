import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-assignment.emphasoft.com/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.authToken;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query() {
        return {
          url: "users",
          method: "GET",
        };
      },
    }),
    getUser: builder.query({
      query(id) {
        return {
          url: `users/${id}`,
          method: "GET",
        };
      },
    }),
    updateUser: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `users/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    createUser: builder.mutation({
      query(body) {
        return {
          url: `users/`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
  useGetUserQuery,
} = usersApi;
