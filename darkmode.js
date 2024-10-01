let darkTheme = localStorage.getItem("darkMode");

export default function changeTheme() {
  darkTheme = darkTheme === "disabled" ? "enabled" : "disabled";
  darkTheme === "disabled" ? changeColors(lightMode) : changeColors(darkMode);
  localStorage.setItem("darkMode", darkTheme);
}

const darkMode = {
  BackgroundElements: "#2b3945",
  BodyBackground: "#202c37",
  TextColor: "#fff",
  Placeholder: "#fff",
};

const lightMode = {
  BackgroundElements: "#fff",
  BodyBackground: "#fafafa",
  TextColor: "#111517",
  Placeholder: "#858585",
};

function changeColors(colors) {
  less.modifyVars({
    "@BackgroundElements": colors.BackgroundElements,
    "@BodyBackground": colors.BodyBackground,
    "@TextColor": colors.TextColor,
    "@Placeholder": colors.Placeholder,
  });
}

export function loadTheme() {
  console.log(darkTheme);
  darkTheme === "disabled" ? changeColors(lightMode) : changeColors(darkMode);
}
