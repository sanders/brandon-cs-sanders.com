/* This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License as
published by the Free Software Foundation; either version 2 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
USA*/
var ns4 = false;
var op5 = false;
var opy = false;
var agt = false;
var mac = false;
var ie = false;
var mac_ie = false;

function
sniffBrowsers ()
{
  var ns4 = document.layers;
  var op5 = (navigator.userAgent.indexOf ("Opera 5") != -1) || (navigator.userAgent.indexOf ("Opera/5") != -1);
  var op6 = (navigator.userAgent.indexOf ("Opera 6") != -1) || (navigator.userAgent.indexOf ("Opera/6") != -1);
  var agt = navigator.userAgent.toLowerCase ();
  var mac = (agt.indexOf ("mac") != -1);
  var ie = (agt.indexOf ("msie") != -1);
  var mac_ie = mac && ie;
}

function
getStyleObject (objectId)
{
  if (document.getElementById && document.getElementById (objectId)) {
    return document.getElementById (objectId).style;
  } else if (document.all && document.all (objectId)) {
    return document.all (objectId).style;
  } else if (document.layers && document.layers[objectId]) {
    return getObjNN4 (document, objectId);
  } else {
    return false;
  }
}

function
changeObjectVisibility (objectId, newVisibility)
{
  var styleObject = getStyleObject (objectId, document);
  if (styleObject) {
    styleObject.visibility = newVisibility;
    return true;
  } else {
    return false;
  }
}

function
findImage (name, doc)
{
  var i, img;
  for (i = 0; i < doc.images.length; i++) {
    if (doc.images[i].name == name) {
      return doc.images[i];
    }
  }
  for (i = 0; i < doc.layers.length; i++) {
    if ((img = findImage (name, doc.layers[i].document)) != null) {
      img.container = doc.layers[i];
      return img;
    }
  }
  return null;
}

function
getImage (name)
{
  if (document.layers) {
    return findImage (name, document);
  }
  return null;
}

function
getObjNN4 (obj, name)
{
  var x = obj.layers;
  var foundLayer;
  for (var i = 0; i < x.length; i++) {
    if (x[i].id == name) {
      foundLayer = x[i];
    } else if (x[i].layers.length) {
      var tmp = getObjNN4 (x[i], name);
    }
    if (tmp) {
      foundLayer = tmp;
    }
  }
  return foundLayer;
}

function
getElementHeight (Elem)
{
  if (ns4) {
    var elem = getObjNN4 (document, Elem);
    return elem.clip.height;
  } else {
    var elem;
    if (document.getElementById) {
      var elem = document.getElementById (Elem);
    } else if (document.all) {
      var elem = document.all[Elem];
    }
    if (op5) {
      xPos = elem.style.pixelHeight;
    } else {
      xPos = elem.offsetHeight;
    }
    return xPos;
  }
}

function
getElementWidth (Elem)
{
  if (ns4) {
    var elem = getObjNN4 (document, Elem);
    return elem.clip.width;
  } else {
    var elem;
    if (document.getElementById) {
      var elem = document.getElementById (Elem);
    } else if (document.all) {
      var elem = document.all[Elem];
    }
    if (op5) {
      xPos = elem.style.pixelWidth;
    } else {
      xPos = elem.offsetWidth;
    }
    return xPos;
  }
}

function
getElementLeft (Elem)
{
  if (ns4) {
    var elem = getObjNN4 (document, Elem);
    return elem.pageX;
  } else {
    var elem;
    if (document.getElementById) {
      var elem = document.getElementById (Elem);
    } else if (document.all) {
      var elem = document.all[Elem];
    }
    xPos = elem.offsetLeft;
    tempEl = elem.offsetParent;
    while (tempEl != null) {
      xPos += tempEl.offsetLeft;
      tempEl = tempEl.offsetParent;
    }
    return xPos;
  }
}

function
getElementTop (Elem)
{
  if (ns4) {
    var elem = getObjNN4 (document, Elem);
    return elem.pageY;
  } else {
    if (document.getElementById) {
      var elem = document.getElementById (Elem);
    } else if (document.all) {
      var elem = document.all[Elem];
    }
    yPos = elem.offsetTop;
    tempEl = elem.offsetParent;
    while (tempEl != null) {
      yPos += tempEl.offsetTop;
      tempEl = tempEl.offsetParent;
    }
    return yPos;
  }
}

