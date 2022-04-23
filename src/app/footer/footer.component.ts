import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  template: `
    <footer class="text-center text-gray-500 bg-black bottom-0 fixed w-full h-40 pt-10">
      <p class="text-sky-600 text-3xl tracking-wide ">exense</p>
      <p class="text-rose-500 text-2xl ">agify.io</p>
      <p class="text-slate-300">It's all about quality.</p>
    </footer>
  `,
  styles: [],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
