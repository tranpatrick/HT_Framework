var C_USER_ID = "user_id";
var C_USER_NAME = "user_name";

/**
* Créer un cookie
*
* @param cname
*            le nom du cookie
* @param cvalue
*            la valeur du cookie
*/
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue;
}
/**
* Récupère la valeur d'un cookie
*
* @param cname
*            le nom du cookie dont on souhaite la valeur
*
*/
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ')
    c = c.substring(1);

    if (c.indexOf(name) == 0) {
      str = c.substring(name.length, c.length);
      if (str == "-1") {
        return null;
      }
      return str;
    }
  }

  return null;
}

/**
* Permet de détruire un cookie en mettant sa valeur à -1
*/
function destroy_cookie() {
  setCookie(C_USER_ID, "-1");
  setCookie(C_USER_NAME, "-1");
}

function signup() {
  var form = document.getElementById('myform');
  var login = form.username.value;
  var pwd = form.password.value;
  var prenom = form.prenom.value;
  var nom = form.nom.value;
  var age = form.age.value;
  var req = new XMLHttpRequest();
  req.open("POST", 'http://localhost/Memos/signup', true);
  req.onreadystatechange = function(evt) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        console.log("debug - signupResponse : "+req.responseText);
        var json = JSON.parse(req.responseText);
        if (json.error == undefined) {
          document.getElementById('response').innerHTML = json.success;
        }
        else {
          document.getElementById('response').innerHTML = json.error;
        }
      }
      else
      console.error("error");
    }
  }
  var data = {};
  data.login = login;
  data.password = pwd;
  data.prenom = prenom;
  data.nom = nom;
  data.age = age;
  form.nom.value = "";
  form.prenom.value = "";
  form.age.value = "";
  console.log("signing up with "+JSON.stringify(data));
  req.send (JSON.stringify(data));
}

function login() {
  var form = document.getElementById('myform');
  var login = form.username.value;
  var pwd = form.password.value;
  var req = new XMLHttpRequest();
  req.open("POST", 'http://localhost/Memos/login');
  req.onreadystatechange = function(evt) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        console.log("debug - loginResponse : "+req.responseText);
        var json = JSON.parse(req.responseText);
        if (json.error == undefined) {
          setCookie(C_USER_ID, json.id)
          setCookie(C_USER_NAME, login)
          getMemos();
          getUserInfo();
          document.getElementById('toz').style.display = "inline";
        } else {
          document.getElementById('response').innerHTML = json.error;
        }
      }
      else {
        console.error("error");
      }
    }
  }
  var data = {};
  data.login = login;
  data.password = pwd;
  console.log("signing up with "+JSON.stringify(data));
  req.send (JSON.stringify(data));

}

function logout() {
  var req = new XMLHttpRequest();
  req.open("POST", 'http://localhost/Memos/logout');
  req.onreadystatechange = function(evt) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        console.log("debug - logoutResponse : "+req.responseText);
        var json = JSON.parse(req.responseText);
        if (json.error == undefined) {
          destroy_cookie();
          document.getElementById('user').innerHTML = "";
          document.getElementById('notes').innerHTML = "";
          document.getElementById('toz').style.display = "none";
        } else {
          document.getElementById('response').innerHTML = json.error;
        }
      }
      else {
        console.error("error");
      }
    }
  }
  var data = {};
  data.userId = getCookie(C_USER_ID);
  if (data.userId != null) {
    req.send(JSON.stringify(data));
  }
}

function addMemo() {
  var form = document.getElementById('memoform');
  var memo = form.memo.value;
  var req = new XMLHttpRequest();
  req.open("POST", 'http://localhost/Memos/addMemo');
  req.onreadystatechange = function(evt) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        console.log("debug - addMemoResponse : "+req.responseText);
        var json = JSON.parse(req.responseText);
        if (json.error == undefined) {
          document.getElementById('response').innerHTML = json.success;
          getMemos();
        } else {
          document.getElementById('response').innerHTML = json.error;
        }
      }
      else {
        console.error("error");
      }
    }
  }
  var data = {};
  // data.userId = getCookie(C_USER_ID);
  data.memo = memo;
  // if (data.userId != null && data.memo != "") {
  if (data.memo != "") {
    form.memo.value = "";
    console.log("adding up with "+JSON.stringify(data));
    req.send (JSON.stringify(data));
  }
}

function removeMemo(memoId) {
  var req = new XMLHttpRequest();
  req.open("POST", 'http://localhost/Memos/removeMemo');
  req.onreadystatechange = function(evt) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        console.log("debug - removeMemoResponse : "+req.responseText);
        var json = JSON.parse(req.responseText);
        if (json.error == undefined) {
          document.getElementById('response').innerHTML = json.success;
          getMemos();
        } else {
          document.getElementById('response').innerHTML = json.error;
        }
      }
      else {
        console.error("error");
      }
    }
  }
  var data = {};
  // data.userId = getCookie(C_USER_ID);
  data.memoId = memoId;
  console.log("adding up with "+JSON.stringify(data));
  req.send (JSON.stringify(data));
}

function getMemos() {
  var req = new XMLHttpRequest();
  var id = getCookie(C_USER_ID);
  console.log("id = "+id);
  if (id != null) {
    req.open("GET", 'http://localhost/Memos/getMemos?userId='+id);
    req.onreadystatechange = function(evt) {
      if (req.readyState == 4) {
        if(req.status == 200) {
          console.log("debug - getMemosResponse : "+req.responseText);
          var json = JSON.parse(req.responseText);
          if (json.error == undefined) {
            afficherMemo(json);
          } else {
            document.getElementById('response').innerHTML = json.error;
          }
        }
        else {
          console.error("error");
        }
      }
    }
    req.send ();
  }
}

function afficherMemo(json) {
  var tab = json.memos;
  var length = tab.length;

  var notes = document.getElementById('notes');
  notes.innerHTML = "";
  for (var i = 0; i<length; i++) {
    var div = document.createElement("div");
    // div.setAttribute("style", "margin-bottom: 20px;")
      div.setAttribute("class", "col-md-12");
    div.innerHTML = "<div class='col-md-2'><span>"+tab[i]+"<span></div><div class='col-md-6'><button class='btn mg-left10' onclick=removeMemo("+i+")>remove</button></div>";
    notes.appendChild(div);
  }
}

function getUserInfo() {
  var req = new XMLHttpRequest();
  var id = getCookie(C_USER_NAME);
  if (id != null) {

    req.open("GET", 'http://localhost/Memos/user?username='+id);
    req.onreadystatechange = function(evt) {
      if (req.readyState == 4) {
        if(req.status == 200) {
          console.log("debug - getMemosResponse : "+req.responseText);
          var userDiv = document.getElementById('user');
          userDiv.innerHTML = req.responseText;
        }
        else {
          console.error("error");
        }
      }
    }
    req.send();
  }
}

window.addEventListener("load", function(){
  getMemos();
  getUserInfo();
  if (getCookie(C_USER_ID) != null && getCookie(C_USER_ID) != -1) {
    document.getElementById('toz').style.display = "block";
  }
},false);
