import { Injectable } from "@angular/core";
import { Response } from "../models/response";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  // Save data to local storage
  saveUser(data: Response) {
    var nameAgeArray = [];
    var localAgeArray = localStorage.getItem("nameAgeArray");
    // If local storage is empty
    if (localAgeArray) {
      nameAgeArray = JSON.parse(localAgeArray);
      nameAgeArray.push(data as Response);
      // Save to local storage
      localStorage.setItem("nameAgeArray", JSON.stringify(nameAgeArray));
    } else {
      // If local storage is empty
      nameAgeArray.push(data as Response);
      // Save to local storage
      localStorage.setItem("nameAgeArray", JSON.stringify(nameAgeArray));
    }
  }

  // Get data from local storage
  getUsers(): [Response] {
    var nameAgeArray = [];
    var localAgeArray = localStorage.getItem("nameAgeArray");
    // If local storage is empty
    if (localAgeArray) {
      nameAgeArray = JSON.parse(localAgeArray);
    }
    return nameAgeArray;
  }

  // Get Single User from local storage
  getSingleUser(name: string): Response {
    var localAgeArray = localStorage.getItem("nameAgeArray");
    // If local storage is empty
    var nameAgeArray = JSON.parse(localAgeArray!);
    var user = nameAgeArray.find((user: Response) => user.name === name);
    return user;
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
}
