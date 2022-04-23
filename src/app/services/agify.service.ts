import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  // Injectable is a decorator that marks a class as available to be provided and injected as a dependency.
  providedIn: 'root'
})
export class AgifyService {
  // predictAge(name: string) {
  baseUrl = "https://api.agify.io";
  // constructor(private http: HttpClient) {}
  constructor(private http: HttpClient) { }
  predictAge(name: string) {
    // return this.http.get(`${this.baseUrl}/predict/${name}`);
    return axios.get(`${this.baseUrl}?name=${name}`);
  }
}
