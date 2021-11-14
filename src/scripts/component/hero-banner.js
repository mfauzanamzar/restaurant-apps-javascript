class HeroBanner extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div id="heroPlace" class="hero">   
                <div class="hero__inner">
                      <h1 class="hero__title">Cari Restoran Favorit Kamu di Berbagai Tempat di Indonesia</h1>
                      <p class="hero__tagline">Nikmati hidangan di restoran yang kamu pilih</p>
                  
                </div>
            </div>`;
  }
}

customElements.define('hero-banner', HeroBanner);
