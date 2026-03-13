export type VerificationStatus = "pending" | "approved" | "rejected";

export interface Verification {
  id: number;
  name: string;
  submittedAt: string;
  status: VerificationStatus;
}

export const VERIFICATIONS: Verification[] = [
  { id: 1, name: "Ana Paula", submittedAt: "2026-03-12T08:14:00Z", status: "pending"  },
  { id: 2, name: "Carlos Manuel Nhaca", submittedAt: "2026-03-12T09:02:00Z", status: "pending"  },
  { id: 3, name: "Fátima Salomão", submittedAt: "2026-03-12T09:45:00Z", status: "approved" },
  { id: 4, name: "Hélder Joaquim Macuácua", submittedAt: "2026-03-12T10:20:00Z", status: "rejected" },
  { id: 5, name: "Inês Rodrigues Tembe", submittedAt: "2026-03-12T11:05:00Z", status: "pending"  },
  { id: 6, name: "João Ernesto Bila", submittedAt: "2026-03-12T11:58:00Z", status: "pending"  },
  { id: 7, name: "Lurdes Isaura Mondlane", submittedAt: "2026-03-11T16:30:00Z", status: "approved" },
  { id: 8, name: "Miguel António Cossa", submittedAt: "2026-03-11T14:10:00Z", status: "pending"  },
  { id: 9, name: "Tomás Ernesto Sitoe", submittedAt: "2026-03-10T15:22:00Z", status: "rejected" },
];