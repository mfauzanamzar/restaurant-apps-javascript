class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     
        <nav id="drawer" class="nav">
            <ul class="nav__list">
                <li class="nav__item"><a tabindex="0" id="nav-item__attr1" href="#/list-restaurant">Restaurants</a></li>
                <li class="nav__item"><a tabindex="0" id="nav-item__attr2" href="#/favorite">Favorite</a></li>
                <li class="nav__item"><a tabindex="0" id="nav-item__attr3" href="https://www.linkedin.com/in/mfauzanamzar/">About Us</a></li>
            </ul>
        </nav>`;
  }
}

customElements.define('app-bar', AppBar);
