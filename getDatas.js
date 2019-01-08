var arrayBufferToData = {
    toBase64: function (arrayBuffer) {
      var binary = '';
      var bytes = new Uint8Array(arrayBuffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    },

    toString: function (arrayBuffer) {
      try {
        var base64 = this.toBase64(arrayBuffer);

        return decodeURIComponent(escape(window.atob(base64)));
      } catch (e) {
        console.warn('Can not be converted to String');
        return false;
      }
    },

    toJSON: function (arrayBuffer) {
      try {
        var string = this.toString(arrayBuffer);
        return JSON.parse(string);
      } catch (e) {
        console.warn('Can not be converted to JSON');
        return false;
      }
    }
 };

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
    	// if(details.url = 'https://digitaslbi-nonprod-stream9-uat.apigee.net/v2/models/inventory/newcars/c1458999-de69-4300-9780-fc56d14c058f?associatedDealerId=52037852') {
    	// 	if(details.method = 'POST' && details.requestBody) {
    	// 		var buffer = details.requestBody.raw[0].bytes;
     //       		var datas = arrayBufferToData.toJSON(buffer);
     //       		console.log(datas)
     //       	}
    	// }
    	if(details.url == 'https://test.rciservices.eu/services-dispatcher/result_do.json') {
    		console.log(details)
    		if(details.requestBody) {
    			var buffer = details.requestBody.raw[0].bytes;
            	var datas = arrayBufferToData.toJSON(buffer);
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					console.log(tabs)
					if(tabs.length > 0)
						chrome.tabs.sendMessage(tabs[0].id, {datasChromeExtension: datas[0]}, function(response) {});
				});
    		}
    	}
    },
    {urls: ["<all_urls>"]},
    ['requestBody']
);