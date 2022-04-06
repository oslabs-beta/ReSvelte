import './Sidebar.css';

const sidebar = () => {

  return(
    <div>
      <input title="" type="file" value="import file"  id="files" style="display:none">
        <label for="files" id="import">Import Folder Here</label>
      </input>
    </div>
  );
};

export default sidebar;