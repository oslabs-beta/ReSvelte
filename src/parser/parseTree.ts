import getAliases from "./getAliases";


const parseTree = (root, svelteFiles, setTotalComponents, setTotalRerendering) => {

  // Get total components and total rerendering components

  // Root file will be passed in and we will parse every file 
    // looking for SvelteDynamicContent for rerendering components
    // total components

    let rerendering = 0;
    let total = 0;
    const rerenderingComponents = [];
    
    // svelteFiles = [{filename: app.svelte, children: []}, {filename: b.svelte, children: []}]
    // aliases =         {B(tagName): b.svelte}

    const parseFile  = (file, parentAliases = {}) => {
      let isRendering = false;
      let aliases = parentAliases;

      

      console.log('inside new file:', file)
      console.log('new file aliases:', aliases)
      if(file.children){
        for (let i = 0; i < file.children.length; i++) {
        console.log('ParseFile:', file.children[i])

        if (file.children[i].type !== "svelteComponent" && file.children[i].type !== "svelteElement" && file.children[i].type !== 'svelteScript' && file.children[i].type !== 'svelteDynamicContent'  && file.children[i].type !== 'svelteBranchingBlock') {
          console.log('Filtered out file: ', file.children[i]);
          continue;
        }

        if(file.children[i].type === 'svelteScript'){
          aliases = getAliases(file.children[i]);
          if(aliases === undefined){
            aliases = parentAliases;
          } 

          continue;
        }
        else if (file.children[i].type === 'svelteDynamicContent' || file.children[i].type === 'svelteBranchingBlock') {
          
          isRendering = true;
        }
        else if (file.children[i].type === 'svelteComponent') {
          for (let j = 0 ; j < svelteFiles.length; j++) {
            if (svelteFiles[j].fileName === aliases[file.children[i].tagName]) {
              parseFile(svelteFiles[j], aliases)
            }
          }
          total ++;
        }

        file.children[i].parent = file;
        parseFile(file.children[i], aliases)
      }

      if(isRendering){
        console.log('added to TOTAL RERENDERING:', file.parent)
        let currParent = file.parent;
        // while(currParent.type !== 'svelteComponent'){
        //   currParent = currParent.parent
        // }
        rerenderingComponents.push(currParent)
        rerendering ++;
      }
      }

    };



    // rerendering: 6
    // total: 10

    console.log('starting parse');
    parseFile(root);

    console.log('Total components:', total);
    console.log('Total rerendering:', rerendering);
    console.log('Rerendering Components:', rerenderingComponents)
    setTotalComponents(total);
    setTotalRerendering(rerendering);

};

module.exports = parseTree