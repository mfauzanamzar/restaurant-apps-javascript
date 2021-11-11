class HeroBanner extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div id="heroPlace" class="hero">   
                <div class="hero__inner">
                  <div class="hero-container__title">
                      <h1 class="hero__title">Cari Restoran Favorit Kamu di Berbagai Tempat di Indonesia</h1>
                  </div>
                      <p class="hero__tagline">Nikmati hidangan di restoran yang kamu pilih</p>
                  
                </div>
            </div>`;
  }
}

customElements.define('hero-banner', HeroBanner);
