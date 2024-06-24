import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface QuotesApiResponse {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}

// Define a service using a base URL and expected endpoints
export const quotesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/quotes" }),
  reducerPath: "quotesApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Quotes"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getQuotes: build.query<QuotesApiResponse, number>({
      query: (limit = 10) => `?limit=${limit}`,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      // providesTags: (result, error, id) => [{ type: "Quotes", id }],
      providesTags: (result, error, id) => [
        { type: "Quotes", result, error, id },
      ],
    }),
  }),
});

export const { useGetQuotesQuery } = quotesApiSlice;
