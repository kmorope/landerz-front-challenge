class NavComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="w-full fixed flex items-center justify-between flex-wrap p-3 bg-white z-50">

    <div class="logo logo-header"></div>
        <div class="w-full hidden md:block flex-grow md:space-x-10 md:flex md:justify-center md:items-center md:w-auto">
        <a href="#home" class="block mt-4 md:inline-block md:mt-0 mr-4 text">
        Home
      </a>
      <a href="#features" class="block mt-4 md:inline-block md:mt-0 mr-4 text">
        Features
      </a>
      <a href="#about-us" class="block mt-4 md:inline-block md:mt-0 text">
        About Us
      </a>
      <a href="#testimonials" class="block mt-4 md:inline-block md:mt-0 text">
        Testimonials
      </a>
      <a href="#blog" class="block mt-4 md:inline-block md:mt-0 text">
        Blog
      </a>
      <a href="#contact" class="block mt-4 md:inline-block md:mt-0 text">
        Contact
      </a>
        </div>
        <div class="block md:hidden">
          <button class="flex items-center px-3 py-2">
          <i class="fas fa-bars fa-2x"></i>
          </button>
        </div>

      </nav>`;
  }
}

customElements.define("nav-component", NavComponent);