function
getImageLeft (myImage)
{
  var x, obj;
  if (document.layers) {
    var img = getImage (myImage);
    if (img.container != null) {
      return img.container.pageX + img.x;
    } else {
      return img.x;
    }
  } else {
    return getElementLeft (myImage);
  }
  return -1;
}

function
getImageTop (myImage)
{
  var y, obj;
  if (document.layers) {
    var img = getImage (myImage);
    if (img.container != null) {
      return img.container.pageY + img.y;
    } else {
      return img.y;
    }
  } else {
    return getElementTop (myImage);
  }
  return -1;
}

function
getImageWidth (myImage)
{
  var x, obj;
  if (document.layers) {
    var img = getImage (myImage);
    return img.width;
  } else {
    return getElementWidth (myImage);
  }
  return -1;
}

function
getImageHeight (myImage)
{
  var y, obj;
  if (document.layers) {
    var img = getImage (myImage);
    return img.height;
  } else {
    return getElementHeight (myImage);
  }
  return -1;
}

function
moveXY (myObject, x, y)
{
  obj = getStyleObject (myObject);
  if (ns4) {
    obj.top = y;
    obj.left = x;
  } else {
    if (op5) {
      obj.pixelTop = y;
      obj.pixelLeft = x;
    } else {
      obj.top = y + 'px';
      obj.left = x + 'px';
    }
  }
}

function
changeClass (Elem, myClass)
{
  var elem;
  if (document.getElementById) {
    var elem = document.getElementById (Elem);
  } else if (document.all) {
    var elem = document.all[Elem];
  }
  elem.className = myClass;
}

function
changeImage (target, source)
{
  var imageObj;
  if (ns4) {
    imageObj = getImage (target);
    if (imageObj)
      imageObj.src = eval (source).src;
  } else {
    imageObj = eval ('document.images.' + target);
    if (imageObj)
      imageObj.src = eval (source).src;
  }
}

function
changeBGColour (myObject, colour)
{
  if (ns4) {
    var obj = getObjNN4 (document, myObject);
    obj.bgColor = colour;
  } else {
    var obj = getStyleObject (myObject);
    if (op5) {
      obj.background = colour;
    } else {
      obj.backgroundColor = colour;
    }
  }
}

function
addEvent (obj, evType, fn, useCapt)
{
  if (obj.addEventListener) {
    obj.addEventListener (evType, fn, useCapt);
    return true;
  } else if (obj.attachEvent) {
    var r = obj.attachEvent ("on" + evType, fn);
    return r;
  } else {
    return false;
  }
}

function
max (a, b)
{
  return (a > b) ? a : b;
}

function
min (a, b)
{
  return (a < b) ? a : b;
}

var allpalettes = new Array ();
function
ToolPalette (p, classNm, trigElem, trigHref)
{
  var self = this;
  allpalettes.push (this);
  this.m_div = document.createElement ('div');
  this.isShowing = false;
  this.m_trigId = classNm + '-' + Math.random ();
  this.m_div.className = classNm;
  function schedclose ()
  {
    var oldtm = self.timeout;
    self.timeout = setTimeout (function () {
			       self.close ();}
			       , 600);
    clearTimeout (oldtm);
  }
  function clearclose ()
  {
    clearTimeout (self.timeout);
  }
  this.m_div.onmouseover = function () {
    clearclose ();
    self.open ();
    return false;
  };
  this.m_div.onmouseout = function () {
    schedclose ();
    return false;
  };
  var x = document.createElement ('a');
  x.onclick = function () {
    self.toggle ();
    return false;
  };
  x.onmouseover = function () {
    clearclose ();
    self.open ();
    return false;
  };
  x.onmouseout = function () {
    schedclose ();
    return false;
  };
  x.setAttribute ('id', this.m_trigId);
  x.setAttribute ('href', trigHref);
  x.appendChild (trigElem);
  p.appendChild (this.m_div);
  p.appendChild (x);
  addEvent (window, 'resize', function () {
	    if (self.isShowing) {
	    self.open ();
	    }
  }, false);
  this.add = function (element, fxn, href) {
    var a = document.createElement ('a');
    a.appendChild (element);
    a.onclick = function () {
      fxn ();
      return false;
    };
    a.setAttribute ('href', href);
    self.m_div.appendChild (a);
  };
  this.moveDiv = function (x, y, w, h, vis) {
    self.m_div.style.top = y + 'px';
    self.m_div.style.left = x + 'px';
    self.m_div.style.width = w + 'px';
    self.m_div.style.height = h + 'px';
    self.m_div.style.visibility = vis;
  }
  this.showdiv = function () {
    for (var i in allpalettes) {
      var tp = allpalettes[i];
      if (tp != self) {
	tp.close ();
      }
    }
    self.moveDiv (max (100, getElementLeft (self.m_trigId) - 110), getElementTop (self.m_trigId) - 110, 126, 100, "visible");
  };
  this.hidediv = function () {
    self.moveDiv (-1000, -1000, 0, 0, "hidden");
  };
  this.open = function () {
    self.showdiv ();
    self.isShowing = true;
  };
  this.close = function () {
    self.hidediv ();
    self.isShowing = false;
  };
  this.toggle = function () {
    if (self.isShowing) {
      self.hidediv ();
    } else {
      self.showdiv ();
      self.isShowing = !self.isShowing;
    }
  };
}

