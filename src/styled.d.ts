import "styled-components";

import theme from "./theme";

declare module "styled-components" {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}

declare module "ofx-js" {
  export function parse(content: string): any;
}
