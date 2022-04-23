import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Response } from "../models/response";
import { User } from "../models/user";
import { AgifyService } from "../services/agify.service";

@Component({
  selector: "app-name-view",
  template: `
    <!-- Main Div -->

    <div class="flex ">
      <!-- Form  -->
      <form
        class="w-full mx-auto pt-1/2 max-w-sm"
        [formGroup]="nameForm"
        (ngSubmit)="onSubmit(nameForm)"
      >
        <div class="flex items-center border-b border-sky-500 py-2">
          <input
            formControlName="username"
            type="text"
            id="username"
            name="username"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add Name"
            aria-label="Name"
          />
          <button
            class="flex-shrink-0 bg-sky-700 hover:bg-teal-500 border-sky-700 hover:border-teal-500 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
            [disabled]="!nameForm.valid"
          >
            Add Name
          </button>
          <button
            class="flex-shrink-0 border-transparent border-4 text-sky-500 hover:text-rose-500 text-sm py-1 px-2 rounded"
            type="reset"
          >
            Clear
          </button>
        </div>
        <div
          class="flex items-center border-b border-red-500 py-2"
          *ngIf="
            nameForm.get('username')?.hasError('required') &&
            nameForm.get('username')?.touched
          "
        >
          <!-- Response message -->
          <p class="text-red-500">Name is required</p>
        </div>
        <p class=" text-red-500">{{ msg }}</p>
      </form>
      <!-- End Form -->
    </div>
    <!-- End Main Div -->
  `,
  styles: [],
})
export class NameViewComponent implements OnInit {
  // Variables
  nameForm: FormGroup;
  msg: string = "";
  name = "";
  submitStatus: boolean = false;
  result: any;
  myObjArray = [];
  predictedAge: Response[] = [];

  // constructor
  constructor(private formBuilder: FormBuilder, private agify: AgifyService) {
    this.nameForm = this.formBuilder.group({
      username: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    for (let index = 0; index < 1005; index++) {}
  }

  // Helper functions
  onSubmit(form: FormGroup) {
    this.submitStatus = false;
    const user = form.value as User;
    console.log(user);
    // Check if user exists in local storage
    if (form.valid) {
      if (this.isUser(user.username)) {
        // User exists
        const users = JSON.parse(
          localStorage.getItem("nameAgeArray")!
        ) as Response[];
        const index = users.findIndex((item) => item.name === user.username);
        const localUser = users[index];
        // Update local storage
        this.msg =
          "Name " +
          localUser.name +
          " already exists predicted age is : " +
          localUser.age;
        this.resetForm(form);
        console.log(this.msg);
        return;
      }

      // Call API
      this.agify

        .predictAge(user.username)
        .then(({ data }) => {
          var nameAgeArray = [data as Response];
          // Check if user exists in local storage
          var localAgeArray = localStorage.getItem("nameAgeArray");
          // If local storage is empty
          if (localAgeArray) {
            console.log("localAgeArray", localAgeArray);

            nameAgeArray = JSON.parse(localAgeArray);

            nameAgeArray.push(data as Response);
          }
          // Save to local storage
          if (data.age) {
            localStorage.setItem("nameAgeArray", JSON.stringify(nameAgeArray));

            this.resetForm(form);
            console.log("test", nameAgeArray);
            this.submitStatus = true;
            this.result = data;
            this.msg = " Name " + data.name + " predicted age is : " + data.age;
          }
          // If user does not exist in local storage
          else {
            this.msg = data.name + " has no age";
            this.resetForm(form);
            console.log(this.msg);
          }
        })
        // If API call fails
        .catch((error) => {
          console.log(error);
          this.msg = "Encounetered an error + " + error;
        });
    }
  }
  // Check if user exists in local storage
  isUser(name: string): boolean {
    var localAgeArray = localStorage.getItem("nameAgeArray");
    if (localAgeArray) {
      // If local storage is not empty
      const nameAgeArray = JSON.parse(localAgeArray) as Response[];
      const index = nameAgeArray.findIndex((item) => item.name === name);
      if (index > -1) {
        return true;
      }
    }
    return false;
  }

  // Reset form

  resetForm = (form: FormGroup) => {
    this.submitStatus = true;
    form.reset();
  };
}
