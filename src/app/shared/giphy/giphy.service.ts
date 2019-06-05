import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private API_KEY = 'K54vAMFHGIT7jOZ9j7ZWKtnx4WOcd5Pm';
  private GIPHY_API = 'http://api.giphy.com/v1/gifs/search?api_key=' + this.API_KEY + '&limit=1&q=';

  constructor(public http: HttpClient) {
  }

  get(searchTerm) {
    const apiLink = this.GIPHY_API + searchTerm;
    return this.http.get(apiLink).pipe(map((response: any) => {
      if (response.data.length > 0) {
        return response.data[0].images.original.url;
      } else {
        return 'https://media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif'; // dancing cat for 404
      }
    }));
  }

}
