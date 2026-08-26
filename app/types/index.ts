export interface UserResponse{
    _id:string,
    name:string,
    email:string,
    username:string,
    image:string,
    bio:string,
    headline:string,
    githuURL:string,
    linkedInURL:string,
    skills:string[],
}
export interface BlogResponse{
    _id:string,
    slug:string,
    title:string,
    content:string,
    tags:string[],
    createdAt:string,
    author:{
        _id:string,
        name:string,
        username:string,
    };
}
export interface CommunityResponse{
    _id:string,
    name:string,
    slug:string,
    category:string,
    decription:string,
    members:UserResponse[];
}