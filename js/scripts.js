$("h1").after("<div class=\"row\"><div id=\"cite-margin\"></div><div id=\"cite\"><a id=\"cite-link\" href=\"#\">[cite]</a><div id=\"cite-guide\" class=\"hidden\"></div></div></div><ul id=\"toc\"></ul>");
/*
	TableOfContents Plugin for jQuery (by Doug Neiner)
	
	Version: 0.8
		
	Based on code and concept by Janko Jovanovic 
	  in his article: http://www.jankoatwarpspeed.com/post/2009/08/20/Table-of-contents-using-jQuery.aspx
	
	This plugin is offered under the MIT license.
	(c) 2009 by Doug Neiner, http://dougneiner.com
*/
(function($){$.TableOfContents=function(el,scope,options){var base=this;base.$el=$(el);base.el=el;base.toc="";base.listStyle=null;base.tags=["h1","h2","h3","h4","h5","h6"];base.init=function(){base.options=$.extend({},$.TableOfContents.defaultOptions,options);if(typeof(scope)=="undefined"||scope==null)scope=document.body;base.$scope=$(scope);var $first=base.$scope.find(base.tags.join(', ')).filter(':first');if($first.length!=1)return;base.starting_depth=base.options.startLevel;if(base.options.depth<1)base.options.depth=1;var filtered_tags=base.tags.splice(base.options.startLevel-1,base.options.depth);base.$headings=base.$scope.find(filtered_tags.join(', '));if(base.options.topLinks!==false){var id=$(document.body).attr('id');if(id==""){id=base.options.topBodyId;document.body.id=id};base.topLinkId=id};if(base.$el.is('ul')){base.listStyle='ul'}else if(base.$el.is('ol')){base.listStyle='ol'};base.buildTOC();if(base.options.proportionateSpacing===true&&!base.tieredList()){base.addSpacing()};return base};base.tieredList=function(){return(base.listStyle=='ul'||base.listStyle=='ol')};base.buildTOC=function(){base.current_depth=base.starting_depth;base.$headings.each(function(i,element){var depth=this.nodeName.toLowerCase().substr(1,1);if(i>0||(i==0&&depth!=base.current_depth)){base.changeDepth(depth)};base.toc+=base.formatLink(this,depth,i)+"\n";if(base.options.topLinks!==false)base.addTopLink(this)});base.changeDepth(base.starting_depth,true);if(base.tieredList())base.toc="<li>\n"+base.toc+"</li>\n";base.$el.html(base.toc)};base.addTopLink=function(element){var text=(base.options.topLinks===true?"Top":base.options.topLinks);var $a=$("<a href='#"+base.topLinkId+"' class='"+base.options.topLinkClass+"'></a>").html(text);$(element).append($a)};base.formatLink=function(element,depth,index){var id=element.id;if(id==""){id=base.buildSlug($(element).text());element.id=id};var a="<a href='#"+id+"'";if(!base.tieredList())a+=" class='"+base.depthClass(depth)+"'";a+=">"+base.options.levelText.replace('%',$(element).text())+'</a>';return a};base.changeDepth=function(new_depth,last){if(last!==true)last=false;if(!base.tieredList()){base.current_depth=new_depth;return true};if(new_depth>base.current_depth){var opening_tags=[];for(var i=base.current_depth;i<new_depth;i++){opening_tags.push('<'+base.listStyle+'>'+"\n")};var li="<li>\n";base.toc+=opening_tags.join(li)+li}else if(new_depth<base.current_depth){var closing_tags=[];for(var i=base.current_depth;i>new_depth;i--){closing_tags.push('</'+base.listStyle+'>'+"\n")};base.toc+="</li>\n"+closing_tags.join('</li>'+"\n");if(!last){base.toc+="</li>\n<li>\n"}}else{if(!last){base.toc+="</li>\n<li>\n"}};base.current_depth=new_depth};base.buildSlug=function(text){text=text.toLowerCase().replace(/[^a-z0-9 -]/gi,'').replace(/ /gi,'-');text=text.substr(0,50);return text};base.depthClass=function(depth){return base.options.levelClass.replace('%',(depth-(base.starting_depth-1)))};base.addSpacing=function(){var start=base.$headings.filter(':first').position().top;base.$headings.each(function(i,el){var $a=base.$el.find('a:eq('+i+')');var pos=(($(this).position().top-start)/(base.$scope.height()-start))*base.$el.height();$a.css({position:"absolute",top:pos})})};return base.init()};$.TableOfContents.defaultOptions={startLevel:1,depth:3,levelClass:"toc-depth-%",levelText:"%",topLinks:false,topLinkClass:"toc-top-link",topBodyId:"toc-top",proportionateSpacing:false};$.fn.tableOfContents=function(scope,options){return this.each(function(){var toc=new $.TableOfContents(this,scope,options);delete toc})}})(jQuery);