function
toRadix (N, radix)
{
  var HexN = "", Q = Math.floor (Math.abs (N)), R;
  while (true) {
    R = Q % radix;
    HexN = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*-".charAt (R) + HexN;
    Q = (Q - R) / radix;
    if (Q == 0) {
      break;
    }
  }
  return ((N < 0) ? "-" + HexN : HexN);
}

function
loadXMLDoc (url, handler)
{
  var req = null;
  var cbk = handler;
  var nullarg = true;
  function intrnlhndlr ()
  {
    if (req.readyState == 4) {
      if (req.status == 200) {
	if (cbk) {
	  cbk (req);
	} else {
	  alert ('no callback defined');
	}
      } else {
	alert ('There was a problem fetching data:\n' + req.statusText);
      }
    }
  }
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest ();
  } else if (window.ActiveXObject) {
    req = new ActiveXObject ("Microsoft.XMLHTTP");
    nullarg = false;
  }
  if (req) {
    req.onreadystatechange = intrnlhndlr;
    req.open ("GET", url, true);
    if (nullarg) {
      req.send (null);
    } else {
      req.send ();
    }
  }
}

function
scd ()
{
  c = document.getElementById ("chatroom");
  c.scrollTop = c.scrollHeight - c.clientHeight;
}

//@bug:not threadsafe
function
FibBackoff (min, max)
{
  this.f1 = 1000;
  this.f2 = 1000;
  this.cur = min;
  this.min = min;
  this.max = max;
  this.reset = function () {
    this.f1 = 1000;
    this.f2 = 1000;
    this.cur = this.min;
  };
  this.backoff = function () {
    if (this.cur < this.max) {
      this.cur += this.f1;
      var f2 = this.f1 + this.f2;
      this.f1 = this.f2;
      this.f2 = f2;
    }
    if (this.cur >= this.max) {
      return this.max;
    } else {
      return this.cur;
    }
  };
}

var bckff = new FibBackoff (7000, 30000);
var lastcolor;
var timeouthandle;
var waiting = false;
var newmsgs = 0;
var idletime = 0;
var idleinterval;
var nick;
var colorselect;
var roompart = '';

function
tsdom (time)
{
  s = document.createElement ('span');
  s.className = ('tstamp');
  s.appendChild (document.createTextNode (time));
  return s;
}

function
markmeaway ()
{
  var nickpart = '&n=' + encodeURIComponent (nick);
  f = document.inputform;
  if (f.sendas && f.sendas[0].checked) {
    nickpart = '';
  }
  loadXMLDoc (URL_BASE + 'x?a' + nickpart + roompart, function () {
	      }
  );
}

function
markmeback ()
{
  var nickpart = '&n=' + encodeURIComponent (nick);
  f = document.inputform;
  if (f.sendas && f.sendas[0].checked) {
    nickpart = '';
  }
  loadXMLDoc (URL_BASE + 'x?b' + nickpart + roompart, function () {
	      }
  );
}

