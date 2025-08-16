import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    getDivisions: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),
    deleteDivision: builder.mutation({
      query: (divisionId) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
    updateDivision: builder.mutation({
      query: ({ divisionId, updatedData }) => ({
        url: `/division/${divisionId}`,
        method: "PATCH",
        data: updatedData
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const { useAddDivisionMutation, useGetDivisionsQuery ,useDeleteDivisionMutation,useUpdateDivisionMutation} = divisionApi;