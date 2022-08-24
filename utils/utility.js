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

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const setLocalStorage = (name, value) => {
  if (name && typeof window !== 'undefined') {
    window.localStorage.setItem(name, value);
  }
};

export const getLocalStorage = (name) => {
  if (name && typeof window !== 'undefined') {
    return window.localStorage.getItem(name);
  }
};

export const removeLocalStorage = (name) => {
  if (name && typeof window !== 'undefined') {
    return window.localStorage.removeItem(name);
  }
};
