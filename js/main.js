var obj = (function () {
    function getData(url, callbackFunc) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callbackFunc(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function successAjax(xhttp) {
        // itt a json content, benne a data változóban
        var userDatas = JSON.parse(xhttp.responseText);
        console.log(userDatas);
        

    }


    return {
        getData: getData,
        successAjax: successAjax,
    }
})();

obj.getData('json/movies.json', obj.successAjax);