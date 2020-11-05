let template = `
<div class="testimonial-carousel center-title w-full">
    <div class="testimonial-items">
    </div>
    <div class="testimonials-indicators grid">
    <ul class="dots center-title flex list-none gap-2"></ul>
    </div>
</div>
`;

class TestimonialsComponent extends HTMLElement {
  async fetchData() {
    return await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((postData) => {
        return fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((usersData) => {
            let postToShow = [];
            postData.forEach((post) => {
              //Find user
              let user = usersData.find((x) => x.id === post.userId);
              postToShow.push({
                ...post,
                ...user,
              });
            });
            return postToShow;
          });
      });
  }

  buildDot(index) {
    let dot = document.createElement("li");
    dot.classList.add(
      "dot",
      "border",
      "rounded-full",
      "w-3",
      "h-3",
      "bg-gray-400"
    );
    dot.setAttribute("data-index", index);
    if (index === 0) {
      dot.classList.add("selected");
    }
    this.querySelector(".dots").appendChild(dot);
  }

  buildTestimonialItem(item, index) {
    let testimonial = document.createElement("div");
    testimonial.classList.add("testimonial-item", "grid", "justify-center");
    if (index > 0) {
      testimonial.classList.add("hidden");
    }
    testimonial.setAttribute("data-index", index);
    let avatar = document.createElement("div");
    avatar.classList.add("p-6", "center-title");
    avatar.innerHTML = `<img src="https://avatars.dicebear.com/api/human/${item.name?.replace(
      "",
      "+"
    )}.svg" class="w-24 rounded-full shadow-lg" alt="avatar">`;
    let quote = document.createElement("blockquote");
    quote.classList.add("p-6");
    quote.innerHTML = `
    <p class="testimonial-quote text-center text-2xl text-gray-600 italic">${item.body}</p>
    <p class="testimonial-author text-center p-6 text-lg font-bold">${item.name}</p>`;
    testimonial.appendChild(avatar);
    testimonial.appendChild(quote);
    this.buildDot(index);
    return testimonial;
  }

  doSlide(index) {
    this.querySelectorAll(".testimonial-item").forEach((element) => {
      element.classList.add("hidden");
    });
    this.querySelectorAll(".dot").forEach((element) => {
      element.classList.remove("selected");
    });
    this.querySelector(
      `.testimonial-item[data-index="${index}"]`
    ).classList.remove("hidden");
    this.querySelector(`.dot[data-index="${index}"]`).classList.add("selected");
  }

  runAuto(slideTime) {
    let items = 0;
    setInterval(() => {
      this.doSlide(items);

      if (items < parseInt(this.getAttribute("quantity")) - 1) {
        items++;
      } else {
        items = 0;
      }
    }, slideTime);
  }

  async connectedCallback() {
    this.innerHTML = template;
    console.log();
    await this.fetchData().then((data) => {
      for (
        let index = 0;
        index < parseInt(this.getAttribute("quantity"));
        index++
      ) {
        const item = data[Math.round(Math.random() * data.length)];
        this.querySelector(".testimonial-items").appendChild(
          this.buildTestimonialItem(item, index)
        );
      }
    });
    this.querySelectorAll(".dot").forEach((element) => {
      element.addEventListener("click", (e) => {
        this.doSlide(e.target.getAttribute("data-index"));
      });
    });

    let isAuto = this.getAttribute("auto");
    if (isAuto !== null && this.getAttribute("auto") == "true") {
      let slideTime = this.getAttribute("slide-time");

      this.runAuto(slideTime !== null ? parseInt(slideTime) : 2200);
    }
  }
}

customElements.define("testimonials-component", TestimonialsComponent);
