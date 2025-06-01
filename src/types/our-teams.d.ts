export type ourTeams = {
  id: number;
  name: string;
  image: File | string;
  designation: string;
};
export type createOurTeams = {
  name: string;
  image: File | string;
  designation: string;
};

export type updateOurTeams = {
  id: number;
  name: string;
  image: File | string;
  designation: string;
};