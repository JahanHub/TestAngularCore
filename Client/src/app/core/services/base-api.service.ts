import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BaseApiService {
    private baseUrl: string = 'http://localhost:5138/';
    constructor(private httpClient: HttpClient) { }
    

    public get<T>(url:string, params:any= null): Observable<T>{
        let fullUrl =this.baseUrl+ url;
        if(params == null){
            return this.httpClient.get<T>(fullUrl);
        } else {
            return this.httpClient.get<T>(fullUrl);
        }
    }

    public post<T>(url:string, data:T): Observable<T>{
        let fullUrl =this.baseUrl+ url;
        if(data != null){
            return this.httpClient.post<T>(fullUrl, data);
        } else {
            return of();
        }
    }

    public put<T>(url:string, data:T): Observable<T>{
        let fullUrl =this.baseUrl + url;
        if(data != null){
            return this.httpClient.put<T>(fullUrl, data);
        } else {
            return of();
        }
    }

    public delete<T>(url:string): Observable<any>{
        let fullUrl =this.baseUrl+ url;
        return this.httpClient.delete<T>(fullUrl);
        
    }
}