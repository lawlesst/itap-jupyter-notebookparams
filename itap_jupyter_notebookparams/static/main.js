define([
    'base/js/namespace',
    'base/js/events'
  ],
  function(Jupyter, events) {
    const PARAMETERS_MARKER = '# Parameters:';
    var set_parameters = function() {
      const cells = Jupyter.notebook.get_cells();
      var autorun = false;
      const searchParams = new URL(window.location.href).searchParams;
      const datasetId = searchParams.get("id");
      var replaced = false
      if (datasetId) {
        for (var c = 0; c < cells.length; ++c) {
          var cellData = cells[c];
          if (cellData.cell_type === "code") {
            var contents = cellData.get_text();
            var lines = contents.split(/\r?\n/);
            for (l = 0; l < lines.length; l++) {
              const codeLine = lines[l]
              if (codeLine.startsWith("dataset_id")) {
                var newId = "dataset_id = \"" + datasetId + "\"";
                var newContents = contents.replace(codeLine, newId);
                cellData.set_text(newContents);
                cellData.code_mirror.addLineClass(l, "background", "codehighlighter")
                console.log("notebookparams: replaced " + codeLine + " with " + datasetId);
                replaced = true
                break
              }
            }
          }
          if (replaced != false) {
            break
          }
        }
        // if (cells[c].get_text().startsWith(PARAMETERS_MARKER)) {
        //   var searchParams = new URL(window.location.href).searchParams;
        //   var text = '';
        //   searchParams.forEach(function(value, key) {
        //     if (key == 'autorun') {
        //       autorun = (value == 'true');
        //     } else if (key != 'filepath'){
        //       text += key + ' = ' + value + '\n';
        //     }
        //   });
        //   if (text) {
        //     cells[c].set_text(PARAMETERS_MARKER + '\n' + text);
        //     console.log('notebookparams: setting parameters in cell ' + c);
        //   }
        //   break;
        // }
      }
      if (searchParams.get("autorun") == "true") {
        if (Jupyter.notebook.kernel && Jupyter.notebook.kernel.is_connected()) {
          console.log('notebookparams: kernel connected, autorun');
          Jupyter.notebook.execute_all_cells();
        }
        else {
          console.log('notebookparams: waiting for kernel_ready before autorun');
          events.on('kernel_ready.Kernel', function(event, data) {
            Jupyter.notebook.execute_all_cells();
          });
        }
      }
    };
    // Run on start
    function load_ipython_extension() {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '.codehighlighter { background: yellow; }';
      document.getElementsByTagName('head')[0].appendChild(style);
      set_parameters();
    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});