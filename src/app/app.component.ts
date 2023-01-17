import { Component } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  alldescriptions: any = ["Manager", "Developer", "Tester", "HR","DevOps"];
  editIndex: null | number = null;
  employee = new FormGroup({
    name: new FormControl(""),
    salary: new FormControl(""),
    description: new FormControl("Manager")
  });
  allEmployees: any = [];
  constructor() {
    // let emps: string = localStorage["employee"];
    this.allEmployees = localStorage["employee"]
      ? JSON.parse(localStorage["employee"])
      : [];
  }
  onSubmit(): void {
    let emp = {
      name : this.employee.get("name")?.value,
      description : this.employee.get("description")?.value,
      salary : this.employee.get("salary")?.value
    };
    let newList = [...this.allEmployees];
    if (this.editIndex === null) {
      newList = [...newList, emp];
    } else {
      newList.splice(this.editIndex, 1, emp);
      this.editIndex = null;
    }
    this.allEmployees = newList;
    localStorage.setItem("employee", JSON.stringify(newList));
    this.onReset();
  }
  onReset(): void {
    this.employee = new FormGroup({
      name: new FormControl(""),
      salary: new FormControl(""),
      description: new FormControl("Manager")
    });
  }
  onDelete(index: number): void {
    let newList = [...this.allEmployees];
    newList.splice(index, 1);
    this.allEmployees = newList;
    localStorage.setItem("employee", JSON.stringify(newList));
  }
  onEdit(index: number): void {
    this.editIndex = index;
    let data = this.allEmployees[index];
    this.employee = new FormGroup({
      name: new FormControl(data.name),
      salary: new FormControl(data.salary),
      description: new FormControl(data.description)
    });
  }
}
