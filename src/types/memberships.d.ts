export type memberships = {
  id: number;
  name: string;
  slug: string;
  image: File | string | null;
  description: string;
  price: number;
  proposals: number;
  profile_views_limit: number;
  days: number;
  is_published: boolean;
  is_recommended: boolean;
};
export type createMemberships = {
  name: string;
  image: File | string;
  description: string;
  price: number;
  proposals: number;
  profile_views_limit: number;
  days: number;
  is_published: boolean;
  is_recommended: boolean;
};

export type updateMemberships = {
  id: number;
  name: string;
  slug: string;
  image: File | string | null;
  description: string;
  price: number;
  proposals: number;
  profile_views_limit: number;
  days: number;
  is_published: boolean;
  is_recommended: boolean;
};