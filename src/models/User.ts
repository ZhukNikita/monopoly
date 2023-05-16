export interface User{
    email: string;
    avatar: string;
    name:string;
    isActivated:boolean;
    id:string;
    achievements: {
        wins: number;
        allMoney: number;
        games: number;
    }
}