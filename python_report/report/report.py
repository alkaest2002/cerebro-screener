#!./.venv/bin/python
import sys
import os
import json
import jinja2
from weasyprint import HTML

# set constants
TEMPLATE_FILE = "template.html"
DEFAULT_LANG = "it"
ACCEPTED_LANGS = ("it","en")

# determine report language
user_lang = next(iter(sys.argv[1:]), "it")
lang = user_lang if user_lang in ACCEPTED_LANGS else "it"

# determine data_in path
data_in_path = next(iter(sys.argv[2:]), "../data")

# determine data_out path
data_out_path = next(iter(sys.argv[3:]), "../report_out")

# init jinja
templateLoader = jinja2.FileSystemLoader(searchpath="./")
templateEnv = jinja2.Environment(loader=templateLoader)
template = templateEnv.get_template(f"report.tpl.{lang}.html")

# loop through data files
for index, filename in enumerate(os.listdir(data_in_path),1):
  if not filename.endswith(".json"): 
    continue
  # open JSON file
  with open(os.path.join(data_in_path, filename),"r") as f_in:
    # load json data
    data = json.load(f_in)
    # render report with json data
    rendered_report = template.render(**data)
    # write report
    doc = HTML(string=rendered_report)
    doc.write_pdf(os.path.join(data_out_path, f"report_{index}.pdf"))
   