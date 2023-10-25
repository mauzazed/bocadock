const isUsername = (str) => {
  // Gunakan ekspresi reguler untuk memeriksa username
  const regex = /^[A-Za-z0-9\-_]+$/;
  return regex.test(str);
}

export { isUsername }