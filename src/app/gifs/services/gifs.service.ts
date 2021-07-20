import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Im0QzHzIbVkLI3Ifq6hqCFX0OGKrJmUy';
  private _urlService: string = 'http://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history():string[]{
    this._history = this._history.splice(0,10);
    return [...this._history];
  }

  constructor(private http : HttpClient){
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query:string){

    query = query.trim().toLocaleLowerCase();

    if(!this._history.includes(query)){
      this._history.unshift(query);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', query)
    .set('limit', '10');


    this.http.get<SearchGifsResponse>(`${this._urlService}/search`, {params})
    .subscribe((resp)=>{
      this.results = resp.data;
      localStorage.setItem('results', JSON.stringify(this.results));
    })
  }
}
