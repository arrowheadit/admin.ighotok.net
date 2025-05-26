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

export type UpazilaItem = {
    id: number,
    name: string,
    bn_name: string,
    district_id:number,
    url: string,
    is_active: boolean,
    district: {
        name: string,
    }
};
export type UpdateUpazilaItem = {
    id: number,
    name: string,
    bn_name: string,
    district_id:number,
    url: string,
    is_active: boolean,
};
export type CreateUpazilaItem = {
    name: string,
    bn_name: string,
    district_id:number,
    url: string,
    is_active: boolean,
};
export type DistrictOptions = {
    value: number,
    label:string,
}

export type DistrictItem = {
    id: number,
    division_id:number,
    name: string,
    bn_name: string,    
    lat: string,    
    lon: string,    
    url: string,
    is_active: boolean,
    division: {
        name: string,
    }
};
export type UpdateDistrictItem = {
    id: number,
    division_id:number,
    name: string,
    bn_name: string,
    lat: string,
    lon: string,
    url: string,
    is_active: boolean,
};
export type CreateDistrictItem = {
    name: string,
    division_id:number,
    bn_name: string,
    lat: string,
    lon: string,
    url: string,
    is_active: boolean,
};
export type DivisionOptions = {
    value: number,
    label:string,
}
export type DivisionItem = {
    id: number,
    name: string,
    bn_name: string, 
    url: string,
    is_active: boolean,
};
export type UpdateDivisionItem = {
    id: number,
    name: string,
    bn_name: string,
    url: string,
    is_active: boolean,
};
export type CreateDivisionItem = {
    name: string,
    bn_name: string,
    url: string,
    is_active: boolean,
};
