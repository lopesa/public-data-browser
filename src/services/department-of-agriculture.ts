import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DepartmentOfAgriculture } from "types/department-of-agriculture";

// Define a service using a base URL and expected endpoints
export const departmentOfAgricultureApi = createApi({
  reducerPath: "departmentOfAgricultureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    getBaseDepartmentOfAgricultureData: builder.query<
      DepartmentOfAgriculture,
      string
    >({
      query: () => ({
        url: "/department-of-agriculture",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBaseDepartmentOfAgricultureDataQuery } =
  departmentOfAgricultureApi;
