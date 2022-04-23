import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-name-view",
  template: `
    <div class="flex h-screen">
      <form class="w-full mx-auto pt-80 max-w-sm">
        <div class="flex items-center border-b border-sky-500 py-2">
          <input
            required
            ng-required
            type="text"
            id="username"
            name="username"
            #username
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add Name"
            aria-label="Full name"
          />
          <button
            class="flex-shrink-0 bg-sky-700 hover:bg-teal-500 border-sky-700 hover:border-teal-500 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
            (click)="clickme(username.value)"
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
      </form>
    </div>
  `,
  styles: [],
})
export class NameViewComponent implements OnInit {
  constructor() {
    console.log("loca", localStorage);
  }

  // myObjArray = [
  // ];

  clickme(username: string) {
    console.log("it does nothing", username);
    // this.myObjArray.push({name: username});
    if (username != "") {
      var nameArray = [username];

      var localNameArray = localStorage.getItem("nameArray");

      if (localNameArray) {
        nameArray = JSON.parse(localNameArray);
        nameArray.push(username);
      }

      localStorage.setItem("nameArray", JSON.stringify(nameArray));
      console.log("it does nothing", nameArray);
      console.log("new object", this);
    }
  }

  name = "";
  ngOnInit(): void {}
}
