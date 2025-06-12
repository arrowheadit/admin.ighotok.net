export type seoItem = {
  id: number;
  title: string;
  canonical_url: string;
  author: string;
  keywords: string;
  description: string;
  image: File | string | null;
};
export type createPageSeo = {
  title: string;
  canonical_url: string;
  author: string;
  keywords: string;
  description: string;
  image: File | string | null;
  pageSlug: string;
};

export type updatePageSeo = {
  id: number;
  title: string;
  canonical_url: string;
  author: string;
  keywords: string;
  description: string;
  image: File | string | null;
}

export type updatePageSeo = {
  id: number;
  title: string;
  canonical_url: string;
  author: string;
  keywords: string;
  description: string;
  image: File | string | null;
};