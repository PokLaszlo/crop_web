import { Component } from '@angular/core';
import { CropApi } from '../shared/crop-api';
import { ProducerApi } from '../shared/producer-api';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crop',
  imports: [ReactiveFormsModule],
  templateUrl: './crop.component.html',
  styleUrl: './crop.component.css',
})
export class CropComponent {

  crops: any;
  producers: any;
  addMode = true;
  cropForm: any;

  constructor(
    private cropApi: CropApi,
    private producerApi: ProducerApi,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.cropForm = this.builder.group({
      id: '',
      name: '',
      type: '',
      proteinContent: '',
      producerId: ''
    })
    this.getCrops()
    this.getProducers()
  }

  getCrops() {
    this.cropApi.getCrops().subscribe({
      next: (res: any) => {
        this.crops = res.data
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  getProducers() {
    this.producerApi.getProducers().subscribe({
      next: (res: any) => {
        this.producers = res.data
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  save() {
    if(this.addMode) {
      this.startCreateCrop()
    } else {
      this.startUpdateCrop()
    }
  }
  startCreateCrop() {
    console.log(this.cropForm.value)
    this.cropApi.createCrop(this.cropForm.value).subscribe({
      next: (res: any) => {
        this.getCrops()
        this.cropForm.reset()
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  startUpdateCrop() {
    console.log('Update ...')
    console.log(this.cropForm.value)
    this.cropApi.updateCrop(this.cropForm.value).subscribe({
      next: (res: any) => {
        this.getCrops()
        this.cropForm.reset()
        console.log(res)
        this.addMode = true
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  startEditCrop(crop: any) {
    this.addMode = false
    this.cropForm.patchValue(crop)
  }

  startDeleteCrop(id: number) {
    this.cropApi.deleteCrop(id).subscribe({
      next: (res: any) => {
        this.getCrops()
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  cancel() {
    this.cropForm.reset()
    this.addMode = true
  }
}
