import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Customer {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  customerArray: Customer[] = [];
  currentCustomerID = '';
  firstName = '';
  lastName = '';
  dob = '';
  gender = '';
  address = '';
  customer: any; 

  isFormModalVisible = false;
  isEditMode = false;

  constructor(private http: HttpClient) {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.http.get("http://localhost:8000/user/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.customerArray = resultData.data;
      });
  }

  setUpdate(data: any) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.address = data.address;
    this.dob = data.dob;
    this.gender = data.gender;
    this.currentCustomerID = data._id;
    this.isEditMode = true;
    this.showFormModal();
  }

  updateRecords() {
    const bodyData = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      dob: this.dob,
      gender: this.gender
    };

    this.http.patch("http://localhost:8000/user/update/" + this.currentCustomerID, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Customer Updated");
        this.getAllCustomer();
        this.hideFormModal();
      });
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:8000/user/delete/" + data._id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Customer Deleted");
        this.getAllCustomer();
      });
  }

  save() {
    if (this.isEditMode) {
      this.updateRecords();
    } else {
      this.register();
    }
  }

  register() {
    const bodyData = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      dob: this.dob,
      gender: this.gender
    };

    this.http.post("http://localhost:8000/user/create", bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Customer Registered Successfully");
        this.firstName = '';
        this.lastName = '';
        this.address = '';
        this.dob = '';
        this.gender = '';
        this.getAllCustomer();
        this.hideFormModal();
      });
  }

  showFormModal() {
    this.isFormModalVisible = true;
  }

  hideFormModal() {
    this.isFormModalVisible = false;
    this.resetForm();
  }

  handleFormClick(event: Event) {
    event.stopPropagation();
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.address = '';
    this.dob = '';
    this.gender = '';
    this.isEditMode = false;
  }
}
