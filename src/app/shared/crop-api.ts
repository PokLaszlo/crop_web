import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CropApi {
  crops = [
    { id: 1, name: 'Búza', type: 'sárga', proteinContent: 20.2, producerId: 1 },
    { id: 2, name: 'Köles', type: 'sárga', proteinContent: 20.2, producerId: 1 },
    { id: 3, name: 'Zab', type: 'sárga', proteinContent: 20.2, producerId: 1 },
    { id: 4, name: 'Árpa', type: 'sárga', proteinContent: 20.2, producerId: 1 },
    { id: 5, name: 'Zab', type: 'sárga', proteinContent: 12.2, producerId: 2 },
    { id: 6, name: 'Köles', type: 'sárga', proteinContent: 23.2, producerId: 2 },
    { id: 7, name: 'Rizs', type: 'sárga', proteinContent: 15.2, producerId: 2 },
    { id: 8, name: 'Búza', type: 'sárga', proteinContent: 20.2, producerId: 2 },
  ]

  host = environment.apiHost

  constructor(private http: HttpClient) {}

  getCrops() {
    const url = this.host + 'crops'
    return this.http.get(url)
  }

  createCrop(crop: any) {
    const url = this.host + 'crops'
    return this.http.post(url, crop)
  }

  updateCrop(crop: any) {
    const url = this.host + 'crops/' + crop.id
    return this.http.put(url, crop)
  }

  deleteCrop(id: number) {
    const url = this.host + 'crops/' + id
    return this.http.delete(url)
  }
 
}
