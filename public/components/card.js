class CardComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="card p-6 m-2">
                <div class="card-icon p-4 rounded-full">
                    <i class="fas fa-${this.getAttribute("icon")}"></i>
                </div>
                <div class="card-title my-8">
                    <span>${this.getAttribute("title")}</span>
                </div>
                <div class="card-content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin eu pulvinar dui, et rutrum tellus.
                        Maecenas eu pharetra arcu, volutpat accumsan sem.
                    </p>
                </div>
                <div class="card-action py-4">
                    <a class="text-alt" href="#">Learn More</a>
                </div>
            </div>`;
  }
}

customElements.define("card-component", CardComponent);
