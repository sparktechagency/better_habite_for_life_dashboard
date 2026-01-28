// Cookie utility functions

export const setCookie = (name, value, days = 7) => {
  if (typeof document === "undefined") return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  // Build cookie string - only add Secure flag if HTTPS
  const isSecure = window.location.protocol === 'https:';
  let cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  if (isSecure) {
    cookieString += ";Secure";
  }
  
  document.cookie = cookieString;
  
  // Verify cookie was set immediately
  const verify = getCookie(name);
  console.log(`Cookie ${name} set:`, verify === value ? "✓" : "✗", "Value:", verify);
};

export const getCookie = (name) => {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

