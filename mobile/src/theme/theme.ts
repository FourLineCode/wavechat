import { extendTheme, theme as defaultTheme } from "native-base";

export const theme = extendTheme({
	colors: {
		primary: defaultTheme.colors.rose,
	},
	config: {
		initialColorMode: "dark",
	},
});
