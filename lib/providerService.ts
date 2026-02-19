// import { supabase } from "../lib/providerService"; // adjust if needed
// export async function saveIdentityVerification(
//   providerId: string,
//   data: {
//     idType: string;
//     idNumber: string;
//     documentImage: string;
//     selfieImage?: string | null;
//   },
// ) {
//   const { error } = await supabase
//     .from("provider_profile")
//     .update({
//       identity_verification: {
//         idType: data.idType,
//         idNumber: data.idNumber,
//         documentImage: data.documentImage,
//         selfieImage: data.selfieImage || null,
//         verificationStatus: "pending",
//       },
//       onboarding_step: "religious_certification",
//     })
//     .eq("id", providerId);

//   if (error) {
//     throw error;
//   }
// }

// export async function saveReligiousCertification(
//   providerId: string,
//   data: any,
// ) {
//   const { error } = await supabase
//     .from("provider_profile")
//     .update({
//       religious_certification: {
//         ...data,
//         verificationStatus: "pending",
//       },
//       onboarding_step: "service_offer",
//     })
//     .eq("id", providerId);

//   if (error) throw error;
// }
// export const saveReligiousCertification = async (
//   userId: string,
//   details: any,
// ) => {
//   // If 'supabase' is undefined here, you get the "property 'from' of undefined" error
//   const { data, error } = await supabase
//     .from("religiouscertifications") // Ensure your table name is correct
//     .upsert({
//       user_id: userId,
//       certificate_url: details.certificateFile,
//       reference_type: details.referenceType,
//       institution_name: details.institutionName,
//       reference_contact_name: details.referencePerson,
//       contact_phone: details.contactPhone,
//       reference_letter_url: details.referenceLetter,
//     });

//   if (error) throw error;
//   return data;
// };
import { supabase } from "../lib/supabase";

export async function saveIdentityVerification(
  providerId: string,
  data: {
    idType: string;
    idNumber: string;
    documentImage: string;
    selfieImage?: string | null;
  },
) {
  const { error } = await supabase
    .from("provider_profile")
    .update({
      identity_verification: {
        idType: data.idType,
        idNumber: data.idNumber,
        documentImage: data.documentImage,
        selfieImage: data.selfieImage || null,
        verificationStatus: "pending",
      },
      onboarding_step: "religious_certification",
    })
    .eq("id", providerId);

  if (error) throw error;
}

export async function saveReligiousCertification(
  providerId: string,
  data: any,
) {
  const { error } = await supabase
    .from("provider_profile")
    .update({
      religious_certification: {
        certificateFile: data.certificateFile,
        referenceType: data.referenceType,
        institutionName: data.institutionName,
        referencePerson: data.referencePerson,
        contactPhone: data.contactPhone,
        referenceLetter: data.referenceLetter,
        verificationStatus: "pending",
      },
      onboarding_step: "service_offer",
    })
    .eq("id", providerId);

  if (error) throw error;
}
