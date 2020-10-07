from setuptools import setup

setup(
    name='itap-jupyter-notebookparams',
    version='0.0.4',
    author='Simon Li',
    author_email='spli@dundee.ac.uk',
    packages=[
        'itap_jupyter_notebookparams',
    ],
    url='https://github.com/lawlesst/jupyter-notebookparams',
    license='MIT',
    package_data={
        'itap_jupyter_notebookparams': ['itap_jupyter_notebookparams/static/main.js'],
    },
    description='Pass URL parameters to a Jupyter notebook',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    install_requires=[
        'notebook',
    ],
    data_files=[(
            'share/jupyter/nbextensions/itap-jupyter-notebookparams', [
                'itap_jupyter_notebookparams/static/main.js'
        ]),
        ('etc/jupyter/nbconfig/notebook.d' , ['itap_jupyter_notebookparams.json'])
    ],
    zip_safe=False,
    include_package_data=True,
)