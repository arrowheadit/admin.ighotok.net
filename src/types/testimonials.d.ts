export type testimonials = {
  id: number;
  name: string;
  image: string;
  content: string;
  designation: string;
  status: "active" | "inactive";
};
export type createTestimonials = {
  name: string;
  image: string;
  content: string;
  designation: string;
  status: "active" | "inactive";
};

export type updateTestimonials = {
  id: number;
  name: string;
  image: string;
  content: string;
  designation: string;
  status: "active" | "inactive";
};