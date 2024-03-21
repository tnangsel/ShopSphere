import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class TokenService{
    private token: string = '';
    constructor(){}
    
    setCookie( token:string){
        token:this.token;
    }

    getCookie(){
        return this.token;
    }

}