function
nexttimeout ()
{
  if (idletime <= IDLEINHEADER) {
    return bckff.backoff ();
  } else {
    return 1000 * min (idletime / 4, 3600);
  }
}

function
poll ()
{
  if (waiting) {
    bckff.reset ();
  } else {
    waiting = true;
    s = document.getElementById ("loading");
    s.className = 'visible';
    var nickpart = '&n=' + encodeURIComponent (nick);
    f = document.inputform;
    if (f.sendas && f.sendas[0].checked) {
      nickpart = '';
    }
    var idlepart = '';
    if (idletime >= IDLEINHEADER) {
      idlepart = '&i';
    }
    loadXMLDoc (URL_BASE + 'x?d=' + timestamp + idlepart + roompart + nickpart, handle);
  }
  timeouthandle = setTimeout ("poll()", nextt = nexttimeout ());
}

function
repollnow ()
{
  setTimeout (function () {
	      bckff.reset (); clearTimeout (timeouthandle); timeouthandle = setTimeout (poll, 0);}
	      , 0);
}

function
retargetLinks ()
{
  var links = document.getElementById ("chatroom").getElementsByTagName ("a");
  for (var i = 0; i < links.length; ++i) {
    links[i].setAttribute ('rel', 'external');
    links[i].setAttribute ('target', '_blank');
  }
}

function
color_part (value)
{
  var digits = value.toString (16);
  if (this < 16) {
    return '0' + digits;
  }
  return digits;
}

function
fade (elem)
{
  if (!elem)
    return;
  var current = 219;
  var e = elem;
    var fxn = function (){ if (current >= 255)
      return;
    current += 6;
    e.style.backgroundColor = "#" + color_part (current) + "ff" + color_part (current);
    setTimeout (fxn, 200);
  }
  fxn ();
}

function
addmsg (time, uname, nick, isact, msg)
{
  p = document.createElement ('p');
  p.className = (isact ? 'action' : 'msg');
  p.appendChild (tsdom (time));
  p.appendChild (document.createTextNode (' '));
  s = document.createElement ('span');
  s.className = (uname.length != 0 ? 'uname' : 'nick');
  s.appendChild (document.createTextNode ((uname.length != 0 ? uname : (nick ? nick : UNK_NICK)) + (isact ? '' : ':')));
  p.appendChild (s);
  p.appendChild (document.createTextNode (' '));
  s = document.createElement ('span');
  s.className = 'msgtxt';
  s.innerHTML = smileys (msg);
  p.appendChild (s);
  document.getElementById ("chatroom").appendChild (p);
  retargetLinks ();
  scd ();
  bckff.reset ();
  fade (p);
}

function
addsysmsg (msg)
{
  p = document.createElement ('p');
  p.className = 'announce';
  p.appendChild (document.createTextNode (msg));
  document.getElementById ("chatroom").appendChild (p);
  scd ();
  bckff.reset ();
}

function
chatterstatus (cmd, time, uid, uname, nick, geocode)
{
  var verb;
  switch (cmd) {
  case 'i':
    verb = 'is away';
    break;
  case 'b':
    verb = 'is back';
    break;
  case 'v':
    verb = 'left';
    break;
  }
  addsysmsg (uname + nick + ' ' + verb + ' at ' + time);
  ul = document.getElementById ("userlist");
  kids = ul.getElementsByTagName ('span');
  var isguest = (uname.length == 0);
  for (var i = 0; i < kids.length; ++i) {
    if (kids[i].lastChild.firstChild.data == (isguest ? nick : uname) && kids[i].className.charAt (0) == (isguest ? "g" : "u")) {
      switch (cmd) {
      case 'i':
	kids[i].className = isguest ? 'gaway' : 'uaway';
	break;
      case 'b':
	kids[i].className = isguest ? 'ghere' : 'uhere';
	break;
      case 'v':
	ul.removeChild (kids[i]);
      }
    }
  }
}