$(document).ready(function(){
$("#toc").tableOfContents(null,{startLevel:2});
});
$('#cite-link').click(function() {
$('#cite-guide').toggleClass('hidden');
return false;
});

var currentTime = new Date();
var day = currentTime.getDate();
var year = currentTime.getFullYear();
var d=new Date();
var month=new Array();
month[0]="Jan";
month[1]="Feb";
month[2]="Mar";
month[3]="Apr";
month[4]="May";
month[5]="Jun";
month[6]="Jul";
month[7]="Aug";
month[8]="Sep";
month[9]="Oct";
month[10]="Nov";
month[11]="Dec";
var mth = month[d.getMonth()];
var url = window.location.protocol + "//" + window.location.host + window.location.pathname;

$("#cite-guide").append("<strong>MLA</strong><br>");
$("#cite-guide").append("\"" + $("h1").text() + ".\"" + " <em>Essential Humanities</em>. N.p., n.d. Web. " + day + " " + mth + ". " + year + ".<br><br>");
$("#cite-guide").append("<strong>APA</strong><br>");
$("#cite-guide").append($("h1").text() + ". (" + year + ")." + " <em>Essential Humanities</em>. Retrieved from " + url + "<br><br>");
$("#cite-guide").append("<strong>Chicago Manual</strong><br>");
$("#cite-guide").append("<em>Essential Humanities</em>. \"" + $("h1").text() + ".\" Accessed " + day + " " + mth + ", " + year + ". " + url + ".<br><br>");
$('#cite-margin').addClass('col-lg-2');
$('#cite').addClass('col-lg-8');
$('img').each(function() {
$(this).attr("title", $(this).attr("alt"));
});


$('img.slider-image').each(function() {
var caption = jQuery(this).attr('alt');
var credit = jQuery(this).attr('data-credit');
$(this).after('<p class="bjqs-caption">' + caption + '<br><span class="credit">Credit: ' + credit + '</span></p>');
});

$('.slider-single').each(function() {
$(this).wrapInner('<li class="bjqs-slide bjqs-slide-single">');
});

$('li.bjqs-slide-single').each(function() {
$(this).wrapAll('<ul class="bjqs">');
});


$('img.slider-image-multi').each(function() {
var caption = jQuery(this).attr('alt');
var credit = jQuery(this).attr('data-credit');
$(this).after('<p class="bjqs-caption">' + caption + '<br><span class="credit">Credit: ' + credit + '</span></p>');
});

$('.slider-multi').each(function() {
$(this).wrapAll('<li class="bjqs-slide">');
});

