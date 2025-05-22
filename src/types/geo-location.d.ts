export type AreaItem = {
    id: number,
    name: string,
    bn_name: string,
    upazila_id:number,
    url: string,
    is_active: boolean,
    upazila: {
        name: string,
    }
};
export type UpdateAreaItem = {
    id: number,
    name: string,
    bn_name: string,
    upazila_id:number,
    url: string,
    is_active: boolean,
};
export type CreateAreaItem = {
    name: string,
    bn_name: string,
    upazila_id:number,
    url: string,
    is_active: boolean,
};
export type UpazilaOptions = {
    value: number,
    label:string,
}
