define([
    'base/js/namespace',
    'base/js/events'
    ], function(Jupyter, events) {

      // Adds a cell above current cell (will be top if no cells)
      var add_cell = function() {
        //  cell = Jupyter.notebook.get_cell(0);
        //if (cell.metadata['autogenerated']) {



        var searchParams = new URL(window.location.href).searchParams;
        var text='';
        var autorun = false;
        searchParams.forEach(function(value, key) {
          if (key == 'autorun') {
            autorun = (value == 'true');
          } else if (key != 'filepath'){
            text += key + ' = ' + value + '\n';
          }
        });

        if (text != '') {

          if (Jupyter.notebook.get_cells().length >= 1){
            Jupyter.notebook.delete_cell(0);
          }

          text = '# Parameters: \n' + text;
          cell = Jupyter.notebook.insert_cell_above('code')
          // Define default cell here
          cell.set_text(text.substring(0, text.length - 1));
          //Jupyter.notebook.select_prev();
          //Jupyter.notebook.execute_cell_and_select_below();
          //cell.metadata['autogenerated'] = true;

        }
        if (autorun){
          Jupyter.notebook.restart_run_all();
        }
      };
      // Button to add default cell
      var defaultCellButton = function () {
          Jupyter.toolbar.add_buttons_group([
              Jupyter.keyboard_manager.actions.register ({
                  'help': 'Add default cell',
                  'icon' : 'fa-play-circle',
                  'handler': add_cell
              }, 'add-default-cell', 'Default cell')
          ])
      }
    // Run on start
    function load_ipython_extension() {
        // Add a default cell if there are no cells
        //if (Jupyter.notebook.get_cells().length===1){
        add_cell();
        //}
        defaultCellButton();
    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});