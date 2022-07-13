Component({
  properties: {
    padding: Boolean,
    list: Array
  },

  methods: {
    onClick(event) {
      const { value } = event.currentTarget.dataset;
      this.triggerEvent('click', { value });
    }
  }
});
