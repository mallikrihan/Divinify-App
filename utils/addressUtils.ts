// utils/addressUtils.ts
export const formatAddress = (personalDetails: any, userAddress?: string) => {
  if (personalDetails?.address) {
    const parts = [
      personalDetails.address,
      personalDetails.city,
      personalDetails.state,
      personalDetails.zip && `- ${personalDetails.zip}`,
    ].filter(Boolean);

    return parts.join(", ");
  }

  return userAddress || "Not Provided";
};

// In your profile page:
const personalDetails = useSelector(
  (state: RootState) => state.onboarding?.personalDetails,
);
const displayAddress = formatAddress(personalDetails, user?.address);
