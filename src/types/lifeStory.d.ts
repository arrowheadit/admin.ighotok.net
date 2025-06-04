export type lifeStory = {
  id: number;
  name: string;
  image: File | string;
  image_alt: string;
  description: string;
  status: "active" | "inactive";
};
export type createLifeStory = {
  name: string;
  image: File | string;
  description: string;
  image_alt: string;
  status: "active" | "inactive";
};

export type updateLifeStory = {
  id: number;
  name: string;
  image: File | string;
  description: string;
  image_alt: string;
  status: "active" | "inactive";
};