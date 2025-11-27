import { Component } from '@angular/core';
import { CropApi } from '../shared/crop-api';

@Component({
  selector: 'app-crop',
  imports: [],
  templateUrl: './crop.component.html',
  styleUrl: './crop.component.css',
})
export class CropComponent {

  crops: any;

  constructor(private cropApi: CropApi) { }

  ngOnInit() {
    this.getCrops()
  }

  getCrops() {
     this.crops = this.cropApi.getCrops()
  }
}
