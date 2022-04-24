import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor() {}

  // Helpers
  // Sorting the ageArray
  compare(a: any, b: any) {
    // Use toUpperCase() to ignore character casing
    if (a.name < b.name) {
      return -1;
    }
    // Use toUpperCase() to ignore character casing
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
}
