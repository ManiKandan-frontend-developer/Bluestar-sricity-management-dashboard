import HttpClient from "./http";
import { rootUrl } from "../helpers/url";
class CrudService{
    url="";
    constructor(){
        this.http=new HttpClient();
    }
    list(filter={}){
        return this.http.post(this.url,{...filter});
    }
    
    retrieve(id){
        return this.http.get(`${this.url}/${id}`);
    }
    add(data){
        return this.http.post(`${this.url}`,data);
    }
    update(data,id){
        return this.http.put(`${this.url}/${id}`,data);
    }
    patch(data,id){
        return this.http.patch(`${this.url}/${id}`,data);
    }
    save(data){
        return this.http.post(`${this.url}`,data);
    }
    delete(data){
        return this.http.post(`${this.url}`,data);
    }
}
export default CrudService;