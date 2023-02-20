import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  DepartmentOfAgriculture,
  DepartmentOfAgricultureDataItem,
} from "types/department-of-agriculture";

// Define a service using a base URL and expected endpoints
export const departmentOfAgricultureApi = createApi({
  reducerPath: "departmentOfAgricultureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    getBaseDepartmentOfAgricultureDataAll: builder.query<
      DepartmentOfAgricultureDataItem[],
      void
    >({
      query: () => ({
        url: "/department-of-agriculture",
      }),
    }),
    getDepartmentOfAgricultureDataById: builder.query<
      DepartmentOfAgricultureDataItem,
      string
    >({
      query: (id) => ({
        url: `/department-of-agriculture/${id}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBaseDepartmentOfAgricultureDataAllQuery,
  useGetDepartmentOfAgricultureDataByIdQuery,
} = departmentOfAgricultureApi;