$('.slider').each(function() {
$(this).wrapInner('<ul class="bjqs bjqs-multi">');
});
/*
 * Basic jQuery Slider plug-in v.1.3
 *
 * http://www.basic-slider.com
 *
 * Authored by John Cobb
 * http://www.johncobb.name
 * @john0514
 *
 * Copyright 2011, John Cobb
 * License: GNU General Public License, version 3 (GPL-3.0)
 * http://www.opensource.org/licenses/gpl-3.0.html
 *
 */(function(e){"use strict";e.fn.bjqs=function(t){var n={width:700,height:300,animtype:"fade",animduration:450,animspeed:4e3,automatic:!0,showcontrols:!0,centercontrols:!0,nexttext:"Next",prevtext:"Prev",showmarkers:!0,centermarkers:!0,keyboardnav:!0,hoverpause:!0,usecaptions:!0,randomstart:!1,responsive:!1},r=e.extend({},n,t),i=this,s=i.find("ul.bjqs"),o=s.children("li"),u=null,a=null,f=null,l=null,c=null,h=null,p=null,d=null,v={slidecount:o.length,animating:!1,paused:!1,currentslide:1,nextslide:0,currentindex:0,nextindex:0,interval:null},m={width:null,height:null,ratio:null},g={fwd:"forward",prev:"previous"},y=function(){o.addClass("bjqs-slide");r.responsive?b():E();if(v.slidecount>1){r.randomstart&&L();r.showcontrols&&x();r.showmarkers&&T();r.keyboardnav&&N();r.hoverpause&&r.automatic&&C();r.animtype==="slide"&&S()}r.usecaptions&&k();if(r.animtype==="slide"&&!r.randomstart){v.currentindex=1;v.currentslide=2}s.show();o.eq(v.currentindex).show();r.automatic&&(v.interval=setInterval(function(){O(g.fwd,!1)},r.animspeed))},b=function(){m.width=i.outerWidth();m.ratio=m.width/r.width,m.height=r.height*m.ratio;if(r.animtype==="fade"){o.css({height:r.height,width:"100%"});o.children("img").css({height:r.height,width:"100%"});s.css({height:r.height,width:"100%"});i.css({height:r.height,"max-width":r.width,position:"relative"});if(m.width<r.width){o.css({height:m.height});o.children("img").css({height:m.height});s.css({height:m.height});i.css({height:m.height})}e(window).resize(function(){m.width=i.outerWidth();m.ratio=m.width/r.width,m.height=r.height*m.ratio;o.css({height:m.height});o.children("img").css({height:m.height});s.css({height:m.height});i.css({height:m.height})})}if(r.animtype==="slide"){o.css({height:r.height,width:r.width});o.children("img").css({height:r.height,width:r.width});s.css({height:r.height,width:r.width*r.slidecount});i.css({height:r.height,"max-width":r.width,position:"relative"});if(m.width<r.width){o.css({height:m.height});o.children("img").css({height:m.height});s.css({height:m.height});i.css({height:m.height})}e(window).resize(function(){m.width=i.outerWidth(),m.ratio=m.width/r.width,m.height=r.height*m.ratio;o.css({height:m.height,width:m.width});o.children("img").css({height:m.height,width:m.width});s.css({height:m.height,width:m.width*r.slidecount});i.css({height:m.height});h.css({height:m.height,width:m.width});w(function(){O(!1,v.currentslide)},200,"some unique string")})}},w=function(){var e={};return function(t,n,r){r||(r="Don't call this twice without a uniqueId");e[r]&&clearTimeout(e[r]);e[r]=setTimeout(t,n)}}(),E=function(){o.css({height:r.height,width:r.width});s.css({height:r.height,width:r.width});i.css({height:r.height,width:r.width,position:"relative"})},S=function(){p=o.eq(0).clone();d=o.eq(v.slidecount-1).clone();p.attr({"data-clone":"last","data-slide":0}).appendTo(s).show();d.attr({"data-clone":"first","data-slide":0}).prependTo(s).show();o=s.children("li");v.slidecount=o.length;h=e('<div class="bjqs-wrapper"></div>');if(r.responsive&&m.width<r.width){h.css({width:m.width,height:m.height,overflow:"hidden",position:"relative"});s.css({width:m.width*(v.slidecount+2),left:-m.width*v.currentslide})}else{h.css({width:r.width,height:r.height,overflow:"hidden",position:"relative"});s.css({width:r.width*(v.slidecount+2),left:-r.width*v.currentslide})}o.css({"float":"left",position:"relative",display:"list-item"});h.prependTo(i);s.appendTo(h)},x=function(){u=e('<ul class="bjqs-controls"></ul>');a=e('<li class="bjqs-next"><a href="#" data-direction="'+g.fwd+'">'+r.nexttext+"</a></li>");f=e('<li class="bjqs-prev"><a href="#" data-direction="'+g.prev+'">'+r.prevtext+"</a></li>");u.on("click","a",function(t){t.preventDefault();var n=e(this).attr("data-direction");if(!v.animating){n===g.fwd&&O(g.fwd,!1);n===g.prev&&O(g.prev,!1)}});f.appendTo(u);a.appendTo(u);u.appendTo(i);if(r.centercontrols){u.addClass("v-centered");var t=(i.height()-a.children("a").outerHeight())/2,n=t/r.height*100,s="120px";a.find("a").css("top",s);f.find("a").css("top",s)}},T=function(){l=e('<ol class="bjqs-markers"></ol>');e.each(o,function(t,n){var i=t+1,s=t+1;r.animtype==="slide"&&(s=t+2);var o=e('<li><a href="#">'+i+"</a></li>");i===v.currentslide&&o.addClass("active-marker");o.on("click","a",function(e){e.preventDefault();!v.animating&&v.currentslide!==s&&O(!1,s)});o.appendTo(l)});l.appendTo(i);c=l.find("li");if(r.centermarkers){l.addClass("h-centered");var t=(r.width-l.width())/2;l.css("left",t)}},N=function(){e(document).keyup(function(e){if(!v.paused){clearInterval(v.interval);v.paused=!0}if(!v.animating)if(e.keyCode===39){e.preventDefault();O(g.fwd,!1)}else if(e.keyCode===37){e.preventDefault();O(g.prev,!1)}if(v.paused&&r.automatic){v.interval=setInterval(function(){O(g.fwd)},r.animspeed);v.paused=!1}})},C=function(){i.hover(function(){if(!v.paused){clearInterval(v.interval);v.paused=!0}},function(){if(v.paused){v.interval=setInterval(function(){O(g.fwd,!1)},r.animspeed);v.paused=!1}})},k=function(){e.each(o,function(t,n){var r=e(n).children("img:first-child").attr("title");r||(r=e(n).children("a").find("img:first-child").attr("title"));if(r){r=e('<p class="bjqs-caption">'+r+"</p>");r.appendTo(e(n))}})},L=function(){var e=Math.floor(Math.random()*v.slidecount)+1;v.currentslide=e;v.currentindex=e-1},A=function(e){if(e===g.fwd)if(o.eq(v.currentindex).next().length){v.nextindex=v.currentindex+1;v.nextslide=v.currentslide+1}else{v.nextindex=0;v.nextslide=1}else if(o.eq(v.currentindex).prev().length){v.nextindex=v.currentindex-1;v.nextslide=v.currentslide-1}else{v.nextindex=v.slidecount-1;v.nextslide=v.slidecount}},O=function(e,t){if(!v.animating){v.animating=!0;if(t){v.nextslide=t;v.nextindex=t-1}else A(e);if(r.animtype==="fade"){if(r.showmarkers){c.removeClass("active-marker");c.eq(v.nextindex).addClass("active-marker")}o.eq(v.currentindex).fadeOut(r.animduration);o.eq(v.nextindex).fadeIn(r.animduration,function(){v.animating=!1;v.currentslide=v.nextslide;v.currentindex=v.nextindex})}if(r.animtype==="slide"){if(r.showmarkers){var n=v.nextindex-1;n===v.slidecount-2?n=0:n===-1&&(n=v.slidecount-3);c.removeClass("active-marker");c.eq(n).addClass("active-marker")}r.responsive&&m.width<r.width?v.slidewidth=m.width:v.slidewidth=r.width;s.animate({left:-v.nextindex*v.slidewidth},r.animduration,function(){v.currentslide=v.nextslide;v.currentindex=v.nextindex;if(o.eq(v.currentindex).attr("data-clone")==="last"){s.css({left:-v.slidewidth});v.currentslide=2;v.currentindex=1}else if(o.eq(v.currentindex).attr("data-clone")==="first"){s.css({left:-v.slidewidth*(v.slidecount-2)});v.currentslide=v.slidecount-1;v.currentindex=v.slidecount-2}v.animating=!1})}}};y()}})(jQuery);


