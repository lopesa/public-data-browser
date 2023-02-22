import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DepartmentOfAgricultureDataItem } from "types/department-of-agriculture";
import { DepartmentOfEnergyDataItem } from "types/department-of-energy";

const BASE_URL = "http://localhost:3001";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["DepartmentOfAgricultureGetAll", "DepartmentOfEnergyGetAll"],
  // refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getBaseDepartmentOfAgricultureDataAll: builder.query<
      DepartmentOfAgricultureDataItem[],
      void
    >({
      query: () => ({
        url: "/department-of-agriculture",
      }),
      providesTags: ["DepartmentOfAgricultureGetAll"],
    }),
    getDepartmentOfAgricultureDataById: builder.query<
      DepartmentOfAgricultureDataItem,
      string
    >({
      query: (id) => ({
        url: `/department-of-agriculture/${id}`,
      }),
    }),
    getBaseDepartmentOfEnergyDataAll: builder.query<
      DepartmentOfEnergyDataItem[],
      void
    >({
      query: () => ({
        url: "/department-of-energy",
      }),
      providesTags: ["DepartmentOfEnergyGetAll"],
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
  useGetBaseDepartmentOfAgricultureDataAllQuery,
  useGetDepartmentOfAgricultureDataByIdQuery,
  useGetBaseDepartmentOfEnergyDataAllQuery,
  useGetDepartmentOfEnergyDataByIdQuery,
} = apiSlice;
