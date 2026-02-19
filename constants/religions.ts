// // 1️⃣ EXPORT THE TYPE
// export type ReligionType = "islam" | "hindu" | "christianity";

// // 2️⃣ EXPORT THE CONFIG
// export const RELIGIONS: Record<
//   ReligionType,
//   {
//     id: ReligionType;
//     title: string;
//     description: string;
//     color: string;
//   }
// > = {
//   islam: {
//     id: "islam",
//     title: "Islam",
//     description: "Connect with Islamic scholars and services",
//     color: "#0E9F6E",
//   },
//   hindu: {
//     id: "hindu",
//     title: "Hinduism",
//     description: "Find Hindu priests and ritual services",
//     color: "#F59E0B",
//   },
//   christianity: {
//     id: "christianity",
//     title: "Christianity",
//     description: "Connect with Christian clergy and services",
//     color: "#3B82F6",
//   },
// };

// 1️⃣ Religion Type
export type ReligionType = "islam" | "hindu" | "christianity";

// 2️⃣ Religion Config Data
export const RELIGIONS: Record<
  ReligionType,
  {
    id: ReligionType;
    title: string;
    description: string;
    color: string;
  }
> = {
  islam: {
    id: "islam",
    title: "Islam",
    description: "Connect with Islamic scholars and services",
    color: "#0E9F6E",
  },
  hindu: {
    id: "hindu",
    title: "Hinduism",
    description: "Find Hindu priests and ritual services",
    color: "#F59E0B",
  },
  christianity: {
    id: "christianity",
    title: "Christianity",
    description: "Connect with Christian clergy and services",
    color: "#3B82F6",
  },
};

// 3️⃣ Scholar Types Per Religion
export const SCHOLAR_TYPES: Record<ReligionType, string[]> = {
  islam: ["Imam", "Qari", "Hafiz", "Islamic Scholar"],
  christianity: ["Pastor", "Priest", "Minister"],
  hindu: ["Pandit", "Pujari", "Acharya"],
};

// 4️⃣ Scholar Type Icons Mapping
export const SCHOLAR_TYPE_ICONS: Record<
  ReligionType,
  Record<string, string>
> = {
  islam: {
    Imam: "mosque",
    Qari: "book-open-page-variant",
    Hafiz: "book",
    "Islamic Scholar": "account-tie",
  },
  christianity: {
    Pastor: "cross",
    Priest: "church",
    Minister: "account-tie",
  },
  hindu: {
    Pandit: "om",
    Pujari: "fire",
    Acharya: "book-education",
  },
};

// header based on religion icon changed

export const RELIGION_HEADER_ICON: Record<ReligionType, string> = {
  islam: "mosque",
  christianity: "cross",
  hindu: "om",
};