$("div[class='slider']").each(function() {
$(this).bjqs({
height      : 338,
width       : 690,
showmarkers : false,
automatic : false,
usecaptions : false,
animtype : 'slide',
nexttext : '>',
prevtext : '<'
});
});

$("div[class='slider-single']").each(function() {
$(this).bjqs({
height      : 338,
width       : 690,
showcontrols : false,
automatic : false,
showmarkers : false,
usecaptions : false,
animtype : 'slide',
keyboardnav : false
});
});
  $('a.tip').attr('target', '_blank');
  $('a.tipbold').attr('target', '_blank');
  $('a.tipboldic').attr('target', '_blank');
$("#def-history").append("<h2>Addendum</h2><h3>Key Definitions</h3><p>The definition of <strong>civilization</strong>, like that of many historical terms, varies from source to source. Throughout Essential Humanities, “civilization” simply means <strong>urban culture</strong>; in other words, a culture with at least one city is considered a civilization. Essential Humanities defines the term <strong>city</strong> as a settlement with a population of at least <strong>ten thousand</strong>.</p><p>The term <strong>culture</strong> is defined by Essential Humanities as “the distinctive features of a group that are <strong>learned</strong> rather than biological”. Language, artistic traditions, and religious beliefs all fall under this definition. Language is often the primary <strong>identifying feature</strong> of a culture; in European history, for instance, the Celts were people who spoke Celtic languages, the Greeks were people who spoke Greek, and so on.</p>");

