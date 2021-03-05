A Jupyter notebook plugin for [Constellate](http://tdm-pilot.org)

This plugin was originally based off [Jupyter notebookparams](https://github.com/manics/jupyter-notebookparams).




### Installation

    pip install itap-jupyter-notebookparams

This should automatically enable the extension. If it is not listed in `jupyter nbextension list` install and enable it:

    jupyter nbextension install --py itap-jupyter_notebookparams --sys-prefix
    jupyter nbextension enable --py itap-jupyter_notebookparams --sys-prefix
