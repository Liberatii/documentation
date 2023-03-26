# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "Liberatii Gateway"
copyright = "2023 Liberatii. All rights reserved"
author = "Liberatii"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ["sphinx_copybutton", "sphinx_togglebutton", "sphinx_design"]

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_title = "Liberatii Gateway"

html_theme = "pydata_sphinx_theme"
html_theme_options = {
   "logo": {
      # "image_light": "_static/light-theme-logo.svg",
      # "image_dark": "_static/dark-theme-logo.svg",
      "alt_text": "",
      "text": "Liberatii Docs"
   },
   "navbar_center": ["search-field"],
   "navbar_end": ["company-nav"],
   "navbar_persistent": [],
   "navigation_depth": 3,
   "navigation_with_keys": False,
   "search_bar_text": "Search docs...",
   "footer_start": ["version", "copyright"],
   "footer_end": ["footer-end"],
}
html_context = {
   "default_mode": "light"
}
html_sidebars = {
    "**": ["sidebar-nav-bs"]
}
html_favicon = "_static/dark-theme-logo.svg"
html_logo = "_static/light-theme-logo.svg"
html_static_path = ["_static"]
html_css_files = ["css/custom.css"]
html_show_sourcelink = False

# RST included at the beginning of every source file
rst_prolog = """
.. role:: popover-html(raw)
   :format: html

"""

pygments_style = "xcode"
