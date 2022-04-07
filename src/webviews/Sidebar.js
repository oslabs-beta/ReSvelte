

console.log('hello from Sidebar.js');

const sidebar = () => {
  return(
      `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

			</head>
      <body >
      <div>
      <input title="" type="file" value="import file"  id="files" style="display:none">
        <label for="files" id="import">Import Folder Here</label>
      </input>
    </div>

    <style>
      #import{
        width: 100px;
        height: 20px;
        border: solid 1px black;
        padding: 5px;
        background-color: white;
      }
      
      #import:hover{
        cursor:pointer;
        background-color: white;
        color: black;
        transition: 0.4s;
      }
			</body>


			</html>`
  );
};

export default sidebar;

