const fs = require('fs');
const path = require('path');
const basePath = path.resolve(__dirname + '/../widgets')+'/';

function toDemo(widget){
  const txt = fs.readFileSync(basePath+widget).toString();
  const parts = txt.split('export interface');
  if (parts.length < 2) { return {} }
  var props = {};
  const inter = parts[1].split('@theme')[0].trim().split('\n').map(l => l.trim());
  var line;
  var lineNr = 0;
  var comment = '';
  var defs = [];
  var open = true;
  for (line of inter) {
    if (!lineNr) {lineNr++; continue;}
    lineNr++;
    if (line.trim() === '/**') {open = true;}
    if (!!open && line.substr(0,3) === '/**') {
      comment += line.split('/**')[1].replace(' */','').trim()+' ';
      if (line.indexOf('*/') > 3) { open = false }
      continue;
    }
    if(!!open || line.indexOf('* ') > -1) {
      if (line.indexOf('* ') > -1) { comment += line.split('* ')[1].replace(' */','').trim() + ' '; }
      if (line.indexOf('*/') > 3) {
        open = false
      }
      continue;
    }
    if (line.indexOf('?:') > 1) {
      defs = line.split('?:').map(l => l.trim());
      props[defs[0]] = [comment.trim(), defs[1].trim()];
      comment = ''; defs = [];
    }
  }
  const ps = widget.split('/');
  const demoO = {
    title: ps[ps.length-1],
    parent: '',
    description: '',
    namespace: 0, type: 0, atomic: 0,
    properties: props
  }

  console.log(demoO)
}

var a = [
  'Search/Search.ts',
  'Search/SearchCategory.ts',
  'Search/SearchResult.ts',
  'Search/SearchResults.ts'
];
a.forEach(w => toDemo(w))