function
addchatter (time, uid, uname, nick, geocode)
{
  addsysmsg (uname + nick + ' joined at ' + time);
  ul = document.getElementById ("userlist");
  kids = ul.getElementsByTagName ('span');
  var isguest = (uname.length == 0);
  for (var i = 0; i < kids.length; ++i) {
    if (kids[i].lastChild.firstChild.data == (isguest ? nick : uname) && kids[i].className.charAt (0) == (isguest ? "g" : "u")) {
      kids[i].className = isguest ? 'ghere' : 'uhere';
      return;
    }
  }
  var a = document.createElement ('a');
  var m = document.createElement ('img');
  m.setAttribute ('border', '0');
  m.setAttribute ('src', '/i/flag/' + geocode + '.gif');
  m.className = 'flag';
  a.setAttribute ('target', '_blank');
  if (G2P[geocode]) {
    a.setAttribute ('href', '/guide/viewplace?placeword=' + G2P[geocode] + '&lang=' + LANG);
  }
  s = document.createElement ('span');
  s.className = isguest ? 'ghere' : 'uhere';
  a.appendChild (m);
  s.appendChild (a);
  a = document.createElement ('a');
//a.className=isguest?'ghere':'uhere';
  if (!isguest) {
    a.setAttribute ('target', '_blank');
    a.setAttribute ('href', '/users/' + uname + '?lang=' + LANG);
  }
  a.appendChild (document.createTextNode (isguest ? nick : uname));
  s.appendChild (a);
  ul.appendChild (s);
}

var timestamp = '';
function
doctitle ()
{
  document.title = (newmsgs > 0 ? "**(" + newmsgs + ") - " : "") + "Chat" + (idletime >= IDLEINHEADER ? " (IDLE)" : "") + " - Treehouse Cityguide";
}

function
settimestamp (t)
{
  timestamp = t;
}

function
setnick (n)
{
  if (!n || n.length <= 0) {
    n = UNK_NICK;
    document.inputform.nick.value = n;
  }
  nick = n;
}

function
handle (req)
{
  resp = req.responseXML.documentElement;
  if (resp) {
    m = resp.childNodes;
    if (m) {
      for (var i = 0; i < m.length; ++i) {
	switch (m[i].nodeName) {
	case 'n':
	case 'a':
	  newmsgs++;
	  doctitle ();
	  array = m[i].firstChild.data.split ('|');
	  addmsg (array[0], array[1], array[2], m[i].nodeName == 'a', array[3]);
	  break;
	case 'd':
	  if (m[i].firstChild.data > timestamp) {
	    settimestamp (m[i].firstChild.data);
	  }
	  break;
	case 'u':
	  a = m[i].firstChild.data.split ('|');
	  addchatter (a[0], '', a[1], a[2], a[4]);
	  break;
	case 'v':
	case 'i':
	case 'b':
	  a = m[i].firstChild.data.split ('|');
	  chatterstatus (m[i].nodeName, a[0], '', a[1], a[2]);
	  break;
	}
      }
    }
  }
  s = document.getElementById ("loading");
  if (s) {
    s.className = 'hidden';
  }
  waiting = false;
}

var lastpreview = '';
var schedupdate = null;
function
up_preview (doc)
{
  var t = doc.getElementById ("text").value;
  var c = lastcolor;
  if (c && c.length != 0) {
    if (t.indexOf (ACTION_PREFIX) == 0) {
      t = ACTION_PREFIX + '<font color="' + c + '">' + t.substring (ACTION_PREFIX.length);
    } else {
      t = '<font color="' + c + '">' + t;
    }
  }
  if (t == lastpreview) {
    return;
  }
  lastpreview = t;
  doc.getElementById ("preview").innerHTML = smileys (t);
}

function
updatepreview (doc)
{
  if (!schedupdate) {
    schedupdate = setTimeout (function () {
			      schedupdate = null; up_preview (doc)}
			      , 100);
  }
}

function
clearinput ()
{
  updatepreview (document);
  t = document.inputform.text;
  t.blur ();
  t.value = '';
  t.focus ();
}

