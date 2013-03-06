// ==UserScript==
// @id             iitc-plugin-attack-portal-suggestion@jenscz
// @name           iitc: attack portal suggestion
// @version        0.0.4
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @updateURL      https://raw.github.com/jenscz/attack-portal-suggestion/master/attack-portal-suggestion.user.js
// @downloadURL    https://raw.github.com/jenscz/attack-portal-suggestion/master/attack-portal-suggestion.user.js
// @description    Show possible best portals to attack depends on their AP Gain and energy
// @include        https://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.attackPortalSuggestion = function() {};

window.attackPortalStorage = {};

window.plugin.attackPortalSuggestion.extractPortalData = function(data) {
    for (var i = 0; i < data.portals.length; i++) {
        if (data.portals[i] && data.portals[i].length) {
            var portal = data.portals[i][2];
            if (portal && portal.portalV2) {
                var ap = window.getAttackApGain(portal);
                var energy = window.getCurrentPortalEnergy(portal);
                var avgResoDist = window.getAvgResoDist(portal); 
                var guid = data.portals[i][0];
                if (energy>0 && ap.destroyAp>0) {
                    var item = {
                        guid: guid,
                        portal: portal.portalV2.descriptiveText.TITLE,
                        energy: energy,
                        ap: ap.destroyAp,
                        best: energy / ap.destroyAp,
                        latlng: [portal.locationE6.latE6/1E6, portal.locationE6.lngE6/1E6]
                    };
                    window.attackPortalStorage[guid] = item;
                }
            }
        }
    }                               
}

window.plugin.attackPortalSuggestion.suggest = function() {
    
    function myCompare(a,b) {
        if (a.best > b.best) {
            return 1;
        } else if (a.best < b.best) {
            return -1;
        } else {
            return 0;
        }
    }
    
    var s = '';
    if (window.attackPortalStorage) {
        var localArray = [];
        for (var i in window.attackPortalStorage) {
            localArray.push(window.attackPortalStorage[i]);
        }
        
        if (localArray.length) {
            localArray.sort(myCompare);
        }                
        
        s = "<table><th>Portal</th><th>Energy</th><th>AP Gain</th><th>E/AP</th>";
        for (var i in localArray) {
            var js = 'window.zoomToAndShowPortal(\''+localArray[i].guid+'\', ['+localArray[i].latlng[0]+', '+localArray[i].latlng[1]+']); return false;';
            s += "<tr style='border-bottom: 1px solid black;'>";
            s += '<td><a href="#" onclick="'+js+'">'+localArray[i].portal+'</a></td>';
            s += "<td>"+localArray[i].energy+"</td>";
            s += "<td>"+localArray[i].ap+"</td>";
            s += "<td>"+Math.round(100*localArray[i].best)/100+"</td>";
            s += "</tr>";
        }
        s += "</table>";
        
        $('<div id="attack-portal-suggestion" />').html(s).dialog({
            buttons: [{
                text: "Close", 
                click: function() { 
                    $(this).dialog("close"); 
                } 
            }]
        });
    } else {
        alert('Empty');
    }
}

var setup =  function() {
    window.addHook('portalDataLoaded', window.plugin.attackPortalSuggestion.extractPortalData);
    $('#toolbox').append('<a onclick="window.plugin.attackPortalSuggestion.suggest();">A@!</a> ');
}

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