$("#def-art").append("<h2>Addendum</h2><h3>Key Definitions</h3><p>The Essential Humanities definition of art is “a beautiful human creation”. Art can be divided into two basic types: <strong>fine art</strong> (aka “pure art”), which is simply <strong>experienced</strong> (e.g. painting, sculpture, architecture), and <strong>applied art</strong> (aka “decorative art”), which is actually <strong>used</strong> (e.g. pottery, clothing, furniture).</p><p>Fine art (which has always strongly influenced applied art) is the primary concern of Essential Humanities. Five <strong>great fine arts</strong> are recognized: painting (flat visual art), sculpture (three-dimensional visual art), architecture (the visual art of building design; may be considered a special branch of sculpture), music (sound art), and literature (word art). These five media are \"great\" in that they (arguably) comprise the most expressive and universally appreciated forms of art.</p>");

$("#def-art-western").append("<h2>Addendum</h2><h3>Key Definitions</h3><p>The Essential Humanities definition of art is “a beautiful human creation”. Art can be divided into two basic types: <strong>fine art</strong> (aka “pure art”), which is simply <strong>experienced</strong> (e.g. painting, sculpture, architecture), and <strong>applied art</strong> (aka “decorative art”), which is actually <strong>used</strong> (e.g. pottery, clothing, furniture).</p><p>Fine art (which has always strongly influenced applied art) is the primary concern of Essential Humanities. Five <strong>great fine arts</strong> are recognized: painting (flat visual art), sculpture (three-dimensional visual art), architecture (the visual art of building design; may be considered a special branch of sculpture), music (sound art), and literature (word art). These five media are \"great\" in that they (arguably) comprise the most expressive and universally appreciated forms of art.</p><h3>Ages of Western Visual Art</h3><p>Western visual art can be divided into <strong>eight ages</strong>. For discussion of the overall course of Western art, see <a href=\"http://www.essential-humanities.net/art-supplementary/core-regions-western\">Core Regions of Western Art</a> and <a href=\"http://www.essential-humanities.net/art-supplementary/western-aesthetics\">Western Aesthetics</a>.</p><table class=\"standard nopad nh\"><caption>Ages of Western Art</caption><tbody><tr><td class=\"odd\" style=\"font-weight: bold\">3000-2000 BC</td><td class=\"odd\" style=\"font-weight: bold\" colspan=\"2\">2000-1000 BC</td><td class=\"odd\" style=\"font-weight: bold\">1000 BC-0</td><td class=\"odd\" style=\"font-weight: bold\" colspan=\"2\">0-1000</td><td class=\"odd\" style=\"font-weight: bold\" colspan=\"8\">1000-present</td></tr><tr><td class=\"ltblue\" colspan=\"2\">1</td><td class=\"blue\" colspan=\"2\">2</td><td class=\"pink\" colspan=\"1\">3</td><td class=\"brown\" colspan=\"3\">4</td><td class=\"clear\" colspan=\"2\"></td><td class=\"purple\" colspan=\"3\">7</td><td class=\"clear\" colspan=\"1\"></td></tr><tr><td class=\"clear\" colspan=\"7\"></td><td class=\"green\" colspan=\"2\">5</td><td class=\"orange\" colspan=\"2\">6</td><td class=\"clear\"></td><td class=\"yellow\" colspan=\"2\">8</td></tr><tr><td class=\"clear\" style=\"width:20%\"></td><td class=\"clear\" style=\"width:16%\"></td><td class=\"clear\" style=\"width:4%\"></td><td class=\"clear\" style=\"width:20%\"></td><td class=\"clear\" style=\"width:10%\"></td><td class=\"clear\" style=\"width:10%\"></td><td class=\"clear\" style=\"width:8%\"></td><td class=\"clear\" style=\"width:2%\"></td><td class=\"clear\" style=\"width:2%\"></td><td class=\"clear\" style=\"width:3%\"></td><td class=\"clear\" style=\"width:1%\"></td><td class=\"clear\" style=\"width:1%\"></td><td class=\"clear\" style=\"width:1%\"></td><td class=\"clear\" style=\"width:2%\"></td></tr></tbody></table><table class=\"standard nopad nh el\"><tbody><tr><td class=\"ltblue\">1</td><td class=\"blue\">2</td><td class=\"pink\">3</td><td class=\"brown\">4</td><td class=\"green\">5</td><td class=\"orange\">6</td><td class=\"purple\">7</td><td class=\"yellow\">8</td></tr><tr><td class=\"ltblue\"><strong>Aegean</strong><br>ca. 3000-1200 BC</td><td class=\"blue\"><strong>Greek</strong><br>ca. 1200 BC-0</td><td class=\"pink\"><strong>Roman</strong><br>ca. 0-500</td><td class=\"brown\"><strong>Medieval</strong><br>ca. 500-1500</td><td class=\"green\"><strong>Renaissance</strong><br>ca. 1400-1600</td><td class=\"orange\"><strong>Baroque</strong><br>ca. 1600-1800</td><td class=\"purple\"><strong>Neoclassical/Romantic</strong><br>ca. 1750-1900</td><td class=\"yellow\"><strong>Modern</strong><br>ca. 1850-</td></tr></tbody></table>");

