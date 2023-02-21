import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  DepartmentOfEnergy,
  DepartmentOfEnergyDataItem,
} from "types/department-of-energy";

// Define a service using a base URL and expected endpoints
export const departmentOfEnergyApi = createApi({
  reducerPath: "departmentOfEnergyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    getBaseDepartmentOfEnergyDataAll: builder.query<
      DepartmentOfEnergyDataItem[],
      void
    >({
      query: () => ({
        url: "/department-of-energy",
      }),
    }),
    getDepartmentOfEnergyDataById: builder.query<
      DepartmentOfEnergyDataItem,
      string
    >({
      query: (id) => ({
        url: `/department-of-energy/${id}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBaseDepartmentOfEnergyDataAllQuery,
  useGetDepartmentOfEnergyDataByIdQuery,
} = departmentOfEnergyApi;
