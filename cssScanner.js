var arr = [];
$(document.styleSheets).each(function(){ 
  $(this.cssRules).each(function(){
    arr.push(this.style.color);
    arr.push(this.style.backgroundColor);
  });
});

var colours = [];
$(arr).each(function(){
  var colour = this.toString();
  if(this.length){
    if($.inArray(colour, colours) === -1){
      colours.push(colour);
    }
  }
});

var getHex = function(bgc){
  var result = '';
  if(bgc.indexOf('rgba') !== 0){
    result = '<br>' + rgbToHex(bgc);
  }else{
    result = '<br>&nbsp;';
  }
  return result;
};

var rgbToHex = function(rgbString){
  rgbarray = rgbString.split('rgb(')[1].split(')')[0].split(',');
  result = '#';
  rgbarray.forEach(function(valAsString){
    hex =  parseInt(valAsString).toString(16);
    if(hex.length === 1){
      result += '0'
    }
    result += hex
  });
  return result;
};

var palette = "<div style='padding:24px; background:rgb(25,20,20); top:0; border-bottom-right-radius:2px;'><ul style='list-style:none;'>";
$(colours).sort().each(function(){
  palette += "<li style='height:44px; width:44px; margin:2px; display:inline-block; vertical-align:top; background:" + this + ";'></li>";
});
palette += "</ul><p class='value' style='margin-bottom:0; color:white; font-family:sans-serif; font-size:16px;'>Hover a colour!<br>&nbsp;</p></div>"

palette = $(palette);
$(palette).prependTo("body");

$('li', palette).mouseover(function(){
  var bgc = $(this).css('backgroundColor');
  $('.value').html( bgc + getHex(bgc) );
});