$("#def-music-western").append("<h2>Addendum</h2><h3>Key Definitions</h3><p>The Essential Humanities definition of art is “a beautiful human creation”. Art can be divided into two basic types: <strong>fine art</strong> (aka “pure art”), which is simply <strong>experienced</strong> (e.g. painting, sculpture, architecture), and <strong>applied art</strong> (aka “decorative art”), which is actually <strong>used</strong> (e.g. pottery, clothing, furniture).</p><p>Fine art (which has always strongly influenced applied art) is the primary concern of Essential Humanities. Five <strong>great fine arts</strong> are recognized: painting (flat visual art), sculpture (three-dimensional visual art), architecture (the visual art of building design; may be considered a special branch of sculpture), music (sound art), and literature (word art). These five media are \"great\" in that they (arguably) comprise the most expressive and universally appreciated forms of art.</p><h3>Ages of Western Music</h3><p>Western music can be divided into <strong>seven ages</strong>. For discussion of the overall course of Western art, see <a href=\"http://www.essential-humanities.net/art-supplementary/core-regions-western\">Core Regions of Western Art</a> and <a href=\"http://www.essential-humanities.net/art-supplementary/western-aesthetics\">Western Aesthetics</a>. For a collection of sample works from each period, see the <a href=\"http://www.essential-humanities.net/art-supplementary/music-guide\">Music Guide</a>.</p><table class=\"standard nopad nh\"><caption>Ages of Western Music</caption><tbody><tr><td class=\"odd\" style=\"font-weight: bold\">1200 BC-0</td><td class=\"odd\" style=\"font-weight: bold\" colspan=\"2\">0-1000</td><td class=\"odd\" style=\"font-weight: bold\" colspan=\"7\">1000-present</td></tr><tr><td class=\"blue\" colspan=\"2\">1</td><td class=\"brown\" colspan=\"2\">2</td><td class=\"green\">3</td><td class=\"orange\">4</td><td class=\"ltblue\">5</td><td class=\"purple\" colspan=\"2\">6</td><td class=\"clear\"></td></tr><tr><td class=\"clear\" colspan=\"8\"></td><td class=\"yellow\" colspan=\"2\">7</td></tr><tr><td class=\"clear\" style=\"width:33%\"></td><td class=\"clear\" style=\"width:16%\"></td><td class=\"clear\" style=\"width:16%\"></td><td class=\"clear\" style=\"width:16%\"></td><td class=\"clear\" style=\"width:6%\"></td><td class=\"clear\" style=\"width:5%\"></td><td class=\"clear\" style=\"width:2%\"></td><td class=\"clear\" style=\"width:1%\"></td><td class=\"clear\" style=\"width:2%\"></td><td class=\"clear\" style=\"width:3%\"></td></tr></tbody></table><table class=\"standard\"><tbody><tr><td class=\"blue\">1</td><td class=\"brown\">2</td><td class=\"green\">3</td><td class=\"orange\">4</td><td class=\"ltblue\">5</td><td class=\"purple\">6</td><td class=\"yellow\">7</td></tr><tr><td class=\"blue\"><strong>ancient music</strong><br>ca. 1200 BC-500 AD</td><td class=\"brown\"><strong>medieval music</strong><br>ca. 500-1400</td><td class=\"green\"><strong>Renaissance music</strong><br>ca. 1400-1600</td><td class=\"orange\"><strong>Baroque music</strong><br>ca. 1600-1750</td><td class=\"ltblue\"><strong>Classical music</strong><br>ca. 1750-1820</td><td class=\"purple\"><strong>Romantic music</strong><br>ca. 1820-1900</td><td class=\"yellow\"><strong>Modern music</strong><br>ca. 1850-</td></tr></tbody></table>");

