export type PageItem = {
    id: number,
    slug: string,
    title: string,
    content: string,
    status: string,    
}
export type UpdatePageItem = {
    id: number,
    slug: string,
    title: string,
    content: string,
    status: string,    
}
export type CreatePageItem = {
    slug: string,
    title: string,
    content: string,
    status: string,    
}