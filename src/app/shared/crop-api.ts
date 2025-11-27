import { Injectable } from '@angular/core';

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

  constructor() {}

  getCrops() {
    return this.crops
  }
 
}
