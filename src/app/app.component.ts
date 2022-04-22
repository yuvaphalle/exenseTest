import { Component, OnInit, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="flex flex-col h-screen justify-between">


      <!-- Header Nav Bar -->
      <header>
        <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5  shadow-md">
          <div
            class="container flex flex-wrap justify-between items-center mx-auto"
          >
            <a href="" class="flex items-center">
              <img
                src="./assets/images/logo.png"
                class="mr-3 h-6 "
                alt="Logo"
              />
              <span
                class="text-white font-bold text-xl rounded-lg bg-rose-500 p-5"
              >
                agify.io
              </span>
            </a>
            <div class="flex md:order-2">
              <button
                data-collapse-toggle="mobile-menu-4"
                type="button"
                id="menu-button"
                (click)="toggleDisplay()"
                class="inline-flex items-center  p-2 text-lg text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-4"
                aria-expanded="false"
              >
                <span class="sr-only"></span>
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  class="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              [hidden]="isShow"
              class="  justify-between  items-center w-full text-lg md:flex md:w-auto md:order-1"
              id="mobile-menu-4"
            >
              <ul
                class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
              >
                <li></li>
                <li>
                  <a
                    href="#"
                    class="block text-lg py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-grey-200 md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >Name View</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block text-lg py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >Sorted View</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block text-lg py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >Age View</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <!-- Header Nav Bar Ends-->



      <!-- Body -->
      <main>
        <h6 class="text-center text-2xl text-gray-500 uppercase tracking-wide">
        Front-End Developer
        </h6>

      </main>
      <!-- Body Ends -->




    <!-- Footer -->
      <footer
        class="text-center text-gray-500 bg-black py-20" 
      >
      <p class="text-sky-600 text-3xl tracking-wide ">exense</p>
      <p class="text-rose-500 text-2xl ">agify.io</p>
      <p class="text-slate-300">
      It's all about quality.

      </p>
      
      </footer>

    <!-- Footer Ends -->

    </div>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  isShow = true;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  title = "exense";
}
