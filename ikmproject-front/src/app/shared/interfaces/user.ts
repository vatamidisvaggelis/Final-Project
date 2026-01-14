export interface User {
    username : string,
    firstname : string,
    lastname : string,
    age : number,
    phone : {
        type:string,
        number:string,
        }
    password : string


}


export interface loginUser{

    username : string,
    password : string

}


export interface loggedInUser{
    username: string,
    firstname: string,
    lastname: string
}