function
chat ()
{
  f = document.inputform;
  m = f.text.value;
  var c = lastcolor;
  if (c && c.length != 0) {
    if (m.indexOf (ACTION_PREFIX) == 0) {
      m = ACTION_PREFIX + '<font color="' + c + '">' + m.substring (ACTION_PREFIX.length);
    } else {
      m = '<font color="' + c + '">' + m;
    }
  }
  var nickpart = 'n=' + encodeURIComponent (nick) + '&';
  if (f.sendas && f.sendas[0].checked) {
    nickpart = '';
  }
  var rp = roompart;
  if (rp.length > 0) {
    rp = rp.substring (1) + '&';
  }
  loadXMLDoc (URL_BASE + 'x?' + nickpart + rp + 't=' + encodeURIComponent (m), repollnow);
  clearinput ();
  return false;
}

function
idleCounter ()
{
  idletime++;
  if (idleinterval) {
    if (idletime == IDLEINHEADER) {
      doctitle ();
      markmeaway ();
    }
  } else {
    idleinterval = window.setInterval ("idleCounter()", 1000);
  }
}

function
idleReset ()
{
  var oldidle = idletime;
  idletime = 0;
  if (oldidle >= IDLEINHEADER) {
    doctitle ();
    markmeback ();
    repollnow ();
  }
}

function
newmsgclear ()
{
  idleReset ();
  if (newmsgs != 0) {
    newmsgs = 0;
    doctitle ();
  }
}

function
setSelectionRange (i, b, e)
{
  if (i.setSelectionRange) {
    i.focus ();
    i.setSelectionRange (b, e);
  } else if (i.createTextRange) {
    var r = i.createTextRange ();
    r.collapse (true);
    r.moveEnd ('character', e);
    r.moveStart ('character', b);
    r.select ();
  }
}

function
addtext (txt)
{
  i = document.getElementById ('text');
  i.value += txt;
  setSelectionRange (i, i.value.length, i.value.length);
  i.focus ();
  updatepreview (document);
}

function
markup (tag)
{
  var verb, url, title, open, close;
  switch (tag) {
  case 'a':
    verb = LINKINSTR;
    url = prompt (LINKPROMPT, 'http://');
    if (url == = null || url == = '' || url == = 'http://') {
      return false;
    }
    if (url.indexOf ('http://') == = -1) {
      url = 'http://' + url;
    }
    open = '<a target="_blank" rel="external" href="' + url + '">';
    close = '</a>';
    break;
  case 'b':
    verb = BOLDINSTR;
    open = '<strong>';
    close = '</strong>';
    break;
  case 'i':
    verb = ITALINSTR;
    open = '<em>';
    close = '</em>';
    break;
  default:
    return;
  }
  txt = prompt (verb + ':', '');
  if (txt == = null || txt == = '') {
    return;
  }
  addtext (open + txt + close + ' ');
}

function
htmlButton (value, className, tag)
{
  var b = document.createElement ('input');
  b.setAttribute ('type', 'button');
  b.className = className;
  b.setAttribute ('value', value);
  b.onclick = function () {
    markup (tag);
  };
  return b;
}

