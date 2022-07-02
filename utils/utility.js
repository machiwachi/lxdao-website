export const formatAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export const scrollToSection = (id, offset = 0) => {
  const ele = document.getElementById(id);
  let realTop = ele.offsetTop;
  realTop += ele.offsetParent.offsetTop;
  window.scrollTo({
    top: realTop - offset,
    behavior: 'smooth',
  });
};
