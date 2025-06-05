export type paymentMethodTypes = {
  id: number;
  name: string;
  slug: string;
  image: File | string | null;
  type: string;
  min: number;
  max: number;
  percent_charge: number;
  fixed_charge: number;
  class_name: string | null;
  pay_instructions: string | null;
  meta: object | null;
  status: "active" | "inactive";
};
export type createPaymentMethod = {
  name: string;
  slug: string;
  image: File | string | null;
  type: string;
  min: number;
  max: number;
  percent_charge: number;
  fixed_charge: number;
  class_name: string | null;
  pay_instructions: string | null;
  meta: object | null;
  status: "active" | "inactive";
};

export type updatePaymentMethod = {
  id: number;
  name: string;
  slug: string;
  image: File | string | null;
  type: string;
  min: number;
  max: number;
  percent_charge: number;
  fixed_charge: number;
  class_name: string | null;
  pay_instructions: string | null;
  meta: object | null;
  status: "active" | "inactive";
};