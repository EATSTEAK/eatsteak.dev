// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "EATSTEAK.DEV";
export const SITE_DESCRIPTION = "Dev blog of EATSTEAK";

type Category = {
  id: string;
  name: string;
  description: string;
  color: {
    light: {
      bg: string;
      text: string;
    }
    dark: {
      bg: string;
      text: string;
    }
  };
};

export const CATEGORIES: { [category: string]: Category } = {
  rust: {
    id: "rust",
    name: "Rust",
    description: "모던한 시스템 프로그래밍 언어",
    color: {
      light: {
        bg: "#ffff00",
        text: "#fff",
      },
      dark: {
        bg: "#ffff00",
        text: "#fff",
      },
    },
  },
};
