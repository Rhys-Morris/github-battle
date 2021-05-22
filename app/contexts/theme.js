import React from "react";

const ThemeContext = React.createContext();
const { Consumer, Provider } = ThemeContext;

export const ThemeConsumer = Consumer;
export const ThemeProvider = Provider;
export default ThemeContext;