$("#def-literature-western").append("<h2>Addendum</h2><h3>Key Definitions</h3><p>The Essential Humanities definition of art is “a beautiful human creation”. Art can be divided into two basic types: <strong>fine art</strong> (aka “pure art”), which is simply <strong>experienced</strong> (e.g. painting, sculpture, architecture), and <strong>applied art</strong> (aka “decorative art”), which is actually <strong>used</strong> (e.g. pottery, clothing, furniture).</p><p>Fine art (which has always strongly influenced applied art) is the primary concern of Essential Humanities. Five <strong>great fine arts</strong> are recognized: painting (flat visual art), sculpture (three-dimensional visual art), architecture (the visual art of building design; may be considered a special branch of sculpture), music (sound art), and literature (word art). These five media are \"great\" in that they (arguably) comprise the most expressive and universally appreciated forms of art.</p><h3>Ages of Western Literature</h3><p>Western literature can be divided into <strong>five ages</strong>. For discussion of the overall course of Western art, see <a href=\"http://www.essential-humanities.net/art-supplementary/core-regions-western\">Core Regions of Western Art</a> and <a href=\"http://www.essential-humanities.net/art-supplementary/western-aesthetics\">Western Aesthetics</a>.</p><table class=\"standard nopad nh\"><caption>Ages of Western Literature</caption><tbody><tr><td class=\"odd\" style=\"font-weight: bold\">800 BC-0</td><td class=\"odd\" style=\"font-weight: bold\" colspan=\"2\">0-1000</td><td class=\"odd\" style=\"font-weight: bold\" colspan=\"5\">1000-present</td></tr><tr><td class=\"blue\" colspan=\"2\">1</td><td class=\"brown\" colspan=\"3\">2</td><td class=\"clear\" colspan=\"3\"></td></tr><tr><td class=\"clear\" colspan=\"4\"></td><td class=\"green\" colspan=\"2\">3</td><td class=\"purple\">4</td><td class=\"yellow\">5</td></tr><tr><td class=\"clear\" style=\"width:29%\"></td><td class=\"clear\" style=\"width:18%\"></td><td class=\"clear\" style=\"width:18%\"></td><td class=\"clear\" style=\"width:11%\"></td><td class=\"clear\" style=\"width:7%\"></td><td class=\"clear\" style=\"width:5%\"></td><td class=\"clear\" style=\"width:5%\"></td><td class=\"clear\" style=\"width:7%\"></td></tr></tbody></table><table class=\"standard\"><tbody><tr><td class=\"blue\">1</td><td class=\"brown\">2</td><td class=\"green\">3</td><td class=\"purple\">4</td><td class=\"yellow\">5</td><tr><td class=\"blue\"><strong>ancient literature</strong><br>ca. 800 BC-500 AD</td><td class=\"brown\"><strong>medieval literature</strong><br>ca. 500-1500</td><td class=\"green\"><strong>Renaissance/Reformation literature</strong><br>ca. 1300-1650</td><td class=\"purple\"><strong>Enlightenment literature</strong><br>ca. 1650-1800</td><td class=\"yellow\"><strong>modern literature</strong><br>ca. 1800-present</td></tr></tbody></table>");
$('#his-world').click(function() {
$('.nav-cat').removeClass('active');
$('.nav-sub-cat').removeClass('active');
$('#his-world').addClass('active');
$('.nav-art').addClass('hidden');
$('.nav-sub-art').addClass('hidden');
$('#his-world-art').removeClass('hidden');
return false;
});

