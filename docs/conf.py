# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information
from docutils.nodes import Element, raw
import re

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
    "show_prev_next": False,
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

pygments_style = "xcode"


def process_popover_role(name, rawtext, text, lineno, inliner, options={}, content=[]):
    """Processes the :popover: role to create raw HTML for the popover effect."""
    split_text = re.split(r'(?<=\S)\s*:\s*(?=\S)', text)
    title, content = split_text
    html = f'<span class="popover-html"><button type="button" class="popover-role" data-bs-toggle="popover" ' \
           f'data-bs-custom-class="custom-popover" data-bs-placement="top" data-bs-trigger="focus" ' \
           f'data-bs-title="{title}" ' \
           f'data-bs-content="{content}">{title}</button></span>'
    return [raw('', html, format='html')], []


def setup(app):
    """Set up the Sphinx extension."""
    app.add_role('popover', process_popover_role)
