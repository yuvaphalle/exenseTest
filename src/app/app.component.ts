import { Component, OnInit, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="flex flex-col h-screen justify-between">


      <!-- Header Nav Bar -->
      <app-header></app-header>
      <!-- Header Nav Bar Ends-->



      <!-- Body -->
      <!-- Body Ends -->

      <router-outlet></router-outlet>



    <!-- Footer -->
    <app-footer> </app-footer>
    <!-- Footer Ends -->

    </div>

  `,
  styles: [],
})
export class AppComponent {
  title = "exense";
}
