import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'
import type { DepartmentOfAgriculture } from "types/department-of-agriculture";

// Define a service using a base URL and expected endpoints
export const departmentOfAgricultureApi = createApi({
  reducerPath: "departmentOfAgricultureApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://www.usda.gov/sites/default/files/documents/data.json",
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    getBaseDepartmentOfAgricultureData: builder.query<
      DepartmentOfAgriculture,
      string
    >({
      query: () => "/department-of-agriculture",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBaseDepartmentOfAgricultureDataQuery } =
  departmentOfAgricultureApi;
