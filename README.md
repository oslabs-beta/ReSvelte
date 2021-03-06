<div id='resvelte' align="center">
  <a href="https://github.com/oslabs-beta/ReSvelte" alt='link to ReSvelte GitHub'>
    <img src="https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/RS.png" alt="ReSvelte Logo" width="75%">
  </a>
</div>

<!-- when i copied the image address on github
https://github.com/oslabs-beta/ReSvelte/blob/candie/readme2/assets/smallResvelte.png?raw=true
https://github.com/oslabs-beta/ReSvelte/blob/candie/readme2/assets/RS.png?raw=true
-->

<div align='center'id='name'>
  <h1>ReSvelte</h1>
  A Svelte component tree visualizer and metrics display tool

  <a href='https://github.com/oslabs-beta/ReSvelte/issues'>Report Issues</a>
  <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/smallResvelte.png' alt='small ReSvelte logo' width='14' height='14' >
  <a href='https://github.com/oslabs-beta/ReSvelte/issues'>Request a Feature</a>

</div>

# About ReSvelte

As developers create Svelte applications, the component tree increasingly scales in size. Components are a delicate part of front end frameworks. Efficiently placing and correctly executing components are of high importance.

Having more components re-rendering, will affect the general performance of the application.

ReSvelte solves this issue. It is a performance developer tool that generates a Svelte component tree visualizer and a component rendering metrics display of your Svelte application within a Visual Studio Code extension. 

# Getting Started with Installation and Usage

1. If not already installed, install Visual Studio Code for your respective operating system. <a href='https://code.visualstudio.com/download'>Download Visual Studio Code</a>

2. Search for ReSvelte in the Visual Studio Code Extension MarketPlace and install. 
  <a href='https://marketplace.visualstudio.com/items?itemName=ReSvelte.resvelte'>
  Download ReSvelte Here!
  </a>

3. A ReSvelte icon should appear on your sidebar. You have successfully installed ReSvelte! 

4. Upload your Svelte folder. If there is an error, you will see an error message.  

<img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/ImportingSvelteFile.gif' alt='upload of Svelte document' width="100%">

5. The component tree visualizer should now be populated in the sidebar with the component name. Toggle through the down arrows to expand the tree. 

<img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/OpeningComponent.gif' alt='opening the component tree visualizer' width="100%">

6. Underneath the tree, the app performance shows the total number of components rendered in your application and the number of components that can re-render. An error log will also report any import issues.

<img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/Errorlog.gif' alt='app performance with error log message' width="100%">

## Technology Stack
<div id='technologies'>
  <li>
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/react.png' alt='React logo' width='14' height='14' >
    React with React Hooks
  </li>
  <li>
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/vscode.png' alt='VSCode logo' width='14' height='14' >
    Visual Studio Code Extension API
  </li>
  <li>
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/typescript.png' alt='Typescript logo' width='14' height='14' >
    Typescript
  </li>
  <li>
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/Svelte.png' alt='Svelte logo' width='14' height='14' >
    Svelte
  </li>
  <li>Svelte-Parse</li>
  <li>
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/Webview.png' alt='Webview logo' width='14' height='14' >
    WebView
  </li>
  <li>
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/webpack2.png' alt='Webpack logo' width='14' height='14' >
    Webpack</li>
  <li>
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/Sass.png' alt='Sass/Css logo' width='14' height='14' >
    SCSS/SASS
  </li>
</div>

# Getting Started as a Contributor

1. Clone ReSvelte from GitHub

2. Open the ReSvelte folder in your VS Code IDE. 

3. Run the command: `npm install`

4. Run the command: `npm run build`

5. Run the command: `npm run watch`

6. Press F5. Click "Debug Anyways". This will open the development extension to allow debugging and view the ReSvelte extension. 

7. Click the 'RS' ReSvelte extension button on the left panel

8. Proceed to upload a Svelte folder 

9. Press `command, shift, P` then type into the search bar "Developer: Open Webview Tools" to see the dev tools panel

10. If you make a change to the code, press the green restart button on the original code editor debugging bar. This will restart the development extension. Then repeat steps 7 and 8.

## What to Contribute

ReSvelte is an open source tool. Contributions are what make the open source community such an amazing place to learn, inspire, create, and grow. Any contributions you make are greatly appreciated. Here are some features that could improve this application and build upon the core functionality:

<li>Storing the paths of all files which would allow the user to click on a component and be taken to that file for further editing or confirmation</li>
<li>Adding render time to the performance metrics</li>
<li>Tracking memory usage of an imported application</li>
<li>Adding a link in the component tree to show the hierarchy</li>
<li>Automatically find components in the imported application that aren???t running as expected and draw the user to that area</li>
<li>Implementing a time machine that will allow users to make changes without risking the current state of the application</li>
<li>Live updating of extension</li>

### Suggestions

We would love to hear your technical feedback! If you have suggestions, simply open an issue with the tag "enhancement". 

Don't forget to give this developer tool a star. Thank you for your contribution!

# License
Distributed under the MIT License. See `LICENSE` for more information

# Contributors
<div id='contributors'>
  <li> 
    Hoon Park 
    <a href="https://www.linkedin.com/in/hoonpvrk">LinkedIn</a> 
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/smallResvelte.png' alt='small ReSvelte logo' width='14' height='14' >
    <a href="https://github.com/hoonpvrk">GitHub</a>
  </li>
  <li> 
    Martin Ng 
    <a href="https://www.linkedin.com/in/martinngsf/">LinkedIn</a> 
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/smallResvelte.png' alt='small ReSvelte logo' width='14' height='14' >
    <a href="https://github.com/kamartinng">GitHub</a>
  </li>
  <li>
    Jestyn Apuya 
    <a href="https://www.linkedin.com/in/jestynapuya/">LinkedIn</a> 
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/smallResvelte.png' alt='small ReSvelte logo' width='14' height='14' >
    <a href="https://github.com/JestynA">GitHub</a>
  </li>
  <li>
    Steven Nguyen 
    <a href="https://www.linkedin.com/in/nguyennsteven">LinkedIn</a> 
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/smallResvelte.png' alt='small ReSvelte logo' width='14' height='14' > 
    <a href="https://github.com/Sateeven">GitHub</a>
  </li>
  <li>
    Candie Hill 
    <a href="https://www.linkedin.com/in/candie-hill/">LinkedIn</a> 
    <img src='https://github.com/oslabs-beta/ReSvelte/raw/dev/assets/smallResvelte.png' alt='small ReSvelte logo' width='14' height='14' >
    <a href="https://github.com/can619">GitHub</a>
  </li>
</div>

# Contact Us

Email: <a href="mailto: resvelteadm@gmail.com ">resvelteadm@gmail.com </a>
 
Website: <a href="https://resvelte.com/ ">resvelte.com</a>






