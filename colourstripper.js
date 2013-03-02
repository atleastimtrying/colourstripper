(function(){
  var arr = [];
  for(var i = 0, l = document.styleSheets.length; i < l; ++i){
    var sheet = document.styleSheets[i];
    for(var j = 0, m = sheet.cssRules.length; j < m; ++j){
      var rule = sheet.cssRules[j];
      arr.push(rule.style.color);
      arr.push(rule.style.backgroundColor);
    }
  } 
  
  var colours = [];
  for(var i = 0, l = arr.length; i < l; ++i){
    colour = arr[i].toString();
    if(this.length){
      if(colours.indexOf(colour) === -1){
        colours.push(colour);
      }
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
    rgbarray = rgbString.split('rgb(')[1].split(')')[0].split(',');
    result = '#';
    for(var i = 0, l = rgbarray.length; i < l; ++i){
      stringValue = rgbarray[i];
      hex =  parseInt(valAsString).toString(16);
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
  palette += "</ul><p id='pandr-value'>Hover a colour!<br>&nbsp;</p></div>"

  
  document.body.innerHTML = palette + document.body.innerHTML;

  // $('li').mouseover(function(){
  //   var bgc = $(this).css('backgroundColor');
  //   $('#pandr-value').html( bgc + getHex(bgc) );
  // });

  var link = document.createElement('link');
  link.setAttribute('href', 'https://raw.github.com/atleastimtrying/colourstripper/master/style.css');
  link.setAttribute('rel', 'stylesheet');
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}());