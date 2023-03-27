import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { DatasetsAvailable } from "types/dataset-index-type";
import { DepartmentOfAgricultureDataItem } from "types/department-of-agriculture";
import { DepartmentOfEnergyDataItem } from "types/department-of-energy";
import { InternationalCoffeeOrganizationDataItem } from "types/international-coffee-organization";
import {
  InitialBookmarkIndexDataItem,
  InitialIndexData,
  InitialIndexDataItem,
  SpreadsheetData,
  User,
} from "types/types-general";
import { setEmailAndToken } from "app/User.slice";
import { RootState } from "app/store";

const BASE_URL = "http://localhost:3001";

const addDatasetId = (
  baseQueryReturnValue: InitialIndexData,
  // meta?: FetchBaseQueryMeta,
  datasetId: DatasetsAvailable
) => {
  const newData = baseQueryReturnValue.data.map((item) => {
    return {
      ...item,
      datasetId: datasetId,
    };
  });
  return {
    ...baseQueryReturnValue,
    data: newData,
  };
};

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    timeout: 10000,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["DepartmentOfAgricultureGetAll", "DepartmentOfEnergyGetAll"],
  endpoints: (builder) => ({
    getBaseDepartmentOfAgricultureDataAll: builder.query<
      InitialIndexData,
      void
    >({
      query: () => ({
        url: "/department-of-agriculture",
      }),
      transformResponse: (baseQueryReturnValue: InitialIndexData, meta) => {
        return addDatasetId(
          baseQueryReturnValue,
          // meta,
          DatasetsAvailable.departmentOfAgriculture
        );
      },
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
    getBaseDepartmentOfEnergyDataAll: builder.query<InitialIndexData, void>({
      query: () => ({
        url: "/department-of-energy",
      }),
      transformResponse: (baseQueryReturnValue: InitialIndexData, meta) => {
        return addDatasetId(
          baseQueryReturnValue,
          // meta,
          DatasetsAvailable.departmentOfEnergy
        );
      },
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
    getInternationalCoffeeOrganizationDataAll: builder.query<
      InitialIndexData,
      void
    >({
      query: () => ({
        url: "/international-coffee-organization",
      }),
      transformResponse: (baseQueryReturnValue: InitialIndexData, meta) => {
        return addDatasetId(
          baseQueryReturnValue,
          DatasetsAvailable.internationalCoffeeOrganization
        );
      },
    }),
    getInternationalCoffeeOrganizationDataById: builder.query<
      InternationalCoffeeOrganizationDataItem,
      string
    >({
      query: (id) => ({
        url: `/international-coffee-organization/${id}`,
      }),
    }),
    getSpreadsheetData: builder.query<SpreadsheetData, string>({
      query: (url) => ({
        url: `/get-spreadsheet-data/${encodeURIComponent(url)}`,
      }),
    }),
    loginUser: builder.query<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/user/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    createUser: builder.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/user/signup",
        method: "POST",
        body: { email, password },
      }),
    }),
    addBookmarks: builder.mutation<
      string,
      { dataItemUuid: string; datasetId: DatasetsAvailable }[]
    >({
      query: (dataItems) => ({
        url: "bookmarks/addBookmarks",
        method: "POST",
        body: { bookmarks: dataItems },
      }),
    }),
    removeBookmark: builder.mutation<
      boolean,
      string
      // { originalId?: string; bookmarkId?: string }
    >({
      query: (originalId) => ({
        url: "bookmarks/removeBookmark",
        method: "POST",
        body: { originalId },
      }),
    }),
    getBookmarks: builder.query<InitialBookmarkIndexDataItem[], void>({
      query: () => ({
        url: "bookmarks",
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
  useGetInternationalCoffeeOrganizationDataAllQuery,
  useGetInternationalCoffeeOrganizationDataByIdQuery,
  useGetSpreadsheetDataQuery,
  useLazyLoginUserQuery,
  useCreateUserMutation,
  useAddBookmarksMutation,
  useRemoveBookmarkMutation,
  useGetBookmarksQuery,
  useLazyGetBookmarksQuery,
} = apiSlice;
