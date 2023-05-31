import { Component } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent {
  suppliers: Supplier[] = [];
  formGroupSupplier: FormGroup;
  isEditing = false;


  constructor(private supplierService: SupplierService, private formBuilder: FormBuilder) { 
     this.formGroupSupplier = this.formBuilder.group({
    id: '',
    name: '',
    active: false,
    category: '',
    contact: ''
  });
  }

  ngOnInit(): void{
    this.loadSuppliers();
  }

  loadSuppliers(){
    this.supplierService.getSuppliers().subscribe({
        next: data => this.suppliers = data
    })
    }

  saveSupplier(){

    if(this.isEditing){
    this.supplierService.update(this.formGroupSupplier.value).subscribe({
      next: () => {
        this.loadSuppliers();
        this.formGroupSupplier.reset();
        this.isEditing = false;
      }
    })
    }
    else{
      this.supplierService.save(this.formGroupSupplier.value).subscribe({
        next: data => {
          this.suppliers.push(data);
          this.formGroupSupplier.reset();
        }
      });
    }
  }

  editSupplier(supplier: Supplier): void{
    this.formGroupSupplier.setValue(supplier);
    this.isEditing = true;
  }

  removeSupplier(supplier: Supplier): void{
    this.supplierService.remove(supplier).subscribe({
      next: () => this.loadSuppliers()
    });
  }
}


