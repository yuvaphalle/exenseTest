import { Component, OnInit } from "@angular/core";
import { HelperService } from "../services/helper.service";

@Component({
  selector: "app-sorted-view",
  template: `
    <!-- Main Div -->
    <div
      class="flex rounded-lg flex-row min-h-screen justify-center items-center"
    >
      <table
        class="w-full rounded-lg text-sm text-center text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-white uppercase bg-gray-700 dark:text-white"
        >
          <tr class="br-10">
            <th scope="col" class="px-6 text-xl py-3 text-white">Name</th>
            <th scope="col" class="px-6 text-xl py-3 text-white">Age</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            *ngFor="let predict of ageArray"
          >
            <td class="px-6 py-4 text-white">
              {{ predict.name }}
            </td>
            <td class="px-6 py-4 text-white">
              {{ predict.age }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Main Div Ends -->
  `,
  styles: [
    "table > tbody > tr:nth-child(1) { background-color: #C9B037;} table > tbody > tr:nth-child(2) { background-color: #D7D7D7;}table > tbody > tr:nth-child(3) { background-color: #6A3805;}",
  ],
})
export class SortedViewComponent implements OnInit {
  // Variables
  ageArray: any[];
  // Constructor
  constructor(private helper: HelperService) {
    // Initializing the ageArray
    if (localStorage.getItem("nameAgeArray") != null) {
      this.ageArray = JSON.parse(localStorage.getItem("nameAgeArray")!);
    } else {
      this.ageArray = [];
    }
    // Sorting the ageArray
    this.ageArray = this.ageArray.sort(this.helper.compare);
  }

  ngOnInit(): void {}
}
