import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <main>
      <h6 class="text-center text-2xl text-gray-500 uppercase tracking-wide">
        Front-End Developer
      </h6>
    </main>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