$('#his-west').click(function() {
$('.nav-cat').removeClass('active');
$('.nav-sub-cat').removeClass('active');
$('#his-west').addClass('active');
$('.nav-art').addClass('hidden');
$('.nav-sub-art').addClass('hidden');
$('#his-west-art').removeClass('hidden');
return false;
});

$('#his-over').click(function() {
$('.nav-cat').removeClass('active');
$('.nav-sub-cat').removeClass('active');
$('#his-over').addClass('active');
$('.nav-art').addClass('hidden');
$('.nav-sub-art').addClass('hidden');
$('#his-over-art').removeClass('hidden');
return false;
});

$('#art-world').click(function() {
$('.nav-cat').removeClass('active');
$('.nav-sub-cat').removeClass('active');
$('#art-world').addClass('active');
$('.nav-art').addClass('hidden');
$('.nav-sub-art').addClass('hidden');
$('#art-world-art').removeClass('hidden');
return false;
});

$('#art-west').click(function() {
$('.nav-cat').removeClass('active');
$('.nav-sub-cat').removeClass('active');
$('#art-west').addClass('active');
$('.nav-art').addClass('hidden');
$('.nav-sub-art').addClass('hidden');
$('#art-west-cat').removeClass('hidden');
return false;
});

$('#art-over').click(function() {
$('.nav-cat').removeClass('active');
$('.nav-sub-cat').removeClass('active');
$('#art-over').addClass('active');
$('.nav-art').addClass('hidden');
$('.nav-sub-art').addClass('hidden');
$('#art-over-art').removeClass('hidden');
return false;
});



$('#arch').click(function() {
$('.nav-sub-cat').removeClass('active');
$('#arch').addClass('active');
$('.nav-sub-art').addClass('hidden');
$('#arch-art').removeClass('hidden');
return false;
});

$('#paint').click(function() {
$('.nav-sub-cat').removeClass('active');
$('#paint').addClass('active');
$('.nav-sub-art').addClass('hidden');
$('#paint-art').removeClass('hidden');
return false;
});

$('#sculpt').click(function() {
$('.nav-sub-cat').removeClass('active');
$('#sculpt').addClass('active');
$('.nav-sub-art').addClass('hidden');
$('#sculpt-art').removeClass('hidden');
return false;
});

$('#mus').click(function() {
$('.nav-sub-cat').removeClass('active');
$('#mus').addClass('active');
$('.nav-sub-art').addClass('hidden');
$('#mus-art').removeClass('hidden');
return false;
});

$('#lit').click(function() {
$('.nav-sub-cat').removeClass('active');
$('#lit').addClass('active');
$('.nav-sub-art').addClass('hidden');
$('#lit-art').removeClass('hidden');
return false;
});



$('#world').click(function() {
$('.nav-sub-cat').removeClass('active');
$('#world').addClass('active');
$('.nav-sub-art').addClass('hidden');
$('#world-art').removeClass('hidden');
return false;
});

$('#west').click(function() {
$('.nav-sub-cat').removeClass('active');
$('#west').addClass('active');
$('.nav-sub-art').addClass('hidden');
$('#west-art').removeClass('hidden');
return false;
});
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
