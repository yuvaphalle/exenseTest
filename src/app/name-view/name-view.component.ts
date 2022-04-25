import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { Response } from "../models/response";
import { User } from "../models/user";
import { AgifyService } from "../services/agify.service";
import { HelperService } from "../services/helper.service";
import { StorageService } from "../services/storage.service";

@Component({
  selector: "app-name-view",
  template: `
    <!-- Main Div -->

    <div class=" ">
      <!-- Form  -->
      <form
        class="w-full max-w-xl mx-auto pt-1/2 p-2"
        [formGroup]="nameForm"
        (ngSubmit)="onSubmit(nameForm)"
      >
        <div class="items-center border-b border-sky-500 py-2">
          <div
            class=""
            formArrayName="usernames"
            *ngFor="let name of getNames(); let i = index"
          >
            <!-- form group -->
            <div [formGroupName]="i" class="flex items-center">
              <input
                formControlName="username"
                type="text"
                id="username"
                class="appearance-none mt-2 mb-1 h-12 bg-transparent  border-2  rounded-lg pl-2  border-red-200 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Add Name"
                aria-label="Name"
              />
              <button
                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 mt-2 py-0.5 text-center "
                *ngIf="i != 0"
                (click)="removeNames(i)"
              >
                X
              </button>
            </div>
            <p
              class=" text-red-500 mb-2"
              *ngIf="getName(i).hasError('required') && getName(i).touched"
            >
              Username is required
            </p>
          </div>
          <button
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="submit"
            [disabled]="!nameForm.valid"
          >
            Add Name (s)
          </button>
          <button
            class="ftext-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="reset"
          >
            Clear
          </button>
          <button
            class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="button"
            (click)="addNames()"
          >
            Add Name Field
          </button>

          <button
            class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="button"
            (click)="callTheApi()"
          >
            Test Error
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

        <p class=" text-red-500">
          {{ errmsg }}
          <button
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 mt-2 py-0.5 text-center "
            *ngIf="errmsg"
            (click)="removeMsg()"
          >
            X
          </button>
        </p>
        <p class="text-green-500" *ngFor="let message of msg.split(',')">
          {{ message }}
        </p>
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
  errmsg: string = "";
  name = "";
  submitStatus: boolean = false;
  result: any;
  myObjArray = [];
  predictedAge: Response[] = [];

  // constructor
  constructor(
    private formBuilder: FormBuilder,
    private agify: AgifyService,
    private storageService: StorageService,
    private helper: HelperService
  ) {
    this.nameForm = this.formBuilder.group({
      // username: ["", [Validators.required]],
      usernames: this.formBuilder.array([
        this.formBuilder.group({
          username: ["", Validators.required],
        }),
      ]),
    });
  }

  ngOnInit(): void {
    // this.addNames();
  }

  // Helper functions
  onSubmit(form: FormGroup) {
    this.submitStatus = false;
    const users = form.value.usernames as User[];
    if (users.length == 1) {
      // Check if user exists in local storage
      if (form.valid) {
        const username = users[0].username;
        if (this.storageService.isUser(username)) {
          // User exists
          const localUser = this.storageService.getSingleUser(username);
          // Update local storage
          this.msg =
            "Name " +
            localUser.name +
            " already exists predicted age is : " +
            localUser.age;
          this.resetForm(form);
          return;
        }

        // Call API
        this.agify
          .predictAge(username)
          .then(({ data }) => {
            // Save to local storage
            if (data.age) {
              this.storageService.saveUser(data);
              // Update local storage
              this.resetForm(form);
              this.submitStatus = true;
              this.result = data;
              this.msg =
                " Name " + data.name + " predicted age is : " + data.age;
            }
            // If user does not exist in local storage
            else {
              this.msg = data.name + " has no age";
              this.resetForm(form);
            }
          })
          // If API call fails
          .catch((error) => {
            this.msg = "Encounetered an error + " + error;
          });
      }
    } else {
      if (form.valid) {
        // Checks all the available usres
        var allUsers: Response[] = [];
        const usersAlreadyExist = [];
        var usersToBePredictedUniuque = [];
        const usersToBePredicted: string[] = [];
        users.forEach((user) => {
          if (
            // Check if user exists in local storage
            this.storageService.isUser(user.username)
          ) {
            usersAlreadyExist.push(user.username.toLowerCase());
            // Update local storage
            allUsers.push(
              this.storageService.getSingleUser(user.username.toLowerCase())
            );
          } else {
            usersToBePredicted.push(user.username.toLowerCase());
          }
        });
        this.msg = this.getMessage(allUsers);

        usersToBePredictedUniuque = usersToBePredicted.filter(this.onlyUnique);
        console.log("new", usersToBePredictedUniuque);
        // Call agify for bulk prediction
        if (usersToBePredictedUniuque.length > 0) {
          this.agify
            .predictBulkAge(usersToBePredictedUniuque)
            .then(({ data }) => {
              // Save to local storage
              data.forEach((user: Response) => {
                if (user.age) {
                  this.storageService.saveUser(user);
                  allUsers.push(user);
                } else {
                  this.msg = user.name + " has no age";
                  this.resetForm(form);
                }
              });

              this.resetForm(form);
              this.submitStatus = true;
              this.result = data;
              this.msg = this.getMessage(allUsers);
            })
            .catch((error) => {});
        }
      }
    }
    // reload page
    setTimeout(function () {
      location.reload();
    }, 5000);
  }

  callTheApi() {
    this.agify
      .predictAge("")
      .then(({ data }) => {})
      .catch((error) => {
        // If API call fails
        if (error == "Error: Request failed with status code 422") {
          this.errmsg =
            "Encounetered an error invalid arguments check if named was typed correctly";
        } else if (error == "Error: Request failed with status code 429") {
          this.errmsg = "Encounetered an error too many requests";
        } else if (error == "Error: Request failed with status code 401") {
          this.errmsg =
            "Encounetered an error invalid API key check if API key is correct";
        } else if (error == "Error: Request failed with status code 402") {
          this.errmsg = "Encounetered an error subcription not active";
        } else {
          this.errmsg = "Encounetered an error ";
        }
      });
  }

  // Reset form
  resetForm = (form: FormGroup) => {
    // Reset form
    this.submitStatus = true;
    form.reset();
  };
  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  getNames() {
    // Get all names
    return (this.nameForm.get("usernames") as FormArray).controls;
  }

  getName(index: number) {
    // Get name at index
    return (this.nameForm.get("usernames") as FormArray).controls[index].get(
      "username"
    ) as FormControl;
  }

  getMessage(allUsers: Response[]): string {
    // Get message
    allUsers = allUsers.sort(this.helper.compare);
    let msg = "";
    allUsers.forEach((user: Response) => {
      if (user.age) {
        msg += "Name " + user.name + " predicted age is : " + user.age + ",";
      } else {
        msg += "Name " + user.name + " has no age,";
      }
    });
    return msg;
  }

  addNames() {
    // Add name
    const fa = this.nameForm.get("usernames") as FormArray;
    this.msg = "";
    fa.push(
      this.formBuilder.group({
        username: ["", Validators.required],
      })
    );
  }
  removeNames(index: number) {
    // Remove name
    if (this.getNames().length > 1) {
      const fa = this.nameForm.get("usernames") as FormArray;
      fa.removeAt(index);
    }
  }

  removeMsg() {
    // Remove message
    this.errmsg = "";
  }
}
