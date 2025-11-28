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
    console.log("Hozzáadás...")
    this.api.createProducer(this.producerForm.value).subscribe({
      next:(res:any)=>{
        this.animatedWindow()
        this.getProducers()
        this.cancel()
      },
      error:(err:any)=>{
        this.animatedWindow("Hiba","Nem sikerült a művelet","error")
        console.error(err)
      }
    })
  }
  startUpdate(){
    console.log("Frissítés...")
    this.api.updateProducer(this.producerForm.value).subscribe({
      next:(res:any)=>{
        console.log("Frissítés sikeres")
        this.getProducers()
        this.cancel()
      },
      error:(err:any)=>{console.error(err)}
    })
  }
  startDelete($id:number){
    console.log("Törlés...")
    this.api.deleteProducer($id).subscribe({
      next:(res:any)=>{
        console.log("Törlés sikeres")
        this.getProducers()
        this.cancel()
      },
      error:(err:any)=>{console.error(err)}
    })
  }
  cancel(){
    this.addMode=true
    this.producerForm.reset()
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Biztos vagy benne?",
      text: "Nem lehet majd visszatérni ebből!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: this.addMode?"Törlés":"Módosítás",
      cancelButtonText: "Mégsem",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.addMode){
          this.startDelete($id)
          this.animatedWindow("Szép munka","Törlés sikeres","success");
        }else{
          this.startUpdate()
          this.animatedWindow("Szép munka","Frissítés sikeres","success");
        }
      } else if ( result.dismiss === Swal.DismissReason.cancel) {
        this.animatedWindow("Hiba","Nem sikerült az adott művelet","error");
      }
    });
      }

}
