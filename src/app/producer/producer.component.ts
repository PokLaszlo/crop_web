import { Component } from '@angular/core';
import { ProducerApi } from '../shared/producer-api';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producer',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './producer.component.html',
  styleUrl: './producer.component.css',
})

export class ProducerComponent {
  producer:any
  producerForm:any
  addMode=true
  showModal=false;
  constructor(private api:ProducerApi, private builder:FormBuilder){}
  ngOnInit(){
    this.getProducers()
    this.producerForm=this.builder.group({
      id:[''],
      name:[''],
      country:[''],
      yearOfFoundation:[''],
      capacityHectare:[''],
    })
  }
  getProducers(){
    this.api.getProducers().subscribe({
      next:(res:any)=>{
        this.producer=res.data
        this.cancel()
      },
      error:(err:any)=>{console.error(err)}
    })
  }
  startEdit(producer:any){
    this.addMode=false
    this.setShowModal()
    this.producerForm.patchValue(producer)
  }
  Operation(){
    if(this.addMode){
      this.startCreate()
    }
    else{
      this.confirm_Animation_Window(this.producerForm.value.id)
    }
  }
  startCreate(){
    this.api.createProducer(this.producerForm.value).subscribe({
      next:(res:any)=>{
        if(res.success){
          this.animatedWindow()
          this.getProducers()
          this.cancel()
        }else{
          this.animatedWindow("Hiba","Hibás adat hozzáadása","error")
        }
      },
      error:(err:any)=>{
        this.animatedWindow("Hiba","Nem sikerült a művelet","error")
        console.error(err)
      }
    })
  }
  startUpdate(){
    this.api.updateProducer(this.producerForm.value).subscribe({
      next:(res:any)=>{
        if(res.success){
          this.getProducers()
          this.cancel()
          this.animatedWindow()
        }else{
          this.animatedWindow("Hiba","Nem megfelelő adat","error")
        }
      },
      error:(err:any)=>{console.error(err);this.animatedWindow("Hiba","Szerver oldali hiba","warning")}
    })
  }
  startDelete($id:number){
    this.api.deleteProducer($id).subscribe({
      next:(res:any)=>{
        if(res.success){
        this.getProducers()
        this.cancel()
        }else{
          this.animatedWindow("Hiba","Nem sikerült a törlés","error")
        }
      },
      error:(err:any)=>{console.error(err);this.animatedWindow("Hiba","Szerver oldali hiba","error")}
    })
  }
  cancel(){
    this.addMode=true
    this.producerForm.reset()
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
          this.startDelete($id)
        }else{
          this.startUpdate()
        }
      } else if ( result.dismiss === Swal.DismissReason.cancel) {
        this.animatedWindow("Hiba","Adott művelet elutasítva","error");
      }
    });
  }
}