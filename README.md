# Template for graveyards React Native Project Readme

Welcome to the Template for graveyards React Native project! This repository contains the source code for our mobile application built with React Native.

## Project Overview

[TemplateForGraveyards] is a [template that is used to easy customize app for different kind of graveyards.].

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Template Customization](#template-customization)

## Getting Started

- [Prerequisites]
  Make sure you have the following installed on your machine before running the project:
  Node.js: Download Node.js
  npm (Node Package Manager): npm is included with Node.js.
  React Native CLI: Install globally using npm with the following command:
  npm install -g react-native-cli

### Folder Structure

- [android] Android-specific files and configurations.
- [ios] iOS-specific files and configurations.
- [src] Contains the source code for the React Native application.
- [components] Reusable components used across multiple screens.
- [screens] screens: Individual screens or pages of the application.
- [navigation] Navigation-related files (e.g., React Navigation setup).
- [assets] Static assets such as images, fonts, etc.

### Template Customization

- [changing-colors]
  All the colors used in the application are defined in the constants folder. The names are descriptive in order to know where exactly which color is used.

- [changing-and-adding-images]
  All images and icons are in the assets folder. In the asset folder you can find two subfolders, svg and png. Depending on the image format in question, we add it there. All images are exported to one file called index.js. If you need to add images or change them, you do it all in the index.js folder.

- [adding-fonts]
  If you want to add a new font, you can do it in the fonts folder located in the assets folder.

- [text-customization]
  In the component folder there is a component called Text.js. It is a component that is used for all the text that is in the application. Also, if you want to add anything extra for that text type fontWeight, the new font you want to use, fontSizes, text colors... you do all that inside it. Also, all components are imported into the index.js file, and each component contains certain props that will facilitate easy rebranding of the existing application.

- [changing-content]
  All the existing content is in the languages ​​folder. There we have two sub-folders bos, en. If we want to change the existing text, we can do it in those json files, also if we want to add additional text. Each key is arranged for the corresponding screen like this that navigation within them will not be a problem.
