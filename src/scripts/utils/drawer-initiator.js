const DrawerInitiator = {
  init({
    button, drawer, content, hero,
  }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    button.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this._toggleDrawer(event, drawer);
      }
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    hero.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
    const minwidth = window.matchMedia('(min-width: 500px)');
    const maxwidth = window.matchMedia('(max-width: 499px)');

    if (minwidth.matches) {
      document.getElementById('nav-item__attr1').tabIndex = '0';
      document.getElementById('nav-item__attr2').tabIndex = '0';
      document.getElementById('nav-item__attr3').tabIndex = '0';
    } else if (maxwidth.matches) {
      document.getElementById('nav-item__attr1').tabIndex = '-1';
      document.getElementById('nav-item__attr2').tabIndex = '-1';
      document.getElementById('nav-item__attr3').tabIndex = '-1';
    }
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
    document.getElementById('nav-item__attr1').tabIndex = '0';
    document.getElementById('nav-item__attr2').tabIndex = '0';
    document.getElementById('nav-item__attr3').tabIndex = '0';
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
    document.getElementById('nav-item__attr1').tabIndex = '-1';
    document.getElementById('nav-item__attr2').tabIndex = '-1';
    document.getElementById('nav-item__attr3').tabIndex = '-1';
  },
};

export default DrawerInitiator;
