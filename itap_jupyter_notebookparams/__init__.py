# Jupyter Extension points
def _jupyter_nbextension_paths():
    return [dict(
        section="notebook",
        src="./static",
        dest="itap-jupyter-notebookparams",
        require="itap-jupyter-notebookparams/main")]
