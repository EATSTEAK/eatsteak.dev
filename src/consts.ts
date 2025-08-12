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
    };
    dark: {
      bg: string;
      text: string;
    };
  };
};

export const CATEGORIES: { [category: string]: Category } = {
  rust: {
    id: "rust",
    name: "Rust",
    description: "모던한 시스템 프로그래밍 언어",
    color: {
      light: {
        bg: "#991b1b",
        text: "#ffffff",
      },
      dark: {
        bg: "#991b1b",
        text: "#ffffff",
      },
    },
  },
  web: {
    id: "web",
    name: "Web",
    description: "웹 UX부터 풀스택 웹 개발까지",
    color: {
      light: {
        bg: "#0e7490",
        text: "#ffffff",
      },
      dark: {
        bg: "#0e7490",
        text: "#ffffff",
      },
    },
  },
  dev: {
    id: "dev",
    name: "Develop",
    description: "전반적인 개발 이야기",
    color: {
      light: {
        bg: "#1D4ED8",
        text: "#ffffff",
      },
      dark: {
        bg: "#1D4ED8",
        text: "#ffffff",
      },
    },
  },
  uncategorized: {
    id: "uncategorized",
    name: "Uncategorized",
    description: "분류 없는 글",
    color: {
      light: {
        bg: "#1F2937",
        text: "#ffffff",
      },
      dark: {
        bg: "#1F2937",
        text: "#ffffff",
      },
    },
  },
};
