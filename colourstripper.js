(function(){
  var getHex = function(colourString){
    var result = '';
    if(colourString.indexOf('rgb') !== -1){
      result = '<br>' + rgbToHex(colourString);
    }else{
      result = '<br>&nbsp;';
    }
    return result;
  };
  var arrEach = function(arr, fn){
    for(var i = 0, l = arr.length; i < l; ++i){
      fn(arr[i]);
    }
  };
  var addCSS = function(){
    var link = document.createElement('link');
    link.setAttribute('href', 'http://atleastimtrying.github.com/colourstripper/style.css');
    link.setAttribute('rel', 'stylesheet');
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
  };

  var rgbToHex = function(rgbString){
    var rgbarray = rgbString.split('rgb(')[1].split(')')[0].split(',');
    var result = '#';
    arrEach( rgbarray, function(element){
      var hex =  parseInt(element).toString(16);
      if(hex.length === 1){
        result += '0';
      }
      result += hex;
    });
    return result;
  };
  var arr = [];
  var colours = [];
  
  arrEach(document.styleSheets, function(sheet){
    if(sheet.cssRules){
      arrEach(sheet.cssRules, function(rule){
        arr.push(rule.style.color);
        arr.push(rule.style.backgroundColor);
      });
    }
  });
  arrEach(arr, function(color){
    colour = color.toString();
    if(colour.length && colours.indexOf(colour) === -1){
      colours.push(colour);
    }
  });

  var palette = "<div class='pandr-colourstripper'><a id='close' href='#'>X</a><ul style='list-style:none;'>";
  var colours = colours.sort();
  arrEach(colours, function(colour){
    palette += "<li style='background:" + colour + ";'></li>";
  });
  palette += "</ul><p id='pandr-value'>Hover a colour!<br>&nbsp;</p></div>";
  
  document.body.innerHTML = palette + document.body.innerHTML;

  var lis = document.querySelectorAll('.pandr-colourstripper li');
  if(lis){
    arrEach(lis, function(li){
      li.onmouseover = function(){
        var colour = this.style.backgroundColor;
        if(colour){
          document.querySelector('#pandr-value').innerHTML = colour + getHex(colour);
        }
      };
    });
  }
  addCSS();


  var closeButton = document.getElementById('close');
  closeButton.onclick = function(e){ 
    document.querySelector('.pandr-colourstripper').remove();
  };
}());