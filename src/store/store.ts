import {User} from "../models/User";
import {makeAutoObservable} from "mobx";
import AuthServices from "../service/AuthServices";
import axios from "axios";
import {AuthResponse} from "../models/AuthResponse";
import $api, {API_URL} from "../http";


export default class Store{
    user = {} as User
    isAuth = false;
    isLoading = false;
    constructor() {
        makeAutoObservable(this);
    }
    setAuth(bool:boolean){
        this.isAuth = bool;
    }
    setUser(user: User){
        this.user = user;

    }
    setLoading(bool: boolean){
        this.isLoading = bool
    }
    async login(email:string , password: string){
        this.setLoading(true)
        try {
            const response = await AuthServices.login(email , password)
            localStorage.setItem('token' , response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

        }
        catch (e:any){
            console.log(e.response?.data?.message)
        }
        finally {
            this.setLoading(false)
        }
    }
    async registration(email:string , password: string , name:string){
        this.setLoading(true)
        try {
            const response = await AuthServices.registration(email , password, name)
            localStorage.setItem('token' , response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }
        catch (e:any){
            console.log(e.response?.data?.message)
        }
        finally {
            this.setLoading(false)
        }
    }
    async logout(){
        try {
            const response = await AuthServices.logout()
            localStorage.removeItem('token' )
            this.setAuth(false)
            this.setUser({} as User)

        }
        catch (e:any){
            console.log(e.response?.data?.message)
        }
    }
    async checkAuth(){
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}api/refresh` , {withCredentials:true})
            localStorage.setItem('token' , response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }
        catch (e:any){
            console.log(e.response?.data?.message)
        }finally {
            this.setLoading(false)
        }
    }
    async uploadImg(image: FormData , id : string | undefined){
        this.setLoading(true)
        try {
            if (image){
                const response = await $api.patch(`${API_URL}api/uploadAvatar/:${id}` , image , {
                    headers:{
                        'content-type': "mulpipart/form-data"
                    }})
                this.user.avatar = response.data
                this.setUser(this.user)
            }
        }
        catch (e:any){
            console.log(e.response?.data?.message)
        }finally {
            this.setLoading(false)
        }
    }
}