import { baseApi } from "@/redux/store/baseApi";

export const bhaScheduleSlotApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBhaScheduleSlotData: builder.query({
      query: () => ({
        url: `/doctor/me`,
        method: "GET",
      }),
      providesTags: ["BhaScheduleSlot"],
    }),

    // Update availability - expects array of { day, availableSlots: [{ startTime, endTime }] }
    updateBhaAvailability: builder.mutation({
      query: (availability) => ({
        url: `/doctor/update-availability`,
        method: "POST",
        body: availability,
      }),
      invalidatesTags: ["BhaScheduleSlot"],
    }),

    // Join the session
    joinSessionNow: builder.mutation({
      query: ({ bookingId }) => ({
        url: `/video-session/create-video-session`,
        method: "POST",
        body: {
          bookingSheduleId: bookingId,
        },
      }),
      invalidatesTags: ["SessionManagement"],
    }),
  }),
});

export const {
  useGetBhaScheduleSlotDataQuery,
  useUpdateBhaAvailabilityMutation,
  useJoinSessionNowMutation,
} = bhaScheduleSlotApi;
