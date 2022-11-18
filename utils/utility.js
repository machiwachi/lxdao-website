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

export const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    return arr;
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
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

export function getEtherScanDomain() {
  return process.env.NEXT_PUBLIC_CHAIN_ID === '1'
    ? 'etherscan.io'
    : 'goerli.etherscan.io';
}

export function getOpenSeaDomain() {
  return process.env.NEXT_PUBLIC_CHAIN_ID === '1'
    ? 'opensea.io'
    : 'testnets.opensea.io';
}

export function convertIpfsGateway(ipfsUrl) {
  // https://cloudflare-ipfs.com/ipfs/bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e
  // to
  // https://bafkreid67qrfaq2yqacnsvpvfnetjocgy7kiuwu4jw4v23tc3yqgfgis2e.ipfs.nftstorage.link/
  if (ipfsUrl && ipfsUrl.includes('cloudflare-ipfs')) {
    const cid = ipfsUrl.replace('https://cloudflare-ipfs.com/ipfs/', '');
    return `https://${cid}.ipfs.nftstorage.link`;
  }
  return ipfsUrl;
}

// https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
export function removeEmpty(obj) {
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(
    Object.entries(obj || {}).filter(([_, v]) => v != null && v != '')
  );
}

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export function groupBy(data, key) {
  return data.reduce((acc, cur) => {
    acc[cur[key]] = acc[cur[key]] || [];
    // if the key is new, initiate its value to an array, otherwise keep its own array value
    acc[cur[key]].push(cur);
    return acc;
  }, []);
}

export function stringCut(str, len) {
  let _str = '';
  if (str && str.length > len) {
    _str = `${str.substr(0, len)}...`;
  } else {
    _str = str;
  }
  return _str;
}

export function removeItem(array, item) {
  let tempArray = [...array];
  let index = tempArray.indexOf(item);

  if (index >= 0) {
    tempArray.splice(index, 1);
    return tempArray;
  }
  return tempArray;
}
