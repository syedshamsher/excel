const antTheme = {
  token: {
    // Seed Token
    colorPrimary: '#101e60',
  },
  components: {
    Segmented: {
      trackBg: '#eee',
    },
    Button: {
      colorPrimary: 'linear-gradient(135deg, #6252E1, #101e60)',
      colorPrimaryHover: `linear-gradient(135deg,  #6252E5, #101e10)`,
      colorPrimaryActive: `linear-gradient(135deg,  #6252E1, #101e60)`,
      defaultHoverBorderColor: '#101e60',
      controlOutlineWidth: 0,
    },
  },
};

export { antTheme };
