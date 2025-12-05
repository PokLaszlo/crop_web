import { Component } from '@angular/core';
import { CropApi } from '../shared/crop-api';
import { ProducerApi } from '../shared/producer-api';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
  showModal=false;

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
      this.confirm_Animation_Window(this.cropForm.value.id)
    }
  }
  startCreateCrop() {
    console.log(this.cropForm.value)
    this.cropApi.createCrop(this.cropForm.value).subscribe({
      next: (res: any) => {
        this.getCrops()
        this.animatedWindow()
        this.cancel()
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  startUpdateCrop() {
    this.cropApi.updateCrop(this.cropForm.value).subscribe({
      next: (res: any) => {
        this.getCrops()
        this.animatedWindow("Siker","Frissítés sikeres","success")
        this.cancel()
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  startEditCrop(crop: any) {
    this.addMode = false
    this.showModal=true
    this.cropForm.patchValue(crop)
  }

  startDeleteCrop(id: number) {
    this.cropApi.deleteCrop(id).subscribe({
      next: (res: any) => {
        this.getCrops()
        this.animatedWindow("Siker","Törlés sikeres","success")
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  cancel() {
    this.cropForm.reset()
    this.addMode=true
    this.showModal=false
  }
  setShowModal(){
    this.showModal=true
  }
  animatedWindow($title:string="Szép munka!",$text:string="Művelet sikeres!",$icon:any="success"){
    Swal.fire({
      title: $title,
      text: $text,
      icon: $icon,
      timer:1300
    });
  }
  confirm_Animation_Window($id:number){
    Swal.fire({
      title: "Biztos vagy benne?",
      text: "Nem lehet majd visszatérni ebből!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: this.addMode?"Törlés":"Módosítás",
      cancelButtonText: "Mégsem",
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.addMode){
          this.startDeleteCrop($id)
          this.animatedWindow("Szép munka","Törlés sikeres","success");
        }else{
          this.startUpdateCrop()
          this.animatedWindow("Szép munka","Frissítés sikeres","success");
        }
      } else if ( result.dismiss === Swal.DismissReason.cancel) {
        this.animatedWindow("Hiba","Nem sikerült az adott művelet","error");
      }
    });
  }
}
