(function(){
  var arr = [];
  for(var i = 0, l = document.styleSheets.length; i < l; ++i){
    var sheet = document.styleSheets[i];
    if(sheet.cssRules){
      for(var j = 0, m = sheet.cssRules.length; j < m; ++j){
        var rule = sheet.cssRules[j];
        arr.push(rule.style.color);
        arr.push(rule.style.backgroundColor);
      }
    }
  } 
  
  var colours = [];
  for(var i = 0, l = arr.length; i < l; ++i){
    colour = arr[i].toString();
    if(colour.length && colours.indexOf(colour) === -1){
      colours.push(colour);
    }
  }

  var getHex = function(colourString){
    var result = '';
    if(colourString.indexOf('rgba') !== 0){
      result = '<br>' + rgbToHex(colourString);
    }else{
      result = '<br>&nbsp;';
    }
    return result;
  };

  var rgbToHex = function(rgbString){
    var rgbarray = rgbString.split('rgb(')[1].split(')')[0].split(',');
    var result = '#';
    for(var i = 0, l = rgbarray.length; i < l; ++i){
      var stringValue = rgbarray[i];
      var hex =  parseInt(stringValue).toString(16);
      if(hex.length === 1){
        result += '0';
      }
      result += hex;
    }
    return result;
  };

  var palette = "<div class='pandr-colourstripper'><ul style='list-style:none;'>";
  var colours = colours.sort();
  for(var i = 0, l = colours.length; i < l; ++i){
    palette += "<li style='background:" + colours[i] + ";'></li>";
  }
  palette += "</ul><p id='pandr-value'>Hover a colour!<br>&nbsp;</p></div>";

  
  document.body.innerHTML = palette + document.body.innerHTML;

  var lis = document.querySelectorAll('.pandr-colourstripper li');
  if(lis){
    for(var i = 0, l = lis.length; i < l; ++i){
      lis[i].onmouseover = function(){
        debugger;
        var colour = this.style.backgroundColor;
        if(colour){
          document.querySelector('#pandr-value').innerHTML = colour + getHex(colour);
        }
      };
    }
  }

  var link = document.createElement('link');
  link.setAttribute('href', 'http://atleastimtrying.github.com/colourstripper/style.css');
  link.setAttribute('rel', 'stylesheet');
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}());