function
createHTMLButtons ()
{
  b = document.getElementById ("buttons");
  s = document.createElement ('img');
  s.className = 'smileytrigger';
  s.setAttribute ('border', '0');
  s.setAttribute ('src', '/i/m_smile.gif');
  var sp = new ToolPalette (b, 'smileydiv', s, '#');
  function addsmiley (t, s)
  {
    var i = document.createElement ('img');
    i.setAttribute ('border', '0');
    i.setAttribute ('src', s);
    i.style.padding = '2px';
    sp.add (i, function () {
	    addtext (t);}
	    , "javascript:addtext('" + t + "')");
  }
  addsmiley ('=)', '/i/m_smile.gif');
  addsmiley ('=(', '/i/m_frown.gif');
  addsmiley ('=P', '/i/m_tongueout.gif');
  addsmiley ('=D', '/i/m_laughing.gif');
  addsmiley (';)', '/i/m_wink.gif');
  addsmiley ('=o', '/i/m_surprised.gif');
  addsmiley (':shock:', '/i/i_shocked.gif');
  addsmiley (':foot:', '/i/m_foot.gif');
  addsmiley (':msealed:', '/i/m_sealed.gif');
  addsmiley (':!:', '/i/m_exclaim.gif');
  addsmiley ('=$', '/i/m_moneyinmouth.gif');
  addsmiley (':oops:', '/i/m_embarassed.gif');
  addsmiley (':sealed:', '/i/i_sealed.gif');
  addsmiley ('=S', '/i/i_unsure.gif');
  addsmiley ('=/', '/i/m_undecided.gif');
  addsmiley ('=*', '/i/m_kiss.gif');
  addsmiley ('O=.', '/i/m_innocent.gif');
  addsmiley ('B)', '/i/m_cool.gif');
  addsmiley ('=~(', '/i/m_cry.gif');
  addsmiley ('=X', '/i/i_barf.gif');
  addsmiley ('X(', '/i/m_yell.gif');
  addsmiley (':love:', '/i/i_love.gif');
  addsmiley (':penguin:', '/i/i_penguin.gif');
  addsmiley (':lol:', '/i/s_lol.gif');
  addsmiley (':mrgreen:', '/i/s_mrgreen.gif');
  addsmiley (':redface:', '/i/s_redface.gif');
  addsmiley (':cry:', '/i/s_cry.gif');
  addsmiley (':roll:', '/i/s_rolleyes.gif');
  addsmiley (':evil:', '/i/s_evil.gif');
  addsmiley (':idea:', '/i/s_idea.gif');
  addsmiley (':twisted:', '/i/s_twisted.gif');
  addsmiley (':?:', '/i/s_question.gif');
  addsmiley (':|', '/i/s_neutral.gif');
  addsmiley (':arrow:', '/i/s_arrow.gif');
  addsmiley ('#-o', '/i/doh.gif');
  addsmiley ('=D)', '/i/g_welldone.gif');
  addsmiley (':doh:', '/i/homer_doh.gif');
  addsmiley ('=))', '/i/g_lol.gif');
  b.appendChild (htmlButton (LINKBUTTON, 'button', 'a'));
  b.appendChild (htmlButton (BOLDBUTTON, 'button', 'b'));
  b.appendChild (htmlButton (ITALBUTTON, 'button', 'i'));
  s = document.createElement ('img');
  s.className = 'colortrigger';
  s.setAttribute ('border', '0');
  s.setAttribute ('src', '/i/textcolor.gif');
  var sp = new ToolPalette (b, 'smileydiv', s, '#');
  function addcolor (c)
  {
    var i = document.createElement ('button');
    i.className = 'colorpatch';
    i.style.background = c;
    sp.add (i, function () {
	    addtext ('<font color="' + c + '">'); lastcolor = c;}
	    , '#');
  }
  for (var i = 0; i < COLORS.length; ++i) {
    addcolor (COLORS[i]);
  }
}

function
pgsetup ()
{
  document.getElementById ("chatroom").className = "chatroomjs";
  c = document.getElementById ("container");
  if (c) {
    c.className = "containerjs";
  }
  document.getElementById ("rightbar").className = "rightbarjs";
  c = document.getElementById ("expanding");
  if (c) {
    c.className = "expandingjs";
  }
  pb = document.getElementById ("previewbox");
  pb.className = "previewboxjs";
  s = document.createElement ("span");
  s.className = "previewtitle";
  s.appendChild (document.createTextNode (PREVIEW));
  pb.appendChild (s);
  s = document.createElement ("span");
  s.setAttribute ('id', "preview");
  pb.appendChild (s);
  t = document.getElementById ("text");
  t.setAttribute ("autocomplete", "off");
  t.onkeyup = function () {
    updatepreview (document);
  };
  var f = document.getElementById ("inputform");
  f.className = "inputjs";
  createHTMLButtons ();
  f.onsubmit = function () {
    chat ();
    return false;
  };
  retargetLinks ();
}

function
grabroomname ()
{
  var u = window.location.toString ();
  var i = u.indexOf ('?');
  if (i == -1) {
    return;
  }
  u = u.substring (i + 1);
  u = u.split ('&');
  for (i = u.length - 1; i >= 0; --i) {
    if (u[i].indexOf ('r=') == 0) {
      roompart = '&r=' + u[i].substring (2);
      return;
    }
  }
}

function
ci ()
{
  sniffBrowsers ();
  setnick (document.inputform.nick.value);
  grabroomname ();
  pgsetup ();
  document.onmousemove = document.onkeypress = newmsgclear;
  idleCounter ();
  addEvent (window, 'resize', scd, false);
  scd ();
  clearinput ();
  poll ();